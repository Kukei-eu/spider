import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { createHash } from 'node:crypto';
import { getXataClient } from '../xata.js'
import { get } from 'node:http';

/**
 * Creates sha256 hash from url
 * @param {string} url
 * @returns {string}
 */
const getId = (url) => {
  const hash = createHash('sha256');
  hash.update(url);
  return hash.digest('hex');
}

const crawlPage = async (url) => {
  const fetched = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Kukei.eu-bot/0.1; +https://kukei.eu)',
    },
  });

  const content = await fetched.text();
  const doc = new JSDOM(content, { url });
  const linksElements = doc.window.document.querySelectorAll('a')
  const links = [...linksElements].map((link) => link.href);

  const reader = new Readability(doc.window.document);
  const article = reader.parse();

  return {
    url,
    links,
    content: article.textContent,
    excerpt: article.excerpt,
    title: doc.window.document.title,
  };
}

const processResult = async (register, result) => {
  register.set(result.url, true);
  const indexEntry = {
    id: getId(result.url),
    url: result.url,
    content: result.content,
    excerpt: result.excerpt,
    title: result.title,
  };

  const docUrl = new URL(result.url);

  for (const link of result.links) {
    const linkUrl = new URL(link);
    if (linkUrl.origin !== docUrl.origin) continue;
    const normalizedLink = link.replace(/\/$/, '');
    if (register.has(normalizedLink)) continue;
    register.set(link, false);
  }

  await getXataClient().db.index.createOrReplace(indexEntry);
}

const getUnprocessedUrl = (register) => {
  for (const [url, isCrawled] of register) {
    if (!isCrawled) return url;
  }
  return null;
}

const politeWait = () => new Promise((resolve) => setTimeout(resolve, 100));

export const crawlWebsite = async (rootUrl) => {
  /**
   * Url -> isCrawled
   * @type {Map<string, boolean>}
   */
  const register = new Map()

  const firstResult = await crawlPage(rootUrl);
  await processResult(register, firstResult);

  while (getUnprocessedUrl(register)) {
    const url = getUnprocessedUrl(register);
    const result = await crawlPage(url);
    await processResult(register, result);
    await politeWait()
  }

}

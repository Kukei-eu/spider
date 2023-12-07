# Kukei.eu crawler

## What is it
This is a crawler behind [kukei.eu](https://kukei.eu) website.
It's being used to crawl websites that are registered in [index-sources.json](./index-sources.json) file.

It's written in Javascript with nodejs runtime in mind.

## What is kukei.eu
Full information about the website can be found [here](https://kukei.eu/about).

Long story short, Kukei.eu is a search engine that is curated and focused on providing good assistance for *web developers*.

If you use it already and want to contribute, the best way to start is to add your blog, or blog of someone you love to read to [index-sources.json](./index-sources.json) file via a PR.

All PRs will be merged, unless the author of this website finds the blog to have low quality content (e.g. uses medium-like articles buzz-words and not much actual content).


## How to run it

You can run it out of the box as long as you have [meilisearch]() access (self hosted or cloud).

To run it you need
```bash
yarn install &&
yarn crawl --url <some-url> --index <index-name>
```

Before you run it add .env file with following content:
```bash
MEILI_MASTER_KEY=<MEILI_SEARCH_TOKEN>
MEILI_HOST=<URL>
```

## How to contribute

If you want to join the project by providing some bug fixes or new features, please first reach out on github issues to discuss the feature you want to add.

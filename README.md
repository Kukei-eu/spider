# Kukei.eu crawler

## What is it
This is a crawler behind [kukei.eu](https://kukei.eu) website.
It's being used to crawl websites that are registered in [index-sources.js](./index-sources.js) file.

It's written in Javascript with nodejs runtime in mind.

## What is kukei.eu
Full information about the website can be found [here](https://kukei.eu/about).

Long story short, Kukei.eu is a search engine that is curated and focused on providing good assistance for *web developers*.

If you use it already and want to contribute, the best way to start is to add your blog, or blog of someone you love to read to [index-sources.js](./index-sources.js) file via a PR.

All PRs will be merged, unless the author of this website finds the blog to have low quality content (e.g. uses medium-like articles buzz-words and not much actual content).

## Configuration

To run it you need MeiliSearch and mongodb instance access.

To configure it, create an .env file with following content:
```bash
MEILI_MASTER_KEY=<TOKEN>
MEILI_HOST=https://example.com
MONGO_URI=mongodb+srv://user:password@example.com/?retryWrites=true&w=majority
MONGO_DATABASE=<DB_NAME>
# Also uses as a collections base prefix. e.g. `sources` also creates `sources-links` collection.
MONGO_COLLECTION=<COLLECTION_NAME>
# Can be empty, if filles will be used to create proper MeiliSearch index names. See `src/manage.js`
MEILI_INDEX_PREFIX=
```

### Mongo settings

Not automated yet in src/manage.js:
To make mongo queries work properly you need to set up few indexes:
- to MONGO_COLLECTION: index on `url` as unique
- same for <MONGO_COLLECTION>-links

The reason is that it uses `upsert` heavily in many processes.

## How to run it

You can run it out of the box as long as you have [meilisearch]() access (self-hosted or cloud).

To run it you need
```bash
yarn install &&
yarn crawl:roots
```

This will do the initial crawling of all the sources. Then to start continous crawling of found pages, you need to run `yarn crawl:auto` process.

This process runs for maximum ms configured in `PROCESS_TIME_TO_LIVE_MS` env variable. Default is 10 minutes.

It's not guaranteed it will run exactly N milliseconds. It means it will not start another crawling iteration when this time passes.

## How to contribute

If you want to join the project by providing some bug fixes or new features, please first reach out on github issues to discuss the feature you want to add.

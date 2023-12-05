import {meiliClient} from "./helpers/meili.js";

const main = async () => {
    // await meiliClient.createIndex('blogs');
    // await meiliClient.createIndex('docs');

    await meiliClient.index('blogs').updateSettings({
        searchableAttributes: ['url', 'title', 'content', 'excerpt'],
        displayedAttributes: ['title', 'url', 'excerpt', 'content'],
        distinctAttribute: 'url',
    })

    await meiliClient.index('docs').updateSettings({
        searchableAttributes: ['url', 'title', 'content', 'excerpt'],
        displayedAttributes: ['title', 'url', 'excerpt', 'content'],
        distinctAttribute: 'url',
    })
};

main();

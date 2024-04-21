# [1.8.0](https://github.com/Kukei-eu/spider/compare/v1.7.0...v1.8.0) (2024-04-21)


### Bug Fixes

* better filters for smaller index ([94fcc3b](https://github.com/Kukei-eu/spider/commit/94fcc3b35a5f416eba9b08fa5b3318973f5511dc))
* better filters for smaller index ([b90fd83](https://github.com/Kukei-eu/spider/commit/b90fd83dbe8601af429ae85f79d57836f0ddab16))


### Features

* update deps ([254f386](https://github.com/Kukei-eu/spider/commit/254f386c55371867f71d007b7dd3b08a7812cafe))
* use network host ([91f1831](https://github.com/Kukei-eu/spider/commit/91f1831e903230291cdfc03d9b6ccd69af392b70))
* use network host ([386cfe0](https://github.com/Kukei-eu/spider/commit/386cfe0814d0d345b02c5f7fdcdf50f0f5ba921e))

# [1.7.0](https://github.com/Kukei-eu/spider/compare/v1.6.0...v1.7.0) (2024-01-14)


### Bug Fixes

* replace multiple trailing slashes ([03d44e9](https://github.com/Kukei-eu/spider/commit/03d44e93d70658c86bdbfae39038830d75128687))


### Features

* add result log ([a643995](https://github.com/Kukei-eu/spider/commit/a643995606a546061b589d88e1586e00c8104645))
* use allow list for w3 links ([690505a](https://github.com/Kukei-eu/spider/commit/690505a0f0cc7f2d1fe44d1001a0162bdf712659))

# [1.6.0](https://github.com/Kukei-eu/spider/compare/v1.5.0...v1.6.0) (2024-01-08)


### Bug Fixes

* prevent do-stats from exiting when nothing is uncrawled ([5ea126c](https://github.com/Kukei-eu/spider/commit/5ea126c5784a510dfdad4285a3b006986f027fbd))
* prevent root crawl from exiting when root returns non 200 ([9606698](https://github.com/Kukei-eu/spider/commit/960669806f8858cfcc7eeb1fffceee773c6abc45))
* woof, remove debug logs ([40fce69](https://github.com/Kukei-eu/spider/commit/40fce69be08e89120b253a69216701c46e30693e))


### Features

* add https://storybook.js.org ([3bd32f2](https://github.com/Kukei-eu/spider/commit/3bd32f22f971e70df9b5305aa1bf8a6af635f928))
* add meilisearch ([07d4734](https://github.com/Kukei-eu/spider/commit/07d4734d20a95278c3f413631baaa9277fc784a3))
* ensure robots send proper UA ([3797f47](https://github.com/Kukei-eu/spider/commit/3797f47e949d177765e82b17483d0bc93134a9ed))

# [1.5.0](https://github.com/Kukei-eu/spider/compare/v1.4.0...v1.5.0) (2024-01-01)


### Features

* crawl roots --all ensures one level deep is being crawled again ([bbbc0ee](https://github.com/Kukei-eu/spider/commit/bbbc0ee5f7bfb732cbe59db6dbc89ab59e9be24a))
* no mongo updates loop ([1ab9a81](https://github.com/Kukei-eu/spider/commit/1ab9a81fc45a19fa61d968b9bfadb00cb152ea94))
* no mongo updates loop ([ebfdd0b](https://github.com/Kukei-eu/spider/commit/ebfdd0b3d9b29483ddf89e6ea368b404682b9b22))
* no zachleat twitter archive ([fd239d4](https://github.com/Kukei-eu/spider/commit/fd239d45a6f24f1f45d90b6062a0b52ab9c61fc7))

# [1.4.0](https://github.com/Kukei-eu/spider/compare/v1.3.1...v1.4.0) (2023-12-31)


### Bug Fixes

* correct sources link in README (fixes [#3](https://github.com/Kukei-eu/spider/issues/3)) ([6836dec](https://github.com/Kukei-eu/spider/commit/6836decc9a2a751a4c2683a745f7aa7d14cbc9b5))
* nobody uses it and it's not about security here but why not ignoring vbscript: too ([2adcf01](https://github.com/Kukei-eu/spider/commit/2adcf01fd6f4316f2bd4a667779cd7737a441ccd))
* skip some huge websites for now ([5bc5857](https://github.com/Kukei-eu/spider/commit/5bc58573a1fcaaf59c79268976d820bd11bc0685))


### Features

* gather stats periodically ([28cd583](https://github.com/Kukei-eu/spider/commit/28cd583592d9caa3ce0f7808ecbe37133f6ce208))
* ignore common assets extensions ([39920ed](https://github.com/Kukei-eu/spider/commit/39920edaccecfc3620aa0c397956ad2eaab78742))
* ignore postgresql mailing list urls ([2d33b0f](https://github.com/Kukei-eu/spider/commit/2d33b0f66069276fad497fba89c64207c42e8ba2))
* optional ttl for process ([d9467da](https://github.com/Kukei-eu/spider/commit/d9467da6e6e0b9dcc76595538d9864b45a4e89f5))

## [1.3.1](https://github.com/Kukei-eu/spider/compare/v1.3.0...v1.3.1) (2023-12-18)


### Bug Fixes

* fix apache broken relative links that pollute mongo db ([0da8f67](https://github.com/Kukei-eu/spider/commit/0da8f671e7ba597bed8493e066f55eb624d0d55f))
* fix apache broken relative links that pollute mongo db ([f6cd234](https://github.com/Kukei-eu/spider/commit/f6cd2340775ed02502e833aad4e16e402ed50d74))
* proper way of ensuring we're adding redirected url to the index ([c898e7c](https://github.com/Kukei-eu/spider/commit/c898e7c3f82635fe9efdd58d92e680927a3d3df4))
* skip some huge websites for now ([ce82188](https://github.com/Kukei-eu/spider/commit/ce82188cb4f740486912022bc498dc083dfea0f5))

# [1.3.0](https://github.com/Kukei-eu/spider/compare/v1.2.0...v1.3.0) (2023-12-16)


### Features

* randomize crawler picks to improve performance and avoid many crawlers polite waiting for the same site ([6840766](https://github.com/Kukei-eu/spider/commit/6840766c7690644a3fa43bd39de55bf92e34a81c))

# [1.2.0](https://github.com/Kukei-eu/spider/compare/v1.1.0...v1.2.0) (2023-12-16)


### Features

* crawl only new sources by default root crawling ([e7abbce](https://github.com/Kukei-eu/spider/commit/e7abbce9a6f5bb699a15fdb5fe2eeadbfbaf402b))

# [1.1.0](https://github.com/Kukei-eu/spider/compare/v1.0.0...v1.1.0) (2023-12-15)


### Features

* change crawling design from naive to smarter (one visit per link) ([77b3401](https://github.com/Kukei-eu/spider/commit/77b3401f8b76449f0d7c127da55d3def9fefb41d))

# 1.0.0 (2023-12-13)


### Bug Fixes

* abort on stuck ([a7c9bad](https://github.com/Kukei-eu/spider/commit/a7c9bad80c6fcaef14dfe4456890dc2b1f063e64))
* ensure db is closed ([9821d81](https://github.com/Kukei-eu/spider/commit/9821d81f9ac4004fd03d5c59ab22d41d461874e1))
* id was actually needed ([2244d22](https://github.com/Kukei-eu/spider/commit/2244d22dc0250977bac034a07cd545eb917fd2ec))
* less verbose logs ([5add8ec](https://github.com/Kukei-eu/spider/commit/5add8ec73359a2a8cb52c97829d08306728af670))
* missed rename ([e9bde9b](https://github.com/Kukei-eu/spider/commit/e9bde9b122a39b0fcb9a66569808fc136c79231f))
* normalize url before setting up to registry ([63cae38](https://github.com/Kukei-eu/spider/commit/63cae38d11f263e300f7629c0dc48ed98ecbb40e))


### Features

* add Brad Frost blog and CSS Tricks magazine ([e413a05](https://github.com/Kukei-eu/spider/commit/e413a051ff850063291879ed2f997ab9b3622616))
* add hostnames ([2b77edc](https://github.com/Kukei-eu/spider/commit/2b77edcd183dc23462f00923233f20926e16f777))
* add https://johan.hal.se ([21dc3fb](https://github.com/Kukei-eu/spider/commit/21dc3fb0618868ead740ca3c09f4d9585e87893f))
* add https://khalidabuhakmeh.com ([cac1787](https://github.com/Kukei-eu/spider/commit/cac1787ff30a999169919d8a7fd799d6c990a374))
* add matuzo.at ([72e9a6e](https://github.com/Kukei-eu/spider/commit/72e9a6e66728bddae0fafd0466779006e6bd565f))
* add more blogs ([7f59b16](https://github.com/Kukei-eu/spider/commit/7f59b166c0aa37984464057d351d26face140b2d))
* add more docs ([9669527](https://github.com/Kukei-eu/spider/commit/9669527b6551791c7ed17912d24c7264c0c05b2a))
* add sandbox ([b5ee139](https://github.com/Kukei-eu/spider/commit/b5ee139a5dcf3acbce42ab57516b9492c56fd96b))
* add smashing magazine to see if meilisearch will go belly up ([08c47a0](https://github.com/Kukei-eu/spider/commit/08c47a06cf47a71043fa9cc01dee1990a7f5a38b))
* add smashing magazine to see if meilisearch will go belly up ([f640eb9](https://github.com/Kukei-eu/spider/commit/f640eb937d877f941bcc3298d46ce57a727c580d))
* add web.dev and dev.to magazines ([8003423](https://github.com/Kukei-eu/spider/commit/8003423759a53cdd5a85cc9685f83e3d77509ddc))
* auto crawler ([0b31d60](https://github.com/Kukei-eu/spider/commit/0b31d601fdede37aeb45ea357f1d8c0f929593a0))
* blog that just helped me look up abort signal ([96206e7](https://github.com/Kukei-eu/spider/commit/96206e74bc0aec71c23bc771b4db4dfee6203b8e))
* crawler ([a76219a](https://github.com/Kukei-eu/spider/commit/a76219a98220e983d3c071d210c3551c95230a9a))
* decreate the time between indexing to 2 days ([52f8bfe](https://github.com/Kukei-eu/spider/commit/52f8bfe4f337ead2914420e9423c3fc7eaa6e7d9))
* different indexes for different type of content ([6112b75](https://github.com/Kukei-eu/spider/commit/6112b751e294d349c2942aaafa6be222abc57568))
* document sources ([e64dfb6](https://github.com/Kukei-eu/spider/commit/e64dfb62c621513953b66c24ee438498df705768))
* ensure it runs in docker ([324ee9e](https://github.com/Kukei-eu/spider/commit/324ee9ec56c31a1245f6334364c2968733da9ca4))
* ensure no website gets called twice in the same day ([f8de6ed](https://github.com/Kukei-eu/spider/commit/f8de6ed299f57ac9e7b252d59eca2e84dcf102d7))
* ignore hrefs that look useless ([b49161d](https://github.com/Kukei-eu/spider/commit/b49161deb642129ba021959e60fcf5b81c8e7b5a))
* initial crawler ([ea51ed4](https://github.com/Kukei-eu/spider/commit/ea51ed4245e587607a5df7aaf46109fee281c6c3))
* less verbose log ([6004a5e](https://github.com/Kukei-eu/spider/commit/6004a5e193f3a38f64d150cb006894ca55ba5eb7))
* minimum 500 polite wait ([f4635a1](https://github.com/Kukei-eu/spider/commit/f4635a19a6ec12acbe35ffcd50d308f3ab4ff5cd))
* moar sources ([40f37b6](https://github.com/Kukei-eu/spider/commit/40f37b6ab1154c639b88f126ff4edf4268abbd4a))
* more blogs ([f72b6bc](https://github.com/Kukei-eu/spider/commit/f72b6bc2f3ba475685b72c33cf06b45b167436ef))
* more sources ([73f1bd2](https://github.com/Kukei-eu/spider/commit/73f1bd2228b83fd8d40ee16d75b4126bcd440bed))
* more sources ([09492f9](https://github.com/Kukei-eu/spider/commit/09492f966c935179f4b0be0eb21855b757315691))
* remove old code that caused mongo error ([fd25820](https://github.com/Kukei-eu/spider/commit/fd25820180753feee3d7804bf9fd428bdfe59260))
* support robots.txt + lang/createdAt atts in the index ([3ee374a](https://github.com/Kukei-eu/spider/commit/3ee374abb41a52e09c6aa7f7495582b9c4cf6945))

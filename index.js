'use strict';

import scrape from 'website-scraper';
import MyResourceSaver from './resourceSaver';
import rimraf from 'rimraf';
import cheerio from 'cheerio';
import { map, find } from 'lodash';

const script = '<script>document.addEventListener("DOMContentLoaded", function(event) {console.log("DOM fully loaded and parsed");});</script>';

const getUrls = () => {
  let args = find( process.argv, (a) => {
    return a.split('urls=').length > 1;
  });
  let urls = args.split('urls=').splice(1)[0].split(',');
  console.log(urls);
  return urls;
}

const defaultUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A';

const config = {
  urls: getUrls(),
  directory: 'scraped/',
  userAgent: null
}

const options = {
  urls: config.urls,
  directory: config.directory,
  request: {
    headers: {
      'User-Agent': config.userAgent || defaultUserAgent
    }
  }
}

const perform = () => {
  scrape(options).then((result) => {
    console.log('Saved to ' + options.directory);
  }).catch((err) => {
    console.log(err);
  });
}

rimraf(options.directory, perform);


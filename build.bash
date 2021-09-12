#!/bin/bash

source /home5/eakloeor/nodevenv/public_html/www.kudadam.com/14/bin/activate && cd /home5/eakloeor/public_html/www.kudadam.com
npm config set scripts-prepend-node-path true
npm install
pm2 restart website
touch tmp/restart.txt
sleep 5 # Makes sure the server has restarted before it goes on to generate the sitemap
rm sitemap.xml #removes an existing sitemap file if it exists
npm install sitemap-generator
node src/lib/scripts/generateSitemap.js #Then it generates a new sitemap file
npm uninstall sitemap-generator
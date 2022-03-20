#!/bin/bash

source /home5/eakloeor/nodevenv/public_html/kudadam.com/14/bin/activate && cd /home5/eakloeor/public_html/kudadam.com
npm config set scripts-prepend-node-path true
npm install
touch tmp/restart.txt
sleep 5 # Makes sure the server has restarted before it goes on to generate the sitemap
rm sitemap.xml #removes an existing sitemap file if it exists
npm install sitemap-generator && node generateSitemap.js && npm uninstall sitemap-generator
rm -rf static src .svelte-kit .gitignore .prettierrc .jsconfig.json mdsvex.config.js README.md tailwind.config.cjs postcss.config.cjs .eslintrc.cjs jsconfig.json
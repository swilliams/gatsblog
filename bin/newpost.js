const path = require('path');
const fs = require('fs');

const ensureFolderExists = (p) => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
};

const dasherize = (s) => {
  const punc = /['"]/g;
  let safe = s.replace(punc, '');
  safe = safe.replace(' ', '-');
  return s.toLowerCase();
};

let p = path.join(__dirname, '../content/blog');

const dte = new Date();
const y = dte.getFullYear() + '';
let m = dte.getMonth() + 1;
m = m < 10 ? '0' + m : m + '';
const day = dte.getDate() + '';

p = path.join(p, y);
ensureFolderExists(p);
p = path.join(p, m);
ensureFolderExists(p);
p = path.join(p, day);
ensureFolderExists(p);

const readTitle = () => {
  return process.argv.slice(2).join(' ');
}

const title = readTitle();
const escapedTitle = dasherize(title);
p = path.join(p, escapedTitle);
ensureFolderExists(p);

const template = `---
layout: post
title: "${title}"
date: ${dte.toISOString()}
categories: 
---
`;

p = path.join(p, 'index.md');

fs.writeFileSync(p, template);


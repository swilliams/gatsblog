const path = require('path');
const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir) {
  const subdirs = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

const convertFile = (filePath) => {
  const filename = path.basename(filePath);
  const destName = `${filename}.md`;
  let postText = fs.readFileSync(filePath, 'utf8');
  // remove <div>, </div>, <p>, </p>
  postText = postText.replace('<div>', '\n');
  postText = postText.replace('</div>', '');
  postText = postText.replace('<p>', '\n');
  postText = postText.replace('</p>', '');
  fs.renameSync(filePath, destName);
};

const dir = path.join(__dirname, 'content/blog');

getFiles(dir)
  .then((files) => {
    // console.log(files)
    files.forEach((f) => {
      if (path.extname(f) === '.html') {
        convertFile(f);
      }
    });
  })
  .catch(e => console.error(e));

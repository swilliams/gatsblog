const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// Move posts from Octopress /_posts into the gatsby project in their 
// own folders. Something like /src/pages/2017-08-...

const octoFolderPath = '/Users/swilliams/blog/source/_posts';
const gatsbyFolderPath = './content/blog';

const getDateComponents = (s) => {
  const pattern = /^(\d{4}-\d{2}-\d{2})/;
  const [dateStr] = pattern.exec(s);
  if (!dateStr) { throw 'Couldnt parse date str'; }
  const [year, month, day] = dateStr.split('-');
  return { year, month, day };
}

const stripDateFromString = (s) => {
  // 2018-11-30-what-are-you-struggling-with.markdown
  const pattern = /^(\d{4}-\d{2}-\d{2}-)/;
  return s.replace(pattern, '');
};

const removeExtension = (s) => {
  return s.replace(/\.[a-z]+$/, '');
}

const updateDateInPost = (s) => {
  const pattern = /date: (\d{4}-\d{2}-\d{2}.*)/g;
  const result = pattern.exec(s);
  if (result === null) { return null; }
  const d = new Date(result[1]);
  const isoString = d.toISOString();
  const replacement = `date: ${isoString}`;
  return s.replace(pattern, replacement);
}

const getExtension = (s) => {
  const pattern = /\.([a-z]+)$/;
  const result = pattern.exec(s);
  if (result === null) { return null; }
  return result[1];
}

const makeDir = (title, dateComponents) => {
  const { year, month, day } = dateComponents;
  let p = path.join(gatsbyFolderPath, year);
  ensureFolderExists(p);
  p = path.join(p, month);
  ensureFolderExists(p);
  p = path.join(p, day);
  ensureFolderExists(p);
  p = path.join(p, title);
  ensureFolderExists(p);
  return p;
};

const handleMarkdown = (f) => {
  const fullPath = path.join(octoFolderPath, f);
  const dateComponents = getDateComponents(f);
  const postTitle = removeExtension(stripDateFromString(f));
  const postText = fs.readFileSync(fullPath, 'utf8');
  const updatedPostText = updateDateInPost(postText);
  if (updatedPostText === null) {
    console.log('couldnt update date in ', postTitle);
    return; 
  }
  const folderPath = makeDir(postTitle, dateComponents);
  const writeFilePath = path.join(folderPath, 'index.md');
  fs.writeFileSync(writeFilePath, updatedPostText);

};

const handleHtml = (f) => {
  const fullPath = `${octoFolderPath}/${f}`;
  const dateComponents = getDateComponents(f);
  const postTitle = removeExtension(stripDateFromString(f));
  const postText = fs.readFileSync(fullPath, 'utf8');
  const updatedPostText = updateDateInPost(postText);
  if (updatedPostText === null) {
    console.log('couldnt update date in ', postTitle);
    return; 
  }
  const folderPath = makeDir(postTitle, dateComponents);
  const writeFilePath = path.join(folderPath, 'index.html');
  fs.writeFileSync(writeFilePath, updatedPostText);
};

const importPosts = () => {
  const files = fs.readdirSync(octoFolderPath);
  files.forEach((f) => {
    if (f === '.DS_Store') { return; }
    // console.log('reading:', fullPath);
    const ext = getExtension(f);
    if (ext === 'markdown' || ext === 'md') {
      handleMarkdown(f);
    } else if (ext === 'html') {
      handleHtml(f);
    } else {
      console.log('unknown filetype', f);
    }

    // console.log('writing', writeFilePath);

  });

};

const ensureFolderExists = (p) => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
};

const removeGatsbyPosts = () => {
  const files = fs.readdirSync(gatsbyFolderPath);
  files.forEach((f) => {
    const p = path.join(gatsbyFolderPath, f);
    if (fs.lstatSync(p).isDirectory()) {
      rimraf.sync(p);
    }
  });
}

const run = () => {
  removeGatsbyPosts();
  // importPosts();
}

run();

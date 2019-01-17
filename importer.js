const fs = require('fs');

// Move posts from Octopress /_posts into the gatsby project in their 
// own folders. Something like /src/pages/2017-08-...

const octoFolderPath = '/Users/swilliams/blog/source/_posts';
const gatsbyFolderPath = './content/blog';

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

const handleMarkdown = (f) => {
  const fullPath = `${octoFolderPath}/${f}`;
  const postTitle = removeExtension(stripDateFromString(f));
  const postText = fs.readFileSync(fullPath, 'utf8');
  const updatedPostText = updateDateInPost(postText);
  if (updatedPostText === null) {
    console.log('couldnt update date in ', postTitle);
    return; 
  }
  fs.mkdirSync(`${gatsbyFolderPath}/${postTitle}`);
  const writeFilePath = `${gatsbyFolderPath}/${postTitle}/index.md`;
  fs.writeFileSync(writeFilePath, updatedPostText);

};

const handleHtml = (f) => {
  const fullPath = `${octoFolderPath}/${f}`;
  const postTitle = removeExtension(stripDateFromString(f));
  const postText = fs.readFileSync(fullPath, 'utf8');
  const updatedPostText = updateDateInPost(postText);
  if (updatedPostText === null) {
    console.log('couldnt update date in ', postTitle);
    return; 
  }
  fs.mkdirSync(`${gatsbyFolderPath}/${postTitle}`);
  const writeFilePath = `${gatsbyFolderPath}/${postTitle}/index.html`;
  fs.writeFileSync(writeFilePath, updatedPostText);
};

// get all the files in _posts
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
// strip the date from the filename
// open the file, parse the date format that looks like this:
//
// date: 2018-12-11 11:11:51 -0700
//
// to:
// 
// date: '2015-05-01T22:12:03.284Z'
// console.log(files);

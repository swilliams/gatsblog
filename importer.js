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

const updateDateInPost = (s) => {
  const pattern = /date: (\d{4}-\d{2}-\d{2}.+)/g;
  const result = pattern.exec(s);
  if (result === null) { return null; }
  const d = new Date(result[1]);
  const isoString = d.toISOString();
  return s.replace(pattern, isoString);
}

// get all the files in _posts
const files = fs.readdirSync(octoFolderPath);
files.forEach((f) => {
  const fullPath = `${octoFolderPath}/${f}`;
  const postText = fs.readFileSync(fullPath);
  const updatedPostText = updateDateInPost(postText);
  const postTitle = stripDateFromString(f);
  fs.mkdirSync(`${octoFolderPath}/${postTitle}`);
  const writeFilePath = `${octoFolderPath}/${postTitle}/index.md`;
  fs.writeFileSync(writeFilePath, updatedPostText);
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

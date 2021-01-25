const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'https://nalatenschap-do-hfuai.ondigitalocean.app'
  ); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const {
  getDirectoryItems,
  getDirectoryMedia,
  getDownloadUrl,
  downloadFile,
  checkFolder,
  sendSession,
} = require('webdav.js');

// Move to helper library
function splitPath(path) {
  const regex = /^(.+)\/([^\/]+)$/gm;
  let m;
  while ((m = regex.exec(path)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    return m;
  }
}

exports.handler = async function (event, context) {
  const path = '/fotografie en eigen werk/GANSBERG KOEKELHOREN';
  // const images = await client.getDirectoryContents("/", { deep: true, glob: "/**/*.{png,jpg,gif}" });
  let items = await getDirectoryItems(path);
  // console.log('all items in folder', items)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: items }),
  };
};

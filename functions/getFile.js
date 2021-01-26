const {
  getDirectoryItems,
  checkFolder,
  getDirectoryMedia,
  getDownloadUrl,
  downloadFile,
  sendSession,
} = require('../helpers/webdav.js');

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

exports.handler = async function(event, context) {
  const path = event.queryStringParameters.path;

  // Seperate path and file name
  const pathArray = splitPath(path);
  console.log('THE PATH ARAAY', pathArray);
  // console.log('sending to downloadFile', path)
  const base64 = await downloadFile(pathArray[0], pathArray[1], pathArray[2]);
  // console.log('check if text file, if so, add first line to the object')

  // console.log('WHY THIS NO WORK?', downloaded)

  return {
    statusCode: 200,
    body: JSON.stringify(base64),
  };
};

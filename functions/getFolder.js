const { checkFolder } = require('../helpers/webdav.js');

exports.handler = async function(event, context) {
  const path = '/fotografie en eigen werk/GANSBERG KOEKELHOREN';
  // const images = await client.getDirectoryContents("/", { deep: true, glob: "/**/*.{png,jpg,gif}" });
  // let items = await getDirectoryItems(path);
  let items = await checkFolder(path);
  // console.log('all items in folder', items)
  // console.log(items);
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

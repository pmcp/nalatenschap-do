const { getDirectoryItems } = require('../helpers/webdav.js');

exports.handler = async function(event, context) {
  const session = JSON.parse(req.query.session);
  const user = JSON.parse(req.query.user);
  let sessionSend = await sendSession(user, session);

  return {
    statusCode: 200,
    body: JSON.stringify(sessionSend),
  };
};

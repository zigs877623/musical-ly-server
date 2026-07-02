const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createLegacyResponse = (code, message, data = {}) => {
  return {
    code: code.toString(),
    message: message,
    desc: message,
    success: code === 200,
    result: data,
    info: {},
    serverTime: Date.now()
  };
};

app.post('/v2/login.do', (req, res) => {
  const { username } = req.body;
  const displayUsername = username ? username.replace('@', '') : 'User';
  res.json(createLegacyResponse(200, "ok", {
    userId: 12345,
    handle: displayUsername,
    nickName: displayUsername,
    icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + displayUsername
  } ));
});

app.get('/rest/v2/musicals/*', (req, res) => {
  res.json(createLegacyResponse(200, "ok", { content: [], hasNext: false }));
});

app.get('/', (req, res) => {
  res.send('Server Musical.ly Aktif!');
});

module.exports = app;

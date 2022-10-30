const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3000;

const http = require('node:http');
const https = require('node:https');

axios.defaults.httpAgent = new http.Agent({ timeout: 2000 });
axios.defaults.httpsAgent = new https.Agent({ timeout: 2000 });

app.use(express.urlencoded({ extended: true }));

const deref = async (link) => {
  const response = await axios.get(link, {
    timeout: 2000,
    maxRedirects: 0,
    validateStatus: null,
  }).catch(error => {
    let message;

    if (error.code === 'ECONNABORTED') message = `Connection to ${link} timed out!`;
    else message = `Could not resolve host ${link}!`;

    throw new Error(message);
  });

  return response.headers.location || link;
};

// serve files from the `web/` folder
app.use('/', express.static('web', { extensions: ['html'] }));

app.post('/api', async (req, res) => {
  let link = req.body && req.body.link;

  if (link === null || link === undefined || typeof link !== 'string' || link === '') {
    res.status(400).json({ message: "Please send a valid link to trace in request body!" });
    return;
  }

  link = (link.indexOf('://') === -1) ? 'http://' + link : link;
  let log = [link];

  for (let url = link; true;) {
    let destination;

    try {
      destination = await deref(url);
    } catch (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (typeof destination === 'object') {
      res.status(destination.code).json({ message: destination.message });
    }

    let origin = (new URL(url)).origin;
    if (destination == url) break;

    destination = (destination[0] == '/') ? (origin + destination) : destination;
    log.push(destination);
    url = destination;
  }

  res.json({
    redirect_count: log.length - 1,
    start_url: link,
    final_url: log[log.length - 1],
    route_log: log
  });
});

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log("Server listening on PORT:", PORT);
});

module.exports = app;

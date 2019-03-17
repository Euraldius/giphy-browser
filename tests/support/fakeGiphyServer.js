const express = require('express');
const cloneDeep = require('lodash.cloneDeep');

const app = express();
const port = 3002;

app.get('/v1/gifs/trending', (req, res) => {
  const offset = req.query.offset || 0;
  const gifs = [];
  const gif = { title: 'emma goldman kicks butt', images: { fixed_height: '' } };

  for(let i = 0; i <= 60; i++) {
    const newGif = cloneDeep(gif);
    const id = `test-id-${offset + i}`;

    newGif.id = id;

    gifs.push(newGif);
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({ data: gifs, pagination: { offset, content: 1 } }));
});

app.listen(port, () => console.log(`Fake Giphy Server listening on port ${port}!`))

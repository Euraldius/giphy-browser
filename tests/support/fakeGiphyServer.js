const express = require('express');
const cloneDeep = require('lodash.cloneDeep');

const app = express();
const port = 3002;

const testGifs = (title, offset) => {
  const gifs = [];
  const gif = {
    title,
    images: {
      fixed_width: { url: 'http://localhost:3002/black-cat-small.gif' },
      original: { url: 'http://localhost:3002/black-cat.gif' },
    },
  };

  for(let i = 0; i < 200; i++) {
    const newGif = cloneDeep(gif);
    const id = `test-id-${offset + i}`;

    newGif.id = id;

    gifs.push(newGif);
  }

  return gifs;
};

app.get('/v1/gifs/trending', (req, res) => {
  const offset = req.query.offset || 0;
  const gifs = testGifs('emma goldman kicks butt', offset);

  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({ data: gifs, pagination: { offset, content: 60 } }));
});

app.get('/v1/gifs/search', (req, res) => {
  if (req.query.q === 'no results') {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify({
      data: [],
      pagination: { offset: 0, content: 0, total_count: 0 },
    }));
  } else {
    const offset = req.query.offset || 0;
    const gifTitle = req.query.q === 'black cats' ? 'Purrr' : 'You found me!';
    const gifs = testGifs(gifTitle, offset);

    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify({ data: gifs, pagination: { offset, content: 60, total_count: 120 } }));
  }
});

app.use(express.static('tests/support/test_images'));
app.listen(port, () => console.log(`Fake Giphy Server listening on port ${port}!`));

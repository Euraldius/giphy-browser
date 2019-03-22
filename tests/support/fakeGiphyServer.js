const express = require('express');
const cloneDeep = require('lodash.clonedeep');

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
  res.send(JSON.stringify({ data: gifs, pagination: { total_count: 1000 } }));
});

let lastSearchTerm;
app.get('/v1/gifs/search', (req, res) => {
  const { offset, q } = req.query;
  let data = [];
  let status = 200;
  let total_count = 0;

  if (q !== lastSearchTerm && offset > 0) {
    status = 500;
  } else if (q !== 'no results') {
    const gifTitle = q === 'black cats' ? 'Purrr' : 'You found me!';

    data = testGifs(gifTitle, offset);
    total_count = 1000; // arbitrary, increase/decrease if necessary

    lastSearchTerm = q;
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.status(status).send(
    JSON.stringify({ data, pagination: { total_count } })
  );
});

app.use(express.static('tests/support/test_images'));
app.listen(port, () => console.log(`Fake Giphy Server listening on port ${port}!`));

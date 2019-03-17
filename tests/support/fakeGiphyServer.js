const express = require('express');
const app = express();
const port = 3002;

app.get('/v1/gifs/trending', (req, res) => {
  const gifs = [{ id: 'test-id', title: 'emma goldman kicks butt', images: { fixed_height: '' } }];

  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({ data: gifs }));
});

app.listen(port, () => console.log(`Fake Giphy Server listening on port ${port}!`))

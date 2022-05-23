const router = require('express').Router();
const { genreService } = require('../services');

router.get('/', async (req, res) => {
  const genre = await genreService.load();
  res.send(genre);
});

router.get('/:genreId', async (req, res) => {
  const genre = await genreService.find(req.params.genreId);
  if (!genre) return res.status(404).send('Cannot find genre');
  res.send(genre);
});

router.post('/genre', async (req, res) => {
  const { name, userId } = req.body;

  await genreService.createGenre(userId, name);

  res.send('ok');
});

module.exports = router;

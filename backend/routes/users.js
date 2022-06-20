const router = require('express').Router();
const { userService, listService } = require('../services');

router.post('/', async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(user);
});

router.delete('/:userId', async (req, res) => {
  await userService.removeBy('_id', req.params.userId);

  res.send('ok');
});

router.get('/:userId', async (req, res) => {
  let user = await userService.find(req.params.userId);
  if (!user) return res.status(d).send('Cannot find user');
  console.log(user);
  res.send(user);
});

router.post('/login', async (req, res) => {
  const { usernameOrMail, password } = req.body;
  const resp = await userService.login(usernameOrMail, password);
  res.send(resp);
});

router.post('/:userId/lists', async (req, res) => {
  const { userId } = req.params;
  const { name, isPublic } = req.body;

  const list = await listService.createList(userId, name, isPublic);
  res.send('ok');
});

router.post('/:userId/lists/:listId', async (req, res) => {
  const { userId, listId } = req.params;
  const { songs } = req.body;

  await listService.addToList(userId, listId, songs);

  res.send('ok');
});

router.post('/:userId/saveSong/:songId', async (req, res) => {
  const { userId, songId } = req.params;
  const user = await userService.saveSong(userId, songId);
  res.send(user);
});

module.exports = router;

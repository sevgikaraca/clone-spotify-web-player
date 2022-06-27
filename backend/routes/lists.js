const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const db = require('../mongo-connection');
const { listService } = require('../services');

router.get('/', async (req, res) => {
  let lists = await listService.load();
  lists = lists.filter((list) => list.isPublic == true);
  res.send(lists);
});

router.get('/:listId', async (req, res) => {
  const list = await listService.find(req.params.listId);
  if (!list) return res.status(404).send('Cannot find list');
  res.send(list);
});

router.get('/playlistCover/:playlistCoverId', async (req, res) => {
  const playlistCoverId = new mongoose.mongo.ObjectID(req.params.playlistCoverId);
  res.set('content-type', 'image/png');
  res.set('accept-ranges', 'bytes');

  const bucket = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'playlistCovers',
  });

  const downloadStream = bucket.openDownloadStream(playlistCoverId);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', (err) => {
    console.log('error', err);
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});

router.post('/playlist', async (req, res) => {
  const { userId, name, isPublic, songs } = req.body;
  const data = await listService.createList(userId, name, isPublic, songs);
  res.send('ok');
});

router.post('/playlistCover/:playlistId', async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fields: 9, fileSize: 20000000, files: 9, parts: 9,
    },
  });

  upload.single('playlistCover')(req, res, err => {
    try {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);

      const bucket = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'playlistCovers',
      });

      const { playlistId } = req.params;
      const uploadStream = bucket.openUploadStream(req.body.name);
      const { id } = uploadStream;
      readableTrackStream.pipe(uploadStream);

      uploadStream.on('error', () => res.status(500).json({ message: 'Dosya yükleme hatası' }));

      uploadStream.on('finish', async () => {
        await listService.update(playlistId, {playlistCoverId: new mongoose.mongo.ObjectID(id)});
        res.status(201).json({ message: `Dosya başarıyla yüklendi, Mongo ObjectID: ${id}` });
      });
    } catch (err) {
      console.log(err);
    }
  });

  res.send('ok');
});

module.exports = router;

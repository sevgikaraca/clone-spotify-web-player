const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const db = require('../mongo-connection');
const { albumService } = require('../services');

router.get('/', async (req, res) => {
  const album = await albumService.load();
  console.log(album);
  res.send(album);
});

router.get('/:albumId', async (req, res) => {
  const album = await albumService.find(req.params.albumId);
  if (!album) return res.status(404).send('Cannot find genre');
  res.send(album);
});

router.get('/albumCover/:albumCoverId', async (req, res) => {
  const albumCoverId = new mongoose.mongo.ObjectID(req.params.albumCoverId);
  res.set('content-type', 'image/png');
  res.set('accept-ranges', 'bytes');

  const bucket = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'albumCovers',
  });

  const downloadStream = bucket.openDownloadStream(albumCoverId);

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

router.post('/album', async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fields: 9, fileSize: 20000000, files: 9, parts: 9,
    },
  });

  upload.single('albumCover')(req, res, err => {
    try {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);

      const bucket = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'albumCovers',
      });

      const { userId, name, artistId } = req.body;
      const uploadStream = bucket.openUploadStream(req.body.name);
      const { id } = uploadStream;
      readableTrackStream.pipe(uploadStream);

      uploadStream.on('error', () => res.status(500).json({ message: 'Dosya y??kleme hatas??' }));

      uploadStream.on('finish', async () => {
        await albumService.createAlbum(userId, artistId, name, new mongoose.mongo.ObjectID(id));
        res.status(201).json({ message: `Dosya ba??ar??yla y??klendi, Mongo ObjectID: ${id}` });
      });
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;

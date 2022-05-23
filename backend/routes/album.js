const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const db = require('../mongo-connection');
const { albumService } = require('../services');

router.get('/', async (req, res) => {
  const album = await albumService.load();
  res.send(album);
});

router.get('/:albumId', async (req, res) => {
  const album = await albumService.find(req.params.albumId);
  if (!album) return res.status(404).send('Cannot find genre');
  res.send(album);
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

      const { userId, name, artistId, songs } = req.body;
      const uploadStream = bucket.openUploadStream(req.body.name);
      const { id } = uploadStream;
      readableTrackStream.pipe(uploadStream);

      uploadStream.on('error', () => res.status(500).json({ message: 'Dosya yükleme hatası' }));

      uploadStream.on('finish', async () => {
        await albumService.createAlbum(userId, artistId, name, songs, new mongoose.mongo.ObjectID(id));
        res.status(201).json({ message: `Dosya başarıyla yüklendi, Mongo ObjectID: ${id}` });
      });
    } catch (err) {
      console.log(err);
    }
  });

  res.send('ok');
});

module.exports = router;

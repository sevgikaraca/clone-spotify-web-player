const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const db = require('../mongo-connection');
const songService = require('../services/song-service');

router.get('/', async (req, res) => {
  const songs = await songService.load();
  res.send(songs);
});

router.get('/:songId', async (req, res) => {
  const song = await songService.find(req.params.songId);
  res.send(song);
});

router.get('/artist/:artistId', async (req, res) => {
  const song = await songService.findBy('artists', req.params.artistId);
  res.send(song);
});

router.get('/track/:trackId', async (req, res) => {
  const trackId = new mongoose.mongo.ObjectID(req.params.trackId);
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  const bucket = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'tracks',
  });

  const downloadStream = bucket.openDownloadStream(trackId);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    console.log('error');
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});

router.post('/song', async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fields: 9, fileSize: 20000000, files: 9, parts: 9,
    },
  });

  upload.single('track')(req, res, err => {
    try {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);

      const bucket = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'tracks',
      });

      const {
        name, duration, releaseDate, artists, genres, recordCompany, userId, albumId
      } = req.body;
      const uploadStream = bucket.openUploadStream(req.body.name);
      const { id } = uploadStream;
      readableTrackStream.pipe(uploadStream);

      uploadStream.on('error', () => res.status(500).json({ message: 'Dosya yükleme hatası' }));

      uploadStream.on('finish', async () => {
        await songService.addSong(
          userId,
          new mongoose.mongo.ObjectID(id),
          name,
          duration,
          releaseDate,
          artists,
          genres,
          recordCompany,
          albumId,
        );
        res.status(201).json({ message: `Dosya başarıyla yüklendi, Mongo ObjectID: ${id}` });
      });
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;

const BaseService = require('./base-service');
const Album = require('../models/album');
const userService = require('./user-service');
const artistService = require('./artist-service');

class AlbumService extends BaseService {
    async createAlbum(userId, artistId, name, songs, albumCoverId) {
      const user = await userService.find(userId);
      let album;
      if (user) {
        album = await this.insert({ name, songs, albumCoverId });
        let artist = await artistService.find({_id: artistId });
        console.log(artist.albums)
        console.log(album._id)
        artist = await artistService.update(artist._id, { albums: [...artist.albums, album._id],});
      } else {
        return new Error('Invalid User!');
      }
      return album;
    }
}

module.exports = new AlbumService(Album);

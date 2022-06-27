const BaseService = require('./base-service');
const Song = require('../models/song');
const userService = require('./user-service');

class SongService extends BaseService {
  async addSong(userId, id, name, duration, releaseDate, artists, genres, recordCompany, albumId) {
    const song = await this.insert({
      creatorUserId: userId,
      trackId: id,
      name,
      duration,
      releaseDate,
      artists,
      genres,
      recordCompany,
      album: albumId,
    });
    const user = await userService.find(userId);

    await userService.update(userId, user);

    return song;
  }

  async deleteSong(userId, songId) {
    const song = await this.find(songId);
    if (song.creatorUserId == userId) {
      await this.removeBy('_id', song.id);
    }
    return this;
  }

  async getWithAlbumInfo(){
    //
  }
}

module.exports = new SongService(Song);

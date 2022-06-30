const bcrypt = require('bcrypt');
const BaseService = require('./base-service');
const User = require('../models/user');

class UserService extends BaseService {
  async createUser({
    name, userName, email, password,
  }) {
    const salt = bcrypt.genSaltSync().toString();
    const pass = bcrypt.hashSync(password, salt);
    const user = await this.insert({
      name, userName, email, password: pass,
    });
    return user;
  }

  async login(usernameOrMail, password) {
    const user = await User.findOne({email: usernameOrMail}).select('+password') ||
      await User.findOne({  userName: usernameOrMail }).select('+password');

    if (!user) return false;

    const result = bcrypt.compareSync(password, user.password); // girilen şifre ve encrypt şifre karşılaştırılması
    if (result) {
      delete user.password;
      return user
    }
    return false;
  }

  async favSong(userId, songId) {
    const user = await this.find(userId);
    console.log(userId);
    user.favoriteSongs.push(songId);
    await this.update(userId, user);
  }

  async removeSong(userId, songId) {
    const user = await this.find(userId);
    const index = user.favoriteSongs.findIndex(song => {
      return song._id === songId;
    });
    user.favoriteSongs.splice(index, 1);
    await this.update(userId, user);
  }

  async saveList(userId, listId) {
    const user = await this.find(userId);
    user.savedLists.push(listId);
    await this.update(userId, user);
  }

  async followUser(userId, following) {
    const user = await this.find(userId);
    user.following.push(following);
    await this.update(userId, user);
  }

  async deleteUser(userId) {
    await this.removeBy('_id', userId);
  }
}

module.exports = new UserService(User);

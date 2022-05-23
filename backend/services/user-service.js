const bcrypt = require('bcrypt');
const BaseService = require('./base-service');
const User = require('../models/user');

class UserService extends BaseService {
  async createUser({
    name, userName, email, password,
  }) {
    console.log( name, userName, email, password);
    const salt = bcrypt.genSaltSync().toString();
    const pass = bcrypt.hashSync(password, salt);
    const user = await this.insert({
      name, userName, email, password: pass,
    });
    return user;
  }

  async login(usernameOrMail, password) {
    const user = await User.findOne({
      email: usernameOrMail,
    }) || await User.findOne({
      userName: usernameOrMail,
    });
    if (!user) return false;
    console.log(password, user)
    const result = bcrypt.compareSync(password, user.password);
    if (result) return user;
    return false;
  }

  async addToFavoriteSongs(userId, songId) {
    const user = await this.find(userId);
    user.favoriteSongs.push(songId);
    await this.update(userId, user);
  }

  async saveList(userId, listId) {
    const user = await this.find(userId);
    user.savedLists.push(listId);
    await this.update(userId, user);
  }

  async addToQueue(userId, songId) {
    const user = await this.find(userId);
    user.queue.push(songId);
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

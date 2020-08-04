const axios = require("axios");
const Dev = require("../models/Dev");
const DevRequestBody = require("../models/DevRequestBody");
const { find } = require("../models/Dev");

module.exports = {
  async findAll(req, res) {
    var result = `{"error": "Mensagem de error"}`;
    const loggedDev = await Dev.find({}, function(err, result) {      
      if (err) {
        console.log(err);
      } else {
        result = res.json(result);
      }
    });
    return result;
  },

  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users);
  },

  async getByname(req, res) {
    const { username } = req.headers;

    const userExists = await Dev.findOne({ user: username });
  
    if (userExists) {
    const { name, bio, avatar_url: avatar } = userExists;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });    

      return res.json(dev);

    } else {

      return res.status(400).send({mensagem:"Não existe no banco de dados" });

    }
  },

  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });
    if (userExists) {
      return res.json(userExists);
    }

    let response = await axios.get(`https://api.github.com/users/${username}`);

    console.log(response.data);

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    return res.json(dev);
  }
};

const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { login, password, avatar, telephon } = req.body;
    if(login && typeof login === 'string' && password && typeof password ==='string' && avatar && typeof avatar === 'string' && telephon && typeof telephon === 'number'){
      const userWithLogin = await User.findOne({ login });
      if(userWithLogin){
       return res.status(409).send({ message: 'User with this login already exists' });
      }
      const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar, telephon });
      res.status(201).send({ message: 'User created' + user.login });
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch(err){
    res.status(500).send({ message: err });
  }
};

exports.login = async ( req, res) => {

};
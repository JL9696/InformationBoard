const Ad = require('../models/Ad.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find());
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const advert = await Ad.findById(req.params.id);
    if(!advert) res.status(404).json({ message: 'Not found...'});
    else res.json(advert);
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};

exports.addAd = async (req, res) => {
  try {
    const { title, description, pubdate, image, price, locaction, user } = req.body;
    const newAdvert = new Ad({ title: title, description: description, pubdate: pubdate, image: image, price: price, locaction: locaction, user: user });
    await newAdvert.save();
    res.json({ message: 'Ok' });
  } 
  catch(err){
    res.status(500).json({ message: err });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const advert = await Ad.findById(req.params.id);
    if(advert) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};

exports.uppdateAd = async (req, res) => {
  const { title, description, pubdate, image, price, locaction, user } = req.body;
  try {
    const advert = await Ad.findById(req.params.id);
    if(advert) {
      await Ad.updateOne({ _id: req.params.id}, { $set: { title: title, description: description, pubdate: pubdate, image: image, price: price, locaction: locaction, user: user }});
      res.json({ message: 'Ok' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};

exports.searchPhrase = async (req, res) => {
  const { searchPhrase } = req.params;
  try {
    const advert = await Ad.find({ $text: { $search: searchPhrase }});
    if(!advert) return res.status(404).json({ message: 'Not found...' });
    else res.json(advert);
  } 
  catch(err) {
    res.status(500).json({ message: err});
  }
};
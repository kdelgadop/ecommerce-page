const express = require('express')
const Thing = require('./models/thingsmodel')
// const OtherThing = require('./models/thingsmodel')

async function getItem(req, res, next) {
    let itemFound;
    try {
      itemFound = await Thing.findById(req.params.id);
      if (itemFound === null) {
        return res.status(404).json({ message: 'Cannor find Subscriber' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.itemFound = itemFound;
    next();
};

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const things = await Thing.find();
      res.json(things);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/', async (req, res) => {
    const thingy = new Thing({
        id: req.body.id,
        img: req.body.img,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });
    try {
      const newThing = await thingy.save();
      res.status(201).json(newThing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/:id', getItem, async (req, res) => {
    try {
      const theOne = await Thing.findById(req.params.id); 
      res.json(theOne);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })

  router.patch('/:id', getItem, async (req, res) => {
      if(req.body.id !== null) {
        res.itemFound.id = req.body.id;
      }
      if (req.body.name !== null) {
        res.itemFound.name = req.body.name;    
      }
      if(req.body.img !== null) {
        res.itemFound.img = req.body.img;
      }
      if (req.body.price !== null) {
        res.itemFound.price = req.body.price;    
      }
      if(req.body.img !== null) {
        res.itemFound.img = req.body.img;
      }
      if (req.body.description !== null) {
        res.itemFound.description = req.body.description; 
      }
      try {
        const updatedThing = await res.itemFound.save();
        res.json(updatedThing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.itemFound.remove();
        res.json({ message: 'Item Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);    
    }
});

// router.delete('/', async (req, res) => {
//     try {
//       const things = await Thing.find();
//       res.json(things);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
module.exports = router
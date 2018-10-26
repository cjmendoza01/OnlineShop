/**
 * notesRouter.js
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./data.json', { item: [] });

router.get('/', (req, res, next) => {
  console.log('Index page only');
  next();
}, (req, res) => {
  res.json(store.get('item'));
});

router.get('/:id', (req, res) => {
  let note = {};
  const item = store.get('item');
  note = item.find(item => item.id === req.params.id);
  res.json(note);
});

router.post('/', (req, res) => { //from index
  const item = store.get('item');
  const newNote = {
    id: item.length > 0 ? item[item.length - 1].id + 1 : 1,
    productName: req.body.productName,
    quantity: req.body.quantity,
    price: req.body.price
  };

  item.push(newNote);
  store.set('item', item);

  res.json(item);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const item = store.get('item');

  for(let i = 0; i < item.length; i++) {
    if(item[i].id === id) {
      item[i].productName = req.body.productName;
      item[i].quantity = req.body.quantity;
      item[i].price = req.body.price;
      break;
    }
  }

  store.set('item', item);
  res.json(store.get('item'));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const items = store.get('item');
  const newitems = items.filter(note => Number(note.id) !== Number(id));

  store.set('items', newitems);
  res.json(newitems);
});

module.exports = router;

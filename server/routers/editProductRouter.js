/**
 * aboutRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const store = new SimpleJsonStore('./data.json', { items: [] }); //notes

// router.get('/:id', (req, res) => {
//     let note = {};
//     const notes = store.get('notes');
//     res.render('editProduct.pug', {id: req.params.id});
// });

router.get('/:id', (req, res) => {
    let product = {};
    const items = store.get('item');
    product = items.find(items => Number(items.id) === Number(req.params.id));
    //res.json(note);
    console.log(product);
    
    res.render('editProduct.pug', {product: product});
    
  });

module.exports = router;

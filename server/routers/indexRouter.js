/**
 * indexRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

// Initializes the data-2.json file with item as its initial value if empty
const store = new SimpleJsonStore('./data-2.json', { item: [] });

router.get('/', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  // We can extend the viewModel and add new properties
  // e.g. viewModel.appName = 'Cardo';
  //      viewModel.count = 10;
  //      viewModel.choices = ['apple', 'orange', 'grapes'];
  // Read more: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
  viewModel.item = store.get('item');
  res.render('index.pug', viewModel);
});

router.post('/', function submitNotes(req, res) {
  // Process: Get item from json -> Add new note -> Save the item
  let item = store.get('item');
  item.push({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  store.set('item', item);

  //- It just reload the page on /
  // More on redirection: https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
  res.redirect('/');
});

module.exports = router;

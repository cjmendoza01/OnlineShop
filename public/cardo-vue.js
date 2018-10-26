(function() {
  var cardoVue = new Vue({
    el: '#cardoVue',
    data: {
      productName: null,
      quantity: null,
      price: null,
      item: [],
      cart: []
    },
    created: function() {
      var self = this;
      axios.get('http://localhost:3300/api/item')
        .then(function(res) {
          self.item = res.data;
        })
        .catch(function(err) {
          self.item = [];
        });
    },
    methods: {
      addNote: function() {
        var self = this;
        var payload = {
          productName: self.productName,
          quantity: self.quantity,
          price: self.price
        };
        axios.post('/api/item', payload)
          .then(function(res) {
            self.item = res.data;
            self.clear();
            window.location = '/';
            // self.item.push({
            //   id: 99,
            //   title: self.title,
            //   description: self.description
            // });
          })
          .catch(function(err) {
          });
      },

      editProduct: function(note) {
        var self = this;
        var payload = {
          productName: self.productName,
          quantity: self.quantity,
          price: self.price
        };
        axios.post('/' + note.id, payload)
          .then(function(res) {
            self.item = res.data;
            self.clear();            
         })
          .catch(function(err) {
         });
    }, 
      

      clear: function() {
        this.title = null;
        this.description = null;
      },
      
      deleteNote: function(note) {
        var self = this;
        axios.delete('/api/item/' + note.id)
          .then(function(res) {
            // self.item = res.data;
            var index = -1;
            for(var i = 0; i < self.item.length; ++i) {
              if(Number(self.item[i].id) === Number(note.id)) {
                index = i;
                break;
              }
            }
            self.item.splice(index, 1);
          })
          .catch(function(err) {
          });
      }, 
      addTocart: function(product){
        this.cart.push(product);
        this.cart.push(price);
        this.cart.push(quantity)
 
      }

    }
  });
  console.log(cardoVue);
})();
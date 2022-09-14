const db = require('./config/database');
const User = require('./models/user');
const Catalogue = require('./models/catalogue');
const Cart = require('./models/cart');
const Session = require('./models/session')
const Order = require('./models/order');
const Address = require('./models/address');
const LineItem = require('./models/lineItem');



Catalogue.sync({alter:true})
.then(()=>{console.log("catalogue table synced")})
.catch(()=>{console.log("problem catalogue user table")});

Cart.sync({alter:true})
.then(()=>{console.log("cart table synced")})
.catch(()=>{console.log("problem syncing cart table")});

Session.sync({alter:true})
.then(()=>{console.log("sessions table synced")})
.catch(()=>{console.log("problem syncing sessions table")});


Order.sync({alter:true})
.then(()=>{console.log("orders table synced")})
.catch(()=>{console.log("problem syncing orders table")});

Address.sync({alter:true})
.then(()=>{console.log("addresses table synced")})
.catch(()=>{console.log("problem syncing addresses table")});

LineItem.sync({alter:true})
.then(()=>{console.log("line_items table synced")})
.catch(()=>{console.log("problem syncing line_items table")});

User.sync({alter:true})
.then(()=>{console.log("users table synced")})
.catch(()=>{console.log("problem syncing user table")});


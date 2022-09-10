const db = require('./config/database');
const User = require('./models/user');
const Catalogue = require('./models/catalogue');
const Cart = require('./models/cart');
// const UserType = require('./models/usertype')
const Order = require('./models/order');
const Address = require('./models/address');
const Session = require('./models/session');
const LineItem = require('./models/lineItem');
LineItem.sync({alter: true})
.then((data)=>{
    console.log(data);
    console.log("table synced successfully");
})
.catch(()=>{
    console.log("Unsuccessfull sync");
})

// UserType.sync({alter: true})
// .then((data)=>{
//     console.log(data);
//     console.log("type table synced  successfully");
// })
// .catch(()=>{
//     console.log("Unsuccessfull sync");
// })

// User.create({ phone : '1234560', password : "123489" })
// .then(()=>{
//     console.log('data inserted');
// })
// .catch((error)=>{
//     console.log(error.message);
//     console.log('data not updated');
// });



// // Test DB
// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err))

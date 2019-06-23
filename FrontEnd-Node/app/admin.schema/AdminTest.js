const mongoose = require('./AdminSchema');
const Test = mongoose.model('Test');
const Admin = mongoose.model('Admin_Roles');

Admin.find({}).exec().then(data => {
    console.log('data: ' + data)
}).catch(err => {
    console.log('error: ' + err)
})


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Ishan:Ishan123@afcluster-ev5ge.mongodb.net/AF_WD_05?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const database = client.db("AF_WD_05");
//     console.log('database: ' + database.databaseName);
//     // perform actions on the collection object
//     // const cursor = database.collection('Admins').find({}).toArray((err, data) => {
//     //     if (err) {
//     //         console.error(err);
//     //         return;
//     //     }
//     //     console.log('Data: ' + data);
//     // })
//
//     const cursor = database.collection("Admins").find({}).toArray(function (err, result) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log('result: ' +result);
//     });
//     console.log(cursor);
//     client.close();
// });



// const newTest = new Test({
//     name: 'Sohan',
//     age: 24
// })
//
// newTest.save().then(() => {
//         console.log('add una')
//     }
// ).catch(err => {
//     console.log(err);
// })

// Admin.find().exec().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err.message)
// })
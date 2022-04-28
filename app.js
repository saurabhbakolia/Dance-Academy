const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/danceAcademy');
}

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    more: String
});
const Contact = mongoose.model('Contact', contactSchema);






// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // for searching static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view-engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const jone = {};
    res.status(200).render('home.pug', jone);
})

app.get('/contact', (req, res) => {

    const jone = {};
    res.status(200).render('contact.pug', jone);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved  to the database")
    });
    // res.status(200).render('contact.pug');
})
// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successufully on port ${port}`);
})
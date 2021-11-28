var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');

const port = process.env.PORT || 3000 ;


//Changes to git
//Hector Alvarez Advanced topics , 2021 FALLB
mongoose.connect("mongodb+srv://cloud16:Cloudgrey16@cluster0.64pln.mongodb.net/Groceries?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(cors());


var Grocery = mongoose.model('Grocery', {
    name: String,
    quantity: Number , 
    price: Number ,

});


app.get('/api/groceries',  async (req, res)  =>{

    try {
        await Grocery.find( {} ).then( groceries => res.send(groceries))
        
    } catch (e) {
        res.send(e)
    }
});


app.post('/api/groceries', async (req, res) => {

    console.log("Creating grocery item...");

    const grocery  = new Grocery(req.body)
    try  {
        await grocery.save()
        res.send(grocery)
    } catch (e) {
        res.send(express)
    }
});

app.patch('/api/groceries/:id', function (req, res) {
    
    console.log("starting update")

    try {
        Grocery.findByIdAndUpdate( req.params.id , req.body)
    } catch (e) {
        res.send(e)
    }
});


app.delete('/api/groceries/:id', async function (req, res) {
    
    console.log("removing item..")
    try {
        await Grocery.findByIdAndDelete(req.params.id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", docs);
    }
});
    } catch (e) {
        res.send("Item could not be deleted")
    }

});


app.listen(port);
console.log("Server running on : " , port);
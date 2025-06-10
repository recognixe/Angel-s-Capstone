
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});



const AnimalInfo = new mongoose.Schema({
    animalType: {type: String, required: true},
    appearance: {type: String },
    vaccinated: {type: Boolean, required: true},
    location:   {type: String },
    Breed:      {type: String},
    name:  {type: String},
    age:   {type: Number},
    Photo: {type: String}
});
const Animal= mongoose.model("Animal",AnimalInfo,)

//  	const users = await User.find({name: "Jayden"});

app.get("/", async (req, res) => {
    const pets = await Animal.find({});
    res.render("home.ejs", { pets });
});



app.patch("/Pets/:_id", async (req, res) => {
const response = await Animal.findOneAndUpdate(
 { _id: req.params._id },
 { location: req.body.location,  animalType: req.body.animalType, appearance: req.body.appearance, vaccinated: req.body.vaccinated ,Breed: req.body.Breed ,age: req.body.age, Photo: req.body.Photo,name: req.body.name })
res.json(response);
});

app.delete("/deletepets/:_id", async (req, res) => {
const response = await Animal.findOneAndDelete({ _id: req.params._id })
res.json(response);
});

app.post("/add/pets", async function(req, res){
  const newAnimla = await new Animal({
    animalType: req.body.animalType,
    appearance: req.body.appearance,
    vaccinated: req.body.vaccinated,
    location: req.body.location,
    Breed: req.body.Breed,
    name: req.body.name,
    Photo: req.body.Photo
  }).save()

  res.json(newAnimla)
})




async function startServer() {
    await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.uwk2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    app.listen(3000, () => {
    console.log(`Server running.`);
    });
}
startServer();

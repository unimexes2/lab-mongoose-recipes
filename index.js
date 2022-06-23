const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const arrayOfRecipes = require("./data.json");
const { Schema } = mongoose;

const reciepeSchema = new Schema({
  title:  String, 
  level: String,
  ingredients: [String],
  cuisine:   String,
  dishType: { type: String, enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'] },
  image: { type: String, default:  "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0},
  creator: String,
  created:  {type: Date, default: Date.now}
});

const RecipeModel = mongoose.model("recipe", reciepeSchema);










// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((response) => {
   
    return RecipeModel.create(arrayOfRecipes[0]);
    // Run your code here, after you have insured that the connection was made
  })

  .then((response) => {
    console.log(response.title,"added sucsesfully")
    return Recipe.deleteMany()
  })
 
  .then((response) => {
     return RecipeModel.insertMany(arrayOfRecipes);
   })
  
  .then((response) => {
    response.forEach((val)=>{
      console.log(val.title,"added sucsesfully")
      
     
    })
    const query = { title: "Rigatoni alla Genovese"};
    return RecipeModel.findOneAndUpdate(query, { duration: 100 },);
  })    
    .then((response) => {
      console.log("IS updated OBJ--",response.title)
      const query = { title: "Carrot Cake"};
      return RecipeModel.deleteOne(query)
    }) 
    .then((response) => {
      console.log("IS deleted OBJ--",response)
      mongoose.connection.close()
      .then(()=>{console.log("Connection closed, CHAO!")})
    }) 
   
    // Run your code here, after you have insured that the connection was made
 

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

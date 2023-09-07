var express = require('express');

const { config } = require('dotenv');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const cors = require('cors');
const multer = require('multer') // image handling module
const path = require('path')
busboy = require("then-busboy"),

    //use express static folder
    app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

config();
// cors error fix
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(options));



//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage, limits: { fieldSize: 24 * 3456 * 3456 }
});


// env file variables
const PORT = process.env.PORT;
const HOST = process.env.HOST
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

// connect to database
dbConn.connect();


// Retrieve all recipes 
app.get('/recipes', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    dbConn.query('SELECT * FROM recipes', function (error, results, fields) {
        if (error) throw error;

        return res.send({ error: false, data: results, message: 'Recipes.' });

    });
});

// Add a new recipe 
app.post('/recipe', upload.single('image'), function (req, res) {
    res.header("Access-Control-Allow-Origin", "*"); // client and server running on different port

    let RecipeName = req.body.RecipeName;
    let Steps_Tips = req.body.Steps_Tips;
    let Likes = '86';
    let Duration = req.body.Duration;
    let RecipeType = req.body.RecipeType;
    let Course = req.body.Course;
    let Cousine = req.body.Cousine;
    let Tips = req.body.Tips;
    let ImagePath = req.file;

    //let file = req.body.req.file;
    if (!RecipeName) {
        return res.status(400).send({ error: true, message: 'Please provide recipe' });
    }

    dbConn.query("INSERT INTO recipes SET ? ", {
        RecipeName: RecipeName, Steps_Tips: Steps_Tips,
        Likes: Likes, Duration: Duration, RecipeType: RecipeType, Course: Course, Cousine: Cousine, Tips: Tips,
        ImagePath: ImagePath

    }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Recipe has been created successfully.' });
    });
});

app.put("/uploadimageById", upload.single('file'), (req, res) => {
    let Recipe_Id = req.query.Recipe_Id
    if (!req.file) {
        console.log("No file upload");
    } else {
        var imgsrc = 'http://localhost:8000/images/' + req.file.filename
        dbConn.query("UPDATE recipes SET ImagePath = ? WHERE RecipeId = ?", [imgsrc, Recipe_Id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'image has been updated successfully.' });
        });
    }
});


//  Update recipe with id
app.put('/updateRecipe', function (req, res) {

    let recipe_id = req.body.RecipeId;
    let RecipeName = req.body.RecipeName;

    if (!recipe_id || !RecipeName) {
        return res.status(400).send({ error: RecipeName, message: 'Please provide recipe details' });
    }

    dbConn.query("UPDATE recipes SET RecipeName = ? WHERE RecipeId = ?", [RecipeName, recipe_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'recipe has been updated successfully.' });
    });
});
//  Delete recipe name
app.delete('/deleteRecipe', function (req, res) {

    let recipe_id = req.body.RecipeId;

    if (!recipe_id) {
        return res.status(400).send({ error: true, message: 'Please provide RecipeId' });
    }
    dbConn.query('DELETE FROM recipes WHERE RecipeId = ?', [recipe_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Recipes has been deleted successfully.' });
    });
});
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM withfoodusers', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'All Users.' });
    });
});
// Add a new user
app.post('/user', function (req, res) {
    let UserName = req.body.UserName;
    let email = req.body.UserEmail;
    let password = req.body.Password;
    let userRole = req.body.UserRole;

    if (!UserName && !email && !password && !userRole) {
        return res.status(400).send({ error: true, message: 'Please provide all details of user' });
    }

    dbConn.query("INSERT INTO withfoodusers SET ? ", { UserName: UserName, UserEmail: email, Password: password, UserRole: userRole }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been created successfully.' });
    });
});


//  Delete user name
app.delete('/deleteUser', function (req, res) {

    let user_id = req.body.UserId;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide UserId' });
    }
    dbConn.query('DELETE FROM withfoodusers WHERE UserId = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been deleted successfully.' });
    });
});

// Add a new ingredient
app.post('/incredients', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*"); // client and server running on different port
    const reqBody = req.body;


    // if (!IncredientsName) {
    //     return res.status(400).send({ error: true, message: 'Please provide ingredient' });
    // }
    reqBody.map((body, index) => (dbConn.query("INSERT INTO ingredients SET ? ", {

        IncredientsName: body.IncredientsName, Measurments: body.Measurments, IsOptional: body.IsOptional,
        IsSwappable: body.IsSwappable, Quantity: body.Quantity, RecipeId: body.RecipeId
    })), function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Ingredients has been created successfully.' });
    });
});

// Add sub ingredient
app.post('/Subincredients', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*"); // client and server running on different port
    const reqBody = req.body;
    reqBody.map((body, index) => (dbConn.query("INSERT INTO swappable_ingredients SET ? ", {

        IncredientsId: body.IncredientsId, ParentIncredientsName: body.ParentIncredientsName, Measurments: body.Measurments, Quantity: body.Quantity, RecipeId: body.RecipeId
        , SwappableIngredientName: body.SwappableIngredientName
    })), function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Ingredients has been created successfully.' });
    });
});

// Retrieve ingredient by recipe_id
app.get('/ingredientsByRecipeId', function (req, res) {
    let Recipe_Id = req.query.Recipe_Id
    dbConn.query('SELECT * FROM ingredients WHERE RecipeId = ?', [Recipe_Id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Ingredient for recipe' });
    });
});

// Retrieve swappable ingredient by recipe_id
app.get('/swappablesByRecipeId', function (req, res) {
    let Recipe_Id = req.query.Recipe_Id

    dbConn.query('SELECT * FROM swappable_ingredients WHERE RecipeId = ?', [Recipe_Id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Swappables for recipe' });
    });
});

// Retrieve recipes by recipe_id
app.get('/recipeById', function (req, res) {
    let Recipe_Id = req.query.Recipe_Id

    dbConn.query('SELECT * FROM recipes WHERE RecipeId = ?', [Recipe_Id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'recipes' });
    });
});

// Retrieve recipes by recipe_name
app.get('/recipeByName', function (req, res) {
    let Recipe_Name = req.query.Recipe_Name

    dbConn.query('SELECT * FROM recipes WHERE RecipeName = ?', [Recipe_Name], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'recipes' });
    });
});

// set port
app.listen(PORT, function () {
    console.log('Node app is running on port', PORT);
});


module.exports = app;
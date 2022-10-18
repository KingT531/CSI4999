const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const saltRounds = 10;

// details for connecting to database on heroku server
// mysql://b4baa5583f6588:f55feaaf@us-cdbr-east-06.cleardb.net/heroku_6790ad1ab9e7025?reconnect=true
// const db = mysql.createPool({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'b4baa5583f6588',
//     password: 'f55feaaf',
//     database: 'heroku_6790ad1ab9e7025'
// })

// database connection information - must change to connect to database locally
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sports',
})

// used for online hosting otherwise may get error connecting
// app.use(cors({
//     //origin: ["http://localhost:3000"],
//     //origin: ["https://starlit-scone-d78c67.netlify.app"],
//     origin: ["http://127.0.0.1:5500/index.html"],
//     methods: ["GET", "POST"],
//     credentials: true
// }));

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Login 
app.post('/api/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const sqlGetUser = "SELECT * FROM users WHERE username = ?";

    db.query(sqlGetUser, [username], (err, result)=>{
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (error, response) =>{
                if(response){
                    console.log("Logged In");
                     res.send({loggedIn: true})
                }
                else{
                    console.log("failed to login")
                    res.send({loggedIn: false})
                }
            })
        }
        else{
            console.log("failed to login")
            res.send({loggedIn: false})
        }
    });
});

// register new account
app.post('/api/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const first = req.body.first;
    const last = req.body.last
    const sqlGetUser = "SELECT * FROM users WHERE username = ?";

    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(sqlGetUser, [username], (err, result)=>{
            // if (err) {
            //     console.log("error")
            //     res.send({err:err})
            // }
            if(result.length==0){
                const sqlNewUser = "INSERT INTO users (username, password, email, first, last) VALUES (?, ?, ?, ?, ?)";
                db.query(sqlNewUser, [username, hash, email, first, last], (err, result)=>{
                    console.log("account created")
                    res.send({newaccount: true})
                });
            }
            else{
                console.log("user already exists")
                res.send({newaccount: false})
            }
        });
    })
});

app.post('/api/favoriteplayer', (req, res) => {

    const username = req.body.username;
    const favorite = req.body.favorite
    const sqlGetFavorites = "SELECT * FROM favorites WHERE username = ?";

    db.query(sqlGetFavorites, [username], (err, result)=>{
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        if(result.length > 0){

            pfav1 = result[0].playerfav1
            pfav2 = result[0].playerfav2
            pfav3 = result[0].playerfav3
            pfav4 = result[0].playerfav4
            pfav5 = result[0].playerfav5
  
            if(pfav1 == null){
                const sqlInsertFavorite = "UPDATE favorites SET playerfav1 = ? WHERE username = ?";
                db.query(sqlInsertFavorite, [favorite, username], (err, result)=>{
                    if (err) {
                        console.log(err)
                        res.send({err:err})
                    }
                    else{
                        res.send({favoriteRes: true})
                    }  
                });
            }
            else if(pfav2 == null){
                const sqlInsertFavorite = "UPDATE favorites SET playerfav2 = ? WHERE username = ?";
                db.query(sqlInsertFavorite, [favorite, username], (err, result)=>{
                    if (err) {
                        console.log(err)
                        res.send({err:err})
                    }
                    else{
                        res.send({favoriteRes: true})
                    }  
                });
            }

            else if(pfav3 == null){
                const sqlInsertFavorite = "UPDATE favorites SET playerfav3 = ? WHERE username = ?";
                db.query(sqlInsertFavorite, [favorite, username], (err, result)=>{
                    if (err) {
                        console.log(err)
                        res.send({err:err})
                    }
                    else{
                        res.send({favoriteRes: true})
                    }  
                });
            }
            else if(pfav4 == null){
                const sqlInsertFavorite = "UPDATE favorites SET playerfav4 = ? WHERE username = ?";
                db.query(sqlInsertFavorite, [favorite, username], (err, result)=>{
                    if (err) {
                        console.log(err)
                        res.send({err:err})
                    }
                    else{
                        res.send({favoriteRes: true})
                    }  
                });
            }
            else if(pfav5 == null){
                const sqlInsertFavorite = "UPDATE favorites SET playerfav5 = ? WHERE username = ?";
                db.query(sqlInsertFavorite, [favorite, username], (err, result)=>{
                    if (err) {
                        console.log(err)
                        res.send({err:err})
                    }
                    else{
                        res.send({favoriteRes: true})
                    }  
                });
            }
            else{
                res.send({favoriteRes: false})
            }
        }
        else{
            res.send({favoriteRes: false})
        }
    });
});

app.post('/api/favoriteteam', (req, res) => {

    const username = req.body.username;
    const sqlGetUser = "SELECT * FROM users WHERE username = ?";
  
    db.query(sqlGetUser, [username], (err, result)=>{
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        if(result.length==0){
            const sqlNewUser = "INSERT INTO users (username, password, email, first, last) VALUES (?, ?, ?, ?, ?)";
        }
        else{
            res.send({favorite: false})
        }
    });
});

// listening to port for online hosting
// app.listen(process.env.PORT || PORT, () => {
//     console.log('running on port ${PORT}');
// })

// listening to local port 3001
app.listen(3001, () => {
    console.log("running on port 3001");
})

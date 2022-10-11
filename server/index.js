const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

// details for connecting to database on heroku server
// mysql://bfee47454279c4:3ecfcc52@us-cdbr-east-06.cleardb.net/heroku_89e000a1510f6d5?reconnect=true
// const db = mysql.createPool({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'bfee47454279c4',
//     password: '3ecfcc52',
//     database: 'heroku_89e000a1510f6d5',
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
//     //origin: ["https://illustrious-dragon-21681f.netlify.app"],
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
    const sqlGetUser = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sqlGetUser, [username, password], (err, result)=>{
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        if(result.length > 0){
            console.log("Logged In");
            res.send({loggedIn: true})
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
    db.query(sqlGetUser, [username], (err, result)=>{
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        console.log(result)
        console.log(result.length)
        if(result.length==0){
            const sqlNewUser = "INSERT INTO users (username, password, email, first, last) VALUES (?, ?, ?, ?, ?)";
            db.query(sqlNewUser, [username, password, email, first, last], (err, result)=>{
                console.log("account created")
                res.send({newaccount: true})
            });
        }
        else{
            console.log("user already exists")
            res.send({newaccount: false})
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

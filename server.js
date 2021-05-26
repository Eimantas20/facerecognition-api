import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
// import handleImage from './controllers/image.js';
// import handleApiCall from './controllers/image.js';
// const image = require('./controllers/image.js');
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'testdata',
        database: 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

//Everything with app.get.post.out are our routes
app.get('/', (req, res) => { res.send(database.users); });

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

//:id is for to whatever we enter as if we should still get a responde.
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});



// --> we want to have a root route which responds with: this is working

// --> we want to have a sign in route --> POST request because we are posting some data, 
// some json, user information and it's going to respond with either sucess or fail. POST  = success/fail
// With sign we do POST because we are sending a password, we don't want to send it as query string,we send it inside a body, 
// ideally we send it over https as it's hidden from man in the middle and it's secure

// --> we want to have a register which is --> POST because we want to add the data to database or 
// variable in our server with our new user information. So will return/respond with user data POST = 

//Inside a home screen to have access to profile with userID, most likely be a GET request to get a user information GET = user

//image --> PUT -- so we want to keep the count of rank, how many times user used the facedetection app. as we updating a score we update so we use PUT and it
// will return updated user object or the count.
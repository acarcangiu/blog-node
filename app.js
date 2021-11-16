const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//connect to MongoDB
const dbURI = 'mongodb+srv://netNinja:Qweruiop.1234@cluster0.rpxaz.mongodb.net/note-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI ,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> console.log('connected to db'))
    .catch((err)=> {
        console.log(err)
    })
    

//express app
const app = express();

//register new engine
app.set('view engine', 'ejs');

//blog routes
app.use(blogRoutes)



//listen for requests
app.listen(3000);

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(morgan('dev'))





//404 page
app.use((req,res)=> {
    res.status(404).render('404')
})





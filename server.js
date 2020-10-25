const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride  = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    //https://stackoverflow.com/questions/59455725/install-mongodb-on-manjaro#:~:text=Simply%20clone%20the%20repo%20in,command%20to%20make%20the%20package.


app.set('view engine', 'ejs')


// this next line allows us to access any element of the front end in order to get data from it (like a form or anything else)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method')) // gives us access to DELETE/PUT/UPDATE and more instead of just having GET and POST


// this is the default landing page of the site located at '/'
// when you go to '/' then this is rendered
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles }) //when going to '/' we'll render the html of articles/index.ejs
})

// app.get('/new', (req, res) => {
//     res.render('articles/new') //when going to '/' we'll render the html of articles/index.ejs
// })


// if you go to /articles then render what's in articleRouter
// if we add more routes in articles then they're also reachable
// this is basically the way to reach the rest of the site
// Currently, articleRouter equals /routes/articles. 
// in articlesJS this is the default route '/', in here it equals to /articles since that's what we're saying in this next piece of code.
app.use('/articles', articleRouter)

app.listen(5000)
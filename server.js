const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

// if you go to /articles then render what's in articleRouter
// if we add more routes in articles then they're also reachable
// this is basically the way to reach the rest of the site
app.use('/articles', articleRouter)

// this is the default landing page of the site located at '/'
app.get('/', (req, res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const articles = [{
        title: 'This is a title',
        createdAt: today.toDateString(),
        description: 'test description'
    }]
    res.render('index', { articles: articles })
})

app.listen(5000)
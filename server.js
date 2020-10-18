const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

// if you go to /articles then render what's in articleRouter
// if we add more routes in articles then they're also reachable
app.use('/articles', articleRouter)




app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5000)
const express = require('express')
const Article = require('../models/article')
const router = express.Router()

// in our serverJS this equates to localhost:5000/articles though !
// router.get('/', (req,res) => {
//     res.send('In articles')
// })

// and this to localhost:5000/articles/test
router.get('/new', (req,res) => {
    res.render('articles/new', { article: new Article() }) 
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) {
        res.redirect('/')
    }
    res.render('articles/show', { article: article })
    // https://youtu.be/1NrHkjlWVhM?t=2097
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        console.log(e);
        res.render('articles/new', { article: article})
    }
    
})

router.delete(':/id')

module.exports = router
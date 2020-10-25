const express = require('express')
const Article = require('../models/article')
const router = express.Router()

// in our serverJS this equates to localhost:5000/articles though !
// router.get('/', (req,res) => {
//     res.send('In articles')
// })

// render the NEW.ejs page and create a new article object
router.get('/new', (req,res) => {
    res.render('articles/new', { article: new Article() }) 
})

// wait until you get the article which needs to be edited and then render the EDIT.ejs page
router.get('/edit/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article }) 
})

// wait until you get the article that needs to be displayed and then render the SHOW.ejs page
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) {
        res.redirect('/')
    }
    res.render('articles/show', { article: article })
})

// This CREATES a blog post
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

// the actual EDIT functionality
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

// this is the DELETE functionality
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// since both EDIT and CREATE functions are roughly the same it's better to keep it DRY
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        
        article.title = req.body.title,
        article.description = req.body.description,
        article.markdown = req.body.markdown
        
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.log(e);
            res.render(`/articles/${path}`, { article: article})
        }
    }
}

module.exports = router
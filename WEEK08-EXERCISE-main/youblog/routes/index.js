const express = require('express')
const router = express.Router()
var article = require('../article-db')


router.get('/', function(req, res, next) {
    var data = { title: 'Express', article: article }
    res.render('index', data)
    let find = req.query.search
    for (let i = 0; i < article.length; i++) {
        if (isSubstr(find, article[i].title)) {
            res.render('index', { article: article[i] })
        }
    }
})

router.get('/blog/:id', function(req, res, next) {
    var data = { title: 'Express', article: article }
    if (article.find(article => article.id === req.params.id)) {
        console.log(article.find(article => article.id === req.params.id))
        res.render('pages', { article: article.find(article => article.id === req.params.id) })
    } else {
        res.send("ไม่พบหน้า")
    }

})

module.exports = router
module.exports = router
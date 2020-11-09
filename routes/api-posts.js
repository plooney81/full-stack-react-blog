const express = require('express');
const router = express.Router();
const models = require('../models');

// Get ALL POSTS
router.get('/', (req, res) => {
    models.Post.findAll({order: [
        ['published', 'ASC'],
    ]})
        .then(posts => {
            res.json(posts)
        })
});

// Get 1 Post by ID
router.get('/:id', (req, res) => {
    const {id} = req.params;
    models.Post.findOne({
        where: {
            id: id
        }
    })
        .then(post => {
            post ? res.json(post) : res.status(404).json({error: 'Post not found'})
        })
})

// Update Post
router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const updateObject = {}
    if(!req.body.author && !req.body.title && !req.body.content && !req.body.published){
        res.status(400).json({
            error: 'Please change atleast one field'
        })
    }
    const {author, title, content, published} = req.body;
    const paramArray = {'author': author, 'title': title, 'content': content, 'published': published};
    Object.keys(paramArray).forEach(key => {paramArray[key] ? updateObject[key] = paramArray[key] : ''})
    models.Post.update(updateObject, {
        where: {
            id: id
        }
    })
        .then(updated => {
            (updated && updated[0] > 0) ? res.status(202).json({Success: 'Post updated'}): res.status(404).json({error: 'Post not found'})
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred'
            })
        })

})


// Create new Post
router.post('/', (req, res) => {
    if(!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published){
        res.status(400).json({
            error: 'Please submit all required fields'
        })
    }
    const {author, title, content, published} = req.body;
    models.Post.create({
        author: author,
        title: title,
        content: content,
        published: published,
    })
        .then((post)=>{
            res.status(201).json(post)
        })
        .catch((e)=>{
            res.status(500).json({
                error: 'Database error occurred'
            })
        })
})

// Delete Post
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    models.Post.destroy({
        where: {
            id: id
        }
    })
        .then(deletedPost => {
            deletedPost[0] === 1 ? res.status(202).json({Success: 'Post deleted'}) : res.status(404).json({error: 'Post not found'})
        })
})

module.exports = router;
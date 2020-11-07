const express = require('express');
const router = express.Router();
const models = require('../models');

// Get all comments for a specific post
router.get('/:id', (req, res) => {
    const {id} = req.params;
    models.Post.findOne({
        where: {
            id: id
        }
    })
        .then(post => {
            if(!post){
                res.status(404).json({error: 'Post not found'});
            }
            post.getComments({
                order: [
                    ['createdAt', 'ASC'],
                ]})
                .then(comments => {
                    res.json(comments);
                })
                .catch(e => {
                    res.status(500).json({error: 'A database error occurred'});
                })
        })
})

// Update a specific comment
router.patch('/comments_id/:id', (req, res) => {
    const {id} = req.params;
    const updateObject = {}
    if(!req.body.author && !req.body.content && !req.body.approved){
        res.status(400).json({
            error: 'Please change atleast one field'
        })
    }
    const {author, content, approved} = req.body;
    const paramArray = {'author': author, 'content': content, 'approved': approved};
    Object.keys(paramArray).forEach(key => {paramArray[key] ? updateObject[key] = paramArray[key] : ''})
    models.Comment.update(updateObject, {
        where: {
            id: id
        }
    })
        .then(updated => {
            (updated && updated[0] > 0) ? res.status(202).json({Success: 'Comment updated'}): res.status(404).json({error: 'Comment not found'})
        })
        .catch(e => {
            res.status(500).json({
                error: 'Database error occurred'
            })
        })

})

// Create a new comment for a post
router.post('/:id', (req, res) => {
    const {id} = req.params;
    models.Post.findOne({
        where: {
            id: id
        }
    })
    .then(post => {
        if(!post){
            res.status(404).json({error: 'Post not found'});
        }
        if(!req.body || !req.body.author || !req.body.content || !req.body.approved){
            res.status(400).json({
                error: 'Please submit all required fields'
            })
        }
        const {author, content, approved} = req.body;
        post.createComment({
            author: author,
            content: content,
            published: approved,
        })
            .then((comment)=>{
                res.status(201).json({
                    success: 'New comment created'
                })
            })
            .catch((e)=>{
                res.status(500).json({
                    error: 'Database error occurred'
                })
            })
    })
})

// Delete Comments
router.delete('/comments_id/:id', (req, res) => {
    const {id} = req.params;
    models.Comment.destroy({
        where: {
            id: id
        }
    })
        .then(deletedComment => {
            // res.status(202).json(deletedComment)
            deletedComment === 1 ? res.status(202).json({success: "comment deleted"}) : res.status(404).json({error: 'Comment not found'})
        })
})

module.exports = router;
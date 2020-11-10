import React from 'react';

import {useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {Container, Spinner} from 'react-bootstrap';

import NavigationBar from '../NavigationBar/NavigationBar';
import ArticleCard from '../ArticleCard/ArticleCard';
import CommentForm from '../CommentForm/CommentForm';
import CommentCard from '../CommentCard/CommentCard';

import './Article.css';


export default function Article() {
    const [posts, setPosts] = useState(null);
    const [comments, setComments] = useState(null);
    const {articleId} = useParams();

    useEffect(() => {
        fetch(`/api/v1/comments/${articleId}`)
            .then(res => res.json())
            .then(data => {
                setComments([]);
                setComments(data)
                console.log(comments)
            })
            .catch(error => console.log(error))
        fetch(`/api/v1/posts/${articleId}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                console.log(posts)
            })
            .catch(error => console.log(error))
        //! getting an error for line 37 that says "React Hook useEffect has missing dependencies: 'articleId', 'comments', and 'posts'"
        //! I think what is happening is my return function is being called before I am actually setting the state with my data returning from the fetch calls,
        //! Therefore I am passing empty variables (one an object and one an array) to my components as props.
        // TODO: 1. Fix this issue described above.
        // TODO: 2. Create a new component called CommentCard.js and CommentCard.css, below in the render function, map over the comments array, returning the new
        // TODO: CONT. CommentCard component with the commentData to it as a prop.
        //! ALSO: NEED TO WAY TO UPDATE THE COMMENTS WHEN A USER ADDS A COMMENT
        // TODO: Pass a prop function down to the comment that it can call whenever a new comment is called.
    }, [])

    if(!posts){
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            <Container>
                {posts !== null && comments !== null
                ? ( 
                    <>
                    <ArticleCard postData={posts} del={true} commentsLength={comments}></ArticleCard>
                    <CommentForm postData={posts} comments={comments} setComments={setComments}></CommentForm>
                        {comments.map(comment => <CommentCard key={comment.id} commentData={comment} comments={comments} setComments={setComments}></CommentCard>)}
                    </>
                )
                :''}
            </Container>
        </>
    )
}

import React from 'react';

import {useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {Container} from 'react-bootstrap';

import NavigationBar from '../NavigationBar/NavigationBar';
import ArticleCard from '../ArticleCard/ArticleCard';
import CommentForm from '../CommentForm/CommentForm';
import CommentCard from '../CommentCard/CommentCard';

import './Article.css';


export default function Article() {
    const [posts, setPosts] = useState({});
    const [comments, setComments] = useState([]);
    const {articleId} = useParams();

    useEffect(() => {
        fetch(`/api/v1/comments/${articleId}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
            .catch(error => console.log(error))
        fetch(`/api/v1/posts/${articleId}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
            .catch(error => console.log(error))
        setComments([])
        setPosts({})
        console.log(comments)
        console.log(posts)
        //! getting an error for line 37 that says "React Hook useEffect has missing dependencies: 'articleId', 'comments', and 'posts'"
        //! I think what is happening is my return function is being called before I am actually setting the state with my data returning from the fetch calls,
        //! Therefore I am passing empty variables (one an object and one an array) to my components as props.
        // TODO: 1. Fix this issue described above.
        // TODO: 2. Create a new component called CommentCard.js and CommentCard.css, below in the render function, map over the comments array, returning the new
        // TODO: CONT. CommentCard component with the commentData to it as a prop.
    }, [])

    return (
        <>
            <NavigationBar></NavigationBar>
            <Container>
                <ArticleCard postData={posts} del={true}></ArticleCard>
                <CommentForm postData={posts}></CommentForm>
                {comments.map(comment => <CommentCard key={comment.id} commentData={comment}></CommentCard>)}
            </Container>
        </>
    )
}

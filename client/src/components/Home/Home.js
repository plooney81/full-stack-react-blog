import React from 'react';
import {useState, useEffect} from 'react';

import { Container } from 'react-bootstrap';

import NavigationBar from '../NavigationBar/NavigationBar';
import ArticleCard from '../ArticleCard/ArticleCard';
import ArticleForm from '../ArticleForm/ArticleForm';



export default function Home() {
    //! Initialize state variables
    const [posts, setPosts] = useState([]);

    //! Get all posts when page first loads
    useEffect(() => {
        fetch(`/api/v1/posts`)
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <>
            <NavigationBar></NavigationBar>
            <Container>
                <ArticleForm setPosts={setPosts} posts={posts}></ArticleForm>
                {posts.map(post => {
                    return <ArticleCard key={post.id} postData={post}></ArticleCard>
                })}
            </Container>
        </>
    )
}

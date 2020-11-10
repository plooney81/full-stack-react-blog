import React from 'react';
import {useState, useEffect} from 'react';

import { Container, Button } from 'react-bootstrap';

import NavigationBar from '../NavigationBar/NavigationBar';
import ArticleCard from '../ArticleCard/ArticleCard';
import ArticleForm from '../ArticleForm/ArticleForm';



export default function Home(props) {
    //! Grab the variables/functions we sent as props
    const {changeLogin, login} = props;

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

    const addPost = (post) => {
        const postsCopy = [...posts]
        postsCopy.unshift(post);
        setPosts(postsCopy)
    }

    const delPost = (postIdToDel) => {
        const newArray = posts.filter(post => post.id !== postIdToDel);
        setPosts(newArray);
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            <Container>
            {!login.status && (
                <div className="d-flex justify-content-around mt-3">
                    <Button onClick={()=>{changeLogin(true, 'admin')}}>Admin Login</Button>
                    <Button onClick={()=>{changeLogin(true, 'normal')}}>Normal Login</Button>
                </div>
            )}
            {login.status && (
                <>
                    <div className="d-flex justify-content-center mt-3">
                        <Button onClick={()=>{changeLogin(false, null)}}>Logout</Button>
                    </div>
                    <ArticleForm addPost={addPost}></ArticleForm>
                    {posts.map(post => {
                        return login.account === 'admin' ? <ArticleCard key={post.id} postData={post} del={true} delPost={delPost}></ArticleCard> : <ArticleCard key={post.id} postData={post}></ArticleCard>
                    })}
                </>
            )}
            </Container>
        </>
    )
}

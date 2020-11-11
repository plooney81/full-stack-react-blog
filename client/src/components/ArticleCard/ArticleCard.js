import React from 'react';
import {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';

import {Card, Button} from 'react-bootstrap';

import './ArticleCard.css';

import ReadTimeCalculator from '../../lib/ReadTimeCalculator';

export default function ArticleCard(props) {
    const { id, title, author, content, createdAt, published } = props.postData
    const {del, delPost} = props
    const timeCreated = new Date(createdAt);
    const [comments, setComments] = useState([]);


    useEffect(() => {
        fetch(`/api/v1/comments/${id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
            .catch(error => console.log(error))
    }, [])

    const deletePost = () => {
        fetch(`/api/v1/posts/${id}`, {
            method: "DELETE",
        })
        // ! delPost was passed down as a prop from Home.js
        // * We pass it the id of the post we want to be deleted
            .then(res => delPost(id))
            .catch(error => console.log(error))
    }

    const numberOfComments = () =>{
        if(props.commentsLength){
            return props.commentsLength.length
        }else{
            return comments.length
        }
    }
    return (
        <>
            <Card className="mt-4">
                <Card.Header className="cardTitle d-flex justify-content-between">
                    <div>
                        <i class="fas fa-newspaper mr-3"></i>
                        <Link to={`article/detail/${id}`}>{title}</Link>
                    </div>
                    <div>
                        {del ? <Button className="delete-button" onClick={deletePost}>Delete</Button> : ''}
                    </div>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                    <Card.Text className="p-1">
                        {content}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <span className="mr-4">
                                <i class="far fa-user-circle mr-1"></i>
                                {author}
                            </span>
                            <span className="mr-4">|</span>
                            <span className="timeCreated mr-4">
                                {timeCreated.getMonth()}/
                                {timeCreated.getDate()}/
                                {timeCreated.getFullYear()}
                            </span>
                            <span className="mr-4">|</span>
                            <span className="timeCreated">
                                {ReadTimeCalculator(content)}
                            </span>
                        </div>
                        <span className="ml-5">
                            <i class="far fa-comment mr-2"></i>
                            {numberOfComments() > 0 ? numberOfComments() : ''}
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

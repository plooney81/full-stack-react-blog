import React from 'react';
import {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';

import {Card, Button} from 'react-bootstrap';

import './ArticleCard.css';

export default function ArticleCard(props) {
    const { id, title, author, content, createdAt, published } = props.postData
    const del = props.del
    const timeCreated = new Date(createdAt);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/v1/comments/${id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
            .catch(error => console.log(error))
        console.log(props.postData.id)
    }, [])

    const deletePost = () => {
        fetch(``)
    }
    return (
        <>
        <Link to={`article/detail/${id}`}>
            <Card className="mt-4">
                <Card.Header className="cardTitle d-flex justify-content-between">
                    <div>
                        <i class="fas fa-newspaper mr-3"></i>
                        {title}
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
                            <span className="timeCreated">
                                {timeCreated.getDay()}/
                                {timeCreated.getMonth()}/
                                {timeCreated.getFullYear()}
                            </span>
                        </div>
                        <span className="ml-5">
                            <i class="far fa-comment mr-2"></i>
                            {comments.length > 0 ? comments.length : ''}
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </Link>
        </>
    )
}

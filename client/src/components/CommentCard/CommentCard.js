import React from 'react';

import {Button, Card} from 'react-bootstrap';

import './CommentCard.css';

export default function CommentCard(props) {
    const { id, author, content, createdAt, approved } = props.commentData
    const {delComment, login} = props
    const timeCreated = new Date(createdAt);

    const fetchDeleteComment = () => {
        fetch(`/api/v1/comments/comments_id/${id}`, {
            method: "DELETE",
        })
        // ! delComment was passed down as a prop from Article
        // * We pass it the id of the comment we want to be deleted
            .then(res => delComment(id))
            .catch(error => console.log(error))
    }

    return (
        <Card className="mt-4">
            <Card.Body className="d-flex flex-column comment-body">
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
                            {timeCreated.getMonth()}/
                            {timeCreated.getDate()}/
                            {timeCreated.getFullYear()}
                        </span>
                        {login.account === "admin" && (
                            <div className="d-flex justify-content-around">
                                <Button className="delete-button" onClick={()=>{fetchDeleteComment(id)}}>Delete</Button>
                            </div>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

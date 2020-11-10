import React from 'react';

import {Card} from 'react-bootstrap';

import './CommentCard.css';

export default function CommentCard(props) {
    const { id, author, content, createdAt, approved } = props.commentData
    const timeCreated = new Date(createdAt);

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
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

import React from 'react';
import './CommentForm.css';

import {useState} from "react";

import {Form, Button} from 'react-bootstrap';

export default function CommentForm(props) {
    const {id} = props.postData;

    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');

    const postNewComment = (event) => {
        event.preventDefault();
        fetch(`/api/v1/comments/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                author: userName,
                content: comment
            })
        })
            .then(res => res.status === 201 ? console.log('Comment approved') : console.log('Comment rejected'))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Form className="form mt-3" onSubmit={(event)=>{postNewComment(event)}}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" value={userName} onChange={(event) => {setUserName(event.target.value)}} required />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Your thoughts" value={comment} onChange={(event) => {setComment(event.target.value)}} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

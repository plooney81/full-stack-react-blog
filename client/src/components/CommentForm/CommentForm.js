import React from 'react';
import './CommentForm.css';

import {useState} from "react";

import {Form, Button} from 'react-bootstrap';

export default function CommentForm(props) {
    const {id} = props.postData;
    const {comments, setComments} = props;

    // const updateCommentsArray = () => {
    //     props.updateComments();
    // }

    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');

    const postNewComment = (event) => {
        event.preventDefault();
        setUserName('');
        setComment('');
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
            .then(res => {
                if(res.status === 201){
                    return res.json()
                } 
            })
            .then(data => {
                // Creates a copy of the current list of comments
                const commentsCopy = [...comments];
                // The reponse from the server is an object, so we grab the comment portion of the object
                // And then add that comment to the front of our comment state var that was passed down to
                // this component as a prop.
                commentsCopy.unshift(data.comment);
                // Save the copy of the comments array to the state using the setComments function that was
                // passed down via prop.
                setComments(commentsCopy)
                
            })
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

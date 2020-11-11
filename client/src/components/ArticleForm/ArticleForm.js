import React, {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

import './ArticleForm.css';

export default function ArticleForm(props) {
    const [show, setShow] = useState(false);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState('');
    const {addPost} = props;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postNewArticle = (event) => {
        event.preventDefault();
        setAuthor('');
        setTitle('');
        setContent('');
        setPublished('');
        fetch(`/api/v1/posts`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                author: author,
                title: title,
                content: content,
                published: published
            })
        })
            .then(res => {
                if(res.status === 201){
                    return res.json();
                }})
            .then(data => {
                addPost(data)
                handleClose()
            })
            .catch(error => console.log(error))
    }
    
    return (
        <div className="mt-3 d-flex justify-content-center">
          <Button onClick={handleShow} className="">
            New Post
          </Button>
    
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add your post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="form mt-3" onSubmit={(event)=>{postNewArticle(event)}}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" value={author} onChange={(event) => {setAuthor(event.target.value)}} required />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Here it is" value={title} onChange={(event) => {setTitle(event.target.value)}} required />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Your thoughts" value={content} onChange={(event) => {setContent(event.target.value)}} required/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Published</Form.Label>
                        <Form.Control type="date" value={published} onChange={(event) => {setPublished(event.target.value)}} required />
                    </Form.Group>
                    <div className="d-flex justify-content-around">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
          </Modal>
        </div>
      );
}


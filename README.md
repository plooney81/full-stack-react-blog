# FullStack React - Backend <!-- omit in toc -->

- [About this repository](#about-this-repository)
- [**General**](#general)
- [**Requirements**](#requirements)
- [Lessons Learned](#lessons-learned)
- [**Still Todo**](#still-todo)
  
## About this repository
* Main goals of this repository:
  * To create API and Database routes that will then be used for the front end.
  * Using react, display the posts and comments for the site.

## **General**
The front end of our Full Stack React Blog was created using the following technologies/frameworks/libraries:

<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>

The backend was created using the following technologies/frameworks/libraries:

<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
<img src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>

* Sequelize

## **Requirements**
The Requirements for this exercise were as follows: 
* Using our API routes on the backend, to create a blogging application that allows users to comment on posts as well as create new articles.

## Lessons Learned
* REST API basics
* Implementation of Sequelize to handle SQL queries
* Refamiliarized with CRUD API operations and the respective Sequelize methods to handle those operations in the Database.
* How to use the CORS middleware package to enable different cors options. 
```JavaScript
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3001'
}));
```

## **Still Todo**
1. Continue rendering the homepage.
2. Set up the routes for inspecting a particular article/post ( will have a comments section for users to read all comments/add a new comment)
3. Set up the new post page so users can add a new article/post
4. General beautification
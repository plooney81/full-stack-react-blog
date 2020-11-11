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
* How to pass state variables/change functions to child components as props.
  * The Comments/setComments are pieces of state
```JSX
{comments.map(comment => <CommentCard key={comment.id} commentData={comment} comments={comments} setComments={setComments}></CommentCard>)}
```
  * Then inside the CommentCard component, the following is used to access these variables/function 
```JavaScript
const {comments, setComments} = props;
```
* Created an estimated reading time function that is then called for the article details.
```JavaScript
//! A function that returns the time it will take for an average person to read the content
//? For non-technical material, the average reading time (in words per minute) is 200 to 250.
const ReadTimeCalculator = (string) => {
    //? first we split the string on spaces, new line characters, tabs, periods, and commas
    //? Then we filter out any empty strings.
    const words = string.split(/[ \n\t.,]/g).filter(word => word !== "").length;
    const divideToString = (words/225).toString().split('.');
    const [min, seconds] = [parseInt(divideToString[0], 10), Math.ceil(("0." + divideToString[1]) * 60)];
    
    if (min > 1){
        if (seconds > 1){
            return `${min} minutes and ${seconds} seconds`
        }else {
            return `${min} minutes and ${seconds} second`
        }
    }else{
        if(seconds > 1){
            return `${min} minute and ${seconds} seconds`
        }else {
            return `${min} minute and ${seconds} second`
        }
    }
}

export default ReadTimeCalculator;
```

## **Still Todo**
1. Approve comments if admin
2. edit posts if admin
3. edit comments if admin
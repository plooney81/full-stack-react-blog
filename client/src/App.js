import './App.css';
import {useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, NavLink, Redirect, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Article from './components/Article/Article';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/publish" component={Publish}></Route> */}
        <Route path="/article/detail/:articleId" component={Article}></Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

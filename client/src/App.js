import './App.css';
import {useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, NavLink, Redirect, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Article from './components/Article/Article';

function App() {
  //!     Login will be an object, we will have two keys
  //TODO  1.Status - true or false --> true if logged in, false if not
  //TODO  2.Account - normal or admin --> if an admin, they will have special access
  const [login, setLogin] = useState({
    "status": false,
    "account": null
  });

  const changeLogin = (bool, type) => {
    setLogin({
      "status": bool,
      "account": type
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Home changeLogin={changeLogin} login={login}></Home>
        </Route>
        {/* <Route exact path="/publish" component={Publish}></Route> */}
        {login.status && (
          <Route path="/article/detail/:articleId">
            <Article login={login}></Article>
          </Route>
        )}
        <Route>
          <Redirect to="/" />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

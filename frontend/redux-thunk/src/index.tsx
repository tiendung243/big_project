import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './components/auth/register';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Single from './components/posts/postDetail';
import Search from './components/posts/search';
import Edit from './components/posts/postEdit';
import Create from './components/posts/postCreate';

const routing = (
  <Router>
    <React.StrictMode>
      <Header />
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/search" component={Search} />
        <Route exact path="/post/create" component={Create} />
        <Route exact path="/post/:id" component={Single}/>
        <Route exact path="/post/edit/:id" component={Edit} />
      </Switch>
      <Footer />
    </React.StrictMode>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
reportWebVitals();

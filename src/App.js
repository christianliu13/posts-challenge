import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import Posts from './routes/Posts';
import MissingPage from './routes/MissingPage'

const App = () => {
    return(
        <BrowserRouter >
            <Switch>
                <Route path='/posts-challenge/' exact component={Home} />
                <Route path='/posts-challenge/posts' component={Posts} />
                <Route path='/posts-challenge/404' component={MissingPage} />
                <Redirect from='*' to='/404' />
            </Switch>
        </BrowserRouter>
    )
};

export default App;
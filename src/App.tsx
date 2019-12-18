import 'whatwg-fetch';
import React, { useState, useEffect } from 'react';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle,
         DrawerContent, DrawerSubtitle, DrawerAppContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'
import { BrowserRouter as Router,
         Switch, Route, Link } from 'react-router-dom';

const App: React.FC = () => {
    const [response, setResponse] = useState({});
    useEffect(() => {
        fetch("/posts")
            .then(posts => {
                posts.json().then(json => setResponse(json))
            });
    }, []);

    return (
        <Router>
          <div className="App">
              <SimpleTopAppBar title="Reactive Exercises" />
              <TopAppBarFixedAdjust />
              <div>
                <Drawer dismissible open={true}>
                    <DrawerHeader>
                        <DrawerTitle>Exercises</DrawerTitle>
                        <DrawerSubtitle>Learn Some ReactiveX</DrawerSubtitle>
                    </DrawerHeader>
                    <DrawerContent>
                        <List>
                            <Link to="/fetch"><ListItem>Fetch Data</ListItem></Link>
                            <ListItem>Pluck the Names</ListItem>
                        </List>
                    </DrawerContent>
                </Drawer>
                <Switch>
                    <Route path="/fetch">
                        <DrawerAppContent>
                          <p>Fetch it money man</p>
                        </DrawerAppContent>
                    </Route>
                    <Route path="/">
                        <DrawerAppContent>
                            <div style={{padding: '48px'}}>
                                <h1>I did it</h1>
                                <p>{JSON.stringify(response)}</p>
                            </div>
                        </DrawerAppContent>
                    </Route>
                </Switch>
              </div>
          </div>
        </Router>
    );
}

export default App;

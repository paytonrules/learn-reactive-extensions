import React from 'react';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle,
         DrawerContent, DrawerSubtitle } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'
import { BrowserRouter as Router,
         Switch, Route, Link } from 'react-router-dom';
import { Subscribe, TakeTwo, Directions, Fetch } from './exercises/components';

const App: React.FC = () => {
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
                            <Link to="/">
                                <ListItem>Directions</ListItem>
                            </Link>
                            <Link to="/subscribe">
                                <ListItem>Subscribe</ListItem>
                            </Link>
                            <Link to="/take">
                                <ListItem>Take 2</ListItem>
                            </Link>
                            <Link to="/fetch">
                                <ListItem>Fetch</ListItem>
                            </Link>
                        </List>
                    </DrawerContent>
                </Drawer>
                <Switch>
                    <Route path="/subscribe">
                        <Subscribe />
                    </Route>
                    <Route path="/take">
                        <TakeTwo />
                    </Route>
                    <Route path="/fetch">
                        <Fetch />
                    </Route>
                    <Route path="/">
                        <Directions />
                    </Route>
                </Switch>
              </div>
          </div>
        </Router>
    );
}

export default App;

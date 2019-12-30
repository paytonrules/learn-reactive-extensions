import React from 'react';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle,
         DrawerContent, DrawerSubtitle } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'
import { BrowserRouter as Router,
         Switch, Route, Link } from 'react-router-dom';
import * as ExerciseComponents from './exercises/components';

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
                            <Link to="/mapStatus">
                                <ListItem>Map Status</ListItem>
                            </Link>
                            <Link to="/tapToConsoleLog">
                                <ListItem>Tap To Console Log</ListItem>
                            </Link>
                            <Link to="/createYourOwnObservable">
                                <ListItem>Create Your Own Observable</ListItem>
                            </Link>
                            <Link to="/getTheJSON">
                                <ListItem>Get the JSON</ListItem>
                            </Link>
                            <Link to="/takeFiveRows">
                                <ListItem>Take Five JSON rows</ListItem>
                            </Link>
                            <Link to="/countValidUsers">
                                <ListItem>Count Valid Users</ListItem>
                            </Link>
                        </List>
                    </DrawerContent>
                </Drawer>
                <Switch>
                    <Route path="/subscribe">
                        <ExerciseComponents.Subscribe />
                    </Route>
                    <Route path="/take">
                        <ExerciseComponents.TakeTwo />
                    </Route>
                    <Route path="/fetch">
                        <ExerciseComponents.Fetch />
                    </Route>
                    <Route path="/mapStatus">
                        <ExerciseComponents.MapStatusCode />
                    </Route>
                    <Route path="/tapToConsoleLog">
                        <ExerciseComponents.TapToConsoleLog />
                    </Route>
                    <Route path="/getTheJSON">
                        <ExerciseComponents.GetTheJSON />
                    </Route>
                    <Route path="/createYourOwnObservable">
                        <ExerciseComponents.CreateYourOwnObservable />
                    </Route>
                    <Route path="/takeFiveRows">
                        <ExerciseComponents.TakeFiveRowsFromTheTweets />
                    </Route>
                    <Route path="/countValidUsers">
                        <ExerciseComponents.CountValidUsers />
                    </Route>
                    <Route path="/">
                        <ExerciseComponents.Directions />
                    </Route>
                </Switch>
              </div>
          </div>
        </Router>
    );
}

export default App;

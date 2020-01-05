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
                            <Link to="/usingFetch">
                                <ListItem>Using Fetch</ListItem>
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
                            <Link to="/findUsersNamed">
                                <ListItem>Find Users By Name</ListItem>
                            </Link>
                            <Link to="/findUniqueUsersNamedWithAnL">
                                <ListItem>Find Unique Users By Name</ListItem>
                            </Link>
                            <Link to="/handleAnErrorWithSubscribe">
                                <ListItem>Handle An Error With Subscribe</ListItem>
                            </Link>
                            <Link to="/convertErrorToSuccess">
                                <ListItem>Convert An Error Into A Success</ListItem>
                            </Link>
                            <Link to="/convertSuccessToError">
                                <ListItem>Convert A Successful Fetch Into An Error</ListItem>
                            </Link>
                            <Link to="/chainFetches">
                                <ListItem>Chain Fetches</ListItem>
                            </Link>
                            <Link to="/mergeToCombineRequests">
                                <ListItem>Merge To Combine Requests</ListItem>
                            </Link>
                            <Link to="/createYourOwnFetch">
                                <ListItem>Create Your Own Fetch</ListItem>
                            </Link>
                            <Link to="/creatingBehaviorSubjects">
                                <ListItem>Creating Behavior Subjects</ListItem>
                            </Link>
                            <Link to="/emitAllTheSentValues">
                                <ListItem>Emit All The Sent Values</ListItem>
                            </Link>
                            <Link to="/emitTheLastSentValue">
                                <ListItem>Emit The Last Sent Value</ListItem>
                            </Link>
                            <Link to="/completed">
                                <ListItem>Complete A Subscription</ListItem>
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
                    <Route path="/usingFetch">
                        <ExerciseComponents.UsingFetch />
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
                    <Route path="/findUsersNamed">
                        <ExerciseComponents.FindUsersNamed />
                    </Route>
                    <Route path="/findUniqueUsersNamedWithAnL">
                        <ExerciseComponents.FindUniqueUsersByName />
                    </Route>
                    <Route path="/handleAnErrorWithSubscribe">
                        <ExerciseComponents.SubscribeAndHandleAnError />
                    </Route>
                    <Route path="/convertErrorToSuccess">
                        <ExerciseComponents.CatchErrorEmitsASuccessMessage />
                    </Route>
                    <Route path="/convertSuccessToError">
                        <ExerciseComponents.ConvertSuccessIntoErrorWithThrow />
                    </Route>
                    <Route path="/chainFetches">
                        <ExerciseComponents.ChainFetches />
                    </Route>
                    <Route path="/mergeToCombineRequests">
                        <ExerciseComponents.MergeToCombineRequests />
                    </Route>
                    <Route path="/createYourOwnFetch">
                        <ExerciseComponents.CreateYourOwnFetch />
                    </Route>
                    <Route path="/creatingBehaviorSubjects">
                        <ExerciseComponents.CreatingBehaviorSubjects />
                    </Route>
                    <Route path="/emitAllTheSentValues">
                        <ExerciseComponents.EmitAllTheSentValues />
                    </Route>
                    <Route path="/emitTheLastSentValue">
                        <ExerciseComponents.EmitTheLastSentValue />
                    </Route>
                    <Route path="/completed">
                        <ExerciseComponents.CompleteASubscription />
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

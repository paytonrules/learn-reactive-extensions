import 'whatwg-fetch';
import React, { useState, useEffect } from 'react';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle,
         DrawerContent, DrawerSubtitle, DrawerAppContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'
import { BrowserRouter as Router,
         Switch, Route, Link } from 'react-router-dom';
import { fromFetch } from 'rxjs/fetch';
import { flatMap } from 'rxjs/operators'

const ObserverComponent: React.FC = () => {
    const [firstRow, setFirstRow] = useState(['one', 'two'])

    useEffect( () => {
        fromFetch('/posts').pipe(
            flatMap(response => response.json())
        ).subscribe({
            next: result => {
                setFirstRow(result[0]["title"])
            }
        })
    }, []);

    return (
        <DrawerAppContent>
            <div style={{padding: '48px'}} >
                <p>{firstRow}</p>
            </div>
        </DrawerAppContent>
    )

}

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
                            <Link to="/fetch"><ListItem>Fetch Data</ListItem></Link>
                            <ListItem>Pluck the Names</ListItem>
                        </List>
                    </DrawerContent>
                </Drawer>
                <Switch>
                    <Route path="/fetch">
                        <ObserverComponent />
                    </Route>
                    <Route path="/">
                        <ObserverComponent />
                    </Route>
                </Switch>
              </div>
          </div>
        </Router>
    );
}

export default App;

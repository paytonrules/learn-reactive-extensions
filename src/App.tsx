import React, { useState } from 'react';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle,
         DrawerContent, DrawerSubtitle, DrawerAppContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'

const App: React.FC = () => {
    const [response, setResponse] = useState({});
    fetch("/posts")
        .then(posts => {
            posts.json().then(json => setResponse(json))
        });

    return (
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
                          <ListItem>Fetch Data</ListItem>
                          <ListItem>Pluck the Names</ListItem>
                      </List>
                  </DrawerContent>
              </Drawer>
              <DrawerAppContent>
                  <div style={{padding: '48px'}}>
                      <h1>I did it</h1>
                      <p>{JSON.stringify(response)}</p>
                  </div>
              </DrawerAppContent>
            </div>
        </div>
    );
}

export default App;

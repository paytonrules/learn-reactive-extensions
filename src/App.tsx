import React from 'react';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle,
         DrawerContent, DrawerSubtitle, DrawerAppContent } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'

const App: React.FC = () => {
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
                  </div>
              </DrawerAppContent>
            </div>
        </div>
    );
}

export default App;

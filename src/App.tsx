import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle, DrawerContent, DrawerSubtitle } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'

const App: React.FC = () => {
    return (
        <div className="App">
            <SimpleTopAppBar title="Reactive Exercises" />
            <TopAppBarFixedAdjust />
            <Drawer>
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
        </div>
    );
}

export default App;

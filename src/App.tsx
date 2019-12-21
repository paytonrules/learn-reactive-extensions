import 'whatwg-fetch';
import React from 'react';
import './App.css';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Drawer, DrawerHeader, DrawerTitle,
         DrawerContent, DrawerSubtitle } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list'
import { BrowserRouter as Router,
         Switch, Route, Link } from 'react-router-dom';
import { Subscribe, Filter, Directions } from './exercises/components';

//const Exercise: React.FC<ExampleProps> = props => {
//    const [firstRow, setFirstRow] = useState(['one', 'two'])
//
//    useEffect( () => {
//        fromFetch('/posts').pipe(
//            flatMap(response => response.json())
//        ).subscribe({
//            next: result => {
//                setFirstRow(result[0]["title"])
//            }
//        })
//    }, []);
//
//    return (
//        <DrawerAppContent>
//            <div style={{padding: '48px'}} >
//                <p>{firstRow}</p>
//                {props.children}
//            </div>
//        </DrawerAppContent>
//    )
//
//}*/

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
                            <Link to="/filter">
                                <ListItem>Exercise 2</ListItem>
                            </Link>
                        </List>
                    </DrawerContent>
                </Drawer>
                <Switch>
                    <Route path="/subscribe">
                        <Subscribe />
                    </Route>
                    <Route path="/filter">
                        <Filter />
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

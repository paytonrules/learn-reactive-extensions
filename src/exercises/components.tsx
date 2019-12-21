import React, { useState, useEffect } from 'react';
import { DrawerAppContent } from '@rmwc/drawer';
import { of } from 'rxjs';
import * as puzzles from './puzzles';
import { Grid, GridCell } from '@rmwc/grid';
import { SimpleDataTable } from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';
import _ from 'underscore';

const rightAnswer = 'chartreuse';
const wrongAnswer = 'indianRed';

export const Directions: React.FC = () => {
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell span={8}>
                    <h1>Directions</h1>
                    <p>
                        The exercises here are meant to take you from understanding a little about RxJS to using the tool effectively in an app.
                        It is done through a series of puzzles, which are located in the directory <code>src/exercises/puzzles.ts</code>. Inside that file
                        you'll see a series of functions with names like <code>subscribePuzzle</code>. Those names correspond to the exercises on the left
                        of this web app. So the <code>subscribePuzzle</code> function must be completed to pass the <code>Subscribe</code> exercise on the left.
                        If you run this application with the provided docker-compose setup it will automatically refresh on save,
                        so you will see the results immediately. You should not need to look at the corresponding React components to complete the
                        exercises. If you get stuck google, ask quesetions, pair. There is no such thing as cheating, and reactive extensions can be very
                        confusing at first.
                    </p>
                    <p>
                        To get the directions for each exercise click the links on the left. These exdercises are meant to be done in order, as the get progressively
                        more difficult as they progress. So why don't you click the Subscribe exercise and get started!
                    </p>
                </GridCell>
            </Grid>
        </DrawerAppContent>
    );
}

export const Subscribe: React.FC = props => {
    const [firstEntry, setFirstEntry] = useState(-1);

    useEffect(() => puzzles.subscribe(of(1), setFirstEntry), []);
    let answerColor = (firstEntry === 1) ? rightAnswer : wrongAnswer;
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell>
                    <h2>Subscribe</h2>
                    <p>
                        This first exercise is meant to show you how to use the <code>subscribe</code> method on an Observable. The function subscribePuzzle
                        is called with two parameters: an Observable of Numbers, and a React dispatch function. The Observable will "emit" one value which
                        you capture via the subscribe function.
                    </p>

                    <p>
                        The subscribe function takes one parameter - a callback, which is passed the value(s) emitted by the Observable. In this case it is just
                        one value. Subscribe is how you get values out of an Observable. You can think of it like the <code>then</code> of a promise.
                    </p>

                    <p>
                        For this first exercise you'll take the value emitted from the Observable, and send it back to the React App via the callback function.
                    </p>

                    <p>
                        <em>Important:</em> The Observable emits wrapper <code>Number</code> objects. The React callback expects a <code>number</code> primitive
                        so you'll need to dconvert the <code>Number</code> to a <code>number</code> with the <code>valueOf</code> method.
                    </p>
                </GridCell>
                <GridCell style={{paddingTop: "4em"}}>
                    <SimpleDataTable
                        getCellProps={(_, __, isHead) => {
                            if (!isHead) {
                                return { style: { backgroundColor: answerColor } };
                            } else {
                                return {};
                            }

                        } }
                        headers={[['Your Value']]}
                        data={[[firstEntry]]} />
                </GridCell>
            </Grid>
        </DrawerAppContent>
    );
}

export const TakeTwo: React.FC = () => {
    const [entries, setEntries] = useState<number[]>([]);

    useEffect(() => {
        puzzles
            .takeTwo(of(9, 8, 7))
            .subscribe(num => setEntries(e => [...e, num.valueOf()]));
    }, []);

    let answerColor = _.isEqual(entries, [9, 8]) ? rightAnswer : wrongAnswer;
    let entriesAsRows: number[][] = _.toArray(_.chunk(entries, 1))
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell>
                    <h2>Take</h2>
                    <p>
                        In the first exercise we subscribed to an Observable and then made a callback into a React application. This isn't how you'll want to use
                        Observable's typically, indeed you could have just made the callback directy. Part of the power of Observables is that you can return them as
                        values, and that's what we'll be doing in this second exercise. The parent component will handle the subscription, which is a more typical way
                        to use an Observable.
                    </p>

                    <p>
                        In this exercise the function will take an Observable, modify it using your first RxJS operator (take), and return it to be further processed by
                        the react app. Specifically this app will take first two items from the Observable. It's a straightforward operator that takes the first x
                        items emitted from the Observable.
                    </p>

                    <p>
                        Keep in mind that operators can be called two different ways. One is to call them directly, passing them their parameters which then return a function
                        that takes an Observable. This is awkward and the more common way to make the call is to use the <code>pipe</code> operator, and pass operators
                        to the pipe like so: <code>observable.pipe(map(val => val * 2))</code>. {_.chunk(entries, 1)}
                    </p>
                </GridCell>
                <GridCell style={{paddingTop: "4em"}}>
                    <SimpleDataTable
                        getCellProps={(_, __, isHead) => {
                            if (!isHead) {
                                return { style: { backgroundColor: answerColor } };
                            } else {
                                return {};
                            }

                        } }
                        headers={[['Your Values']]}
                        data={entriesAsRows} />
                </GridCell>
            </Grid>
        </DrawerAppContent>);
}

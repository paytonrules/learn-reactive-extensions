import React, { useState, useEffect } from 'react';
import { DrawerAppContent } from '@rmwc/drawer';
import { of } from 'rxjs';
import { subscribePuzzle } from './puzzles';
import { Grid, GridCell } from '@rmwc/grid';
import { SimpleDataTable } from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';

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

    useEffect(() => subscribePuzzle(of(1), setFirstEntry), []);
    let answerColor = (firstEntry == 1) ? rightAnswer : wrongAnswer;
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

export const Filter: React.FC = props => {
    return <DrawerAppContent>also hi</DrawerAppContent>
}

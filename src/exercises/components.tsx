import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import * as directions from './directions';
import { DrawerAppContent } from '@rmwc/drawer';
import { of } from 'rxjs';
import * as puzzles from './puzzles';
import { Grid, GridCell } from '@rmwc/grid';
import { SimpleDataTable } from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';
import _ from 'underscore';
import { flatMap } from 'rxjs/operators';

export const Directions: React.FC = () => {
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell span={8}>
                    <ReactMarkdown source={directions.directions} />
                </GridCell>
            </Grid>
        </DrawerAppContent>
    );
}

const rightAnswer = 'chartreuse';
const wrongAnswer = 'indianRed';
export const Subscribe: React.FC = props => {
    const [firstEntry, setFirstEntry] = useState(-1);

    useEffect(() => puzzles.subscribe(of(1), setFirstEntry), []);
    let answerColor = _.isEqual(firstEntry, 1) ? rightAnswer : wrongAnswer;
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell>
                    <ReactMarkdown source={directions.subscribe} />
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
                    <ReactMarkdown source={directions.takeTwo} />
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

export const Fetch: React.FC = () => {
    const [response, setResponse] = useState({});

    useEffect(() => {
        puzzles
            .fetch('/posts')
            .pipe(
                flatMap(response => response.json())
            )
            .subscribe(body => setResponse(body[0]));
    }, []);

    let expectedResult = {id:1, title:"json-server", author: "typicode"};
    let answerColor = _.isEqual(expectedResult, response) ? rightAnswer : wrongAnswer;
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell>
                    <ReactMarkdown source={directions.fetch} />
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
                        data={[[JSON.stringify(response)]]} />
                </GridCell>
            </Grid>
        </DrawerAppContent>);
}

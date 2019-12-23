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

const ExerciseComponent: React.FC<ExerciseProps> = (props: ExerciseProps) => {
    const rightAnswer = 'chartreuse';
    const wrongAnswer = 'indianRed';
    let answerColor = _.isEqual(props.expectedResult, props.result) ? rightAnswer : wrongAnswer;
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell>
                    <ReactMarkdown source={props.directions} />
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
                        headers={props.headers}
                        data={props.data}  />
                </GridCell>
            </Grid>
        </DrawerAppContent>
    )
}

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

interface ExerciseProps {
    directions: string,
    headers: string[][],
    data: any[][],
    expectedResult: any,
    result: any
}

export const Subscribe: React.FC = props => {
    const [firstEntry, setFirstEntry] = useState(-1);

    useEffect(() => puzzles.subscribe(of(1), setFirstEntry), []);
    return (
        <ExerciseComponent
            directions={directions.subscribe}
            headers={[['Your Value']]}
            data={[[`${firstEntry}`]]}
            expectedResult={1}
            result={firstEntry} />
    );
}

export const TakeTwo: React.FC = () => {
    const [entries, setEntries] = useState<number[]>([]);

    useEffect(() => {
        puzzles
            .takeTwo(of(9, 8, 7))
            .subscribe(num => setEntries(e => [...e, num.valueOf()]));
    }, []);

    let entriesAsRows: number[][] = _.toArray(_.chunk(entries, 1))
    return (
        <ExerciseComponent
            directions={directions.takeTwo}
            headers={[['Your Values']]}
            data={entriesAsRows}
            expectedResult={[9, 8]}
            result={entries} />
    );
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

    return (
        <ExerciseComponent
            directions={directions.fetch}
            headers={[['Your Values']]}
            data={[[JSON.stringify(response)]]}
            expectedResult={{id:1, title:"json-server", author: "typicode"}}
            result={response} />
    );
}

export const MapStatusCode: React.FC = () => {
    const [statusCode, setStatusCode] = useState(200)

    useEffect(() => {
        puzzles
            .mapStatus('/invalidUrl')
            .subscribe(code => setStatusCode(code))
    }, []);

    return (
        <ExerciseComponent
            directions={directions.mapStatusCode}
            headers={[['Your Status Code']]}
            data={[[[statusCode]]]}
            expectedResult={404}
            result={statusCode} />
    )
}

export const GetTheJSON: React.FC = () => {
    const [responseBody, setResponseBody] = useState({});
    const expectedResult = [{id:1, title: "json-server", author: "typicode"}];

    useEffect(() => {
        puzzles
            .getTheJSON('/posts')
            .subscribe(body => setResponseBody(body))
    }, []);

    return (
        <ExerciseComponent
            directions={directions.getTheJSON}
            headers={[['Your JSON']]}
            data={[[JSON.stringify(responseBody)]]}
            expectedResult={expectedResult}
            result={responseBody} />
    )
}

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
import '@material/drawer/dist/mdc.drawer.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@rmwc/icon/icon.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/list/dist/mdc.list.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

const ExerciseComponent: React.FC<ExerciseProps> = (props: ExerciseProps) => {
    const rightAnswer = 'chartreuse';
    const wrongAnswer = 'indianRed';
    let answerColor = _.isEqual(props.expectedResult, props.result) ? rightAnswer : wrongAnswer;
    return (
        <DrawerAppContent>
            <Grid>
                <GridCell span={6}>
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

export const TapToConsoleLog: React.FC = () => {
    interface TappedInfo {
        logged: boolean,
        nums: number[]
    };
    const [state, updateState] = useState<TappedInfo>({logged: false, nums: []});


    const phonyLogger = {
        log(...args: any[]) {
            updateState(state => { return {logged: true, nums: state.nums}});
            console.log(args);
        }
    }

    useEffect(() => {
        puzzles
            .logging(phonyLogger, of(1, 2, 3))
            .subscribe(num => updateState(state => {
                return {
                    logged: state.logged,
                    nums: [...state.nums, num]
                };
            }));
    }, [phonyLogger]);
    const observedNumbersAsRows: number[][] = _.toArray(_.chunk(state.nums, 1));
    const expectedResult = { logged: true, nums: [1, 2, 3] };

    return (
        <ExerciseComponent
            directions={directions.tapForDebugging}
            headers={[['Observed values']]}
            data={observedNumbersAsRows}
            expectedResult={expectedResult}
            result={state} />
    )
}

export const CreateYourOwnObservable: React.FC = () => {
    const [actualResult, setResult] = useState<number[]>([]);

    useEffect(() => {
        puzzles
            .createYourOwnObservable()
            .subscribe(num => setResult(nums => [...nums, num]));

    }, []);

    const expectedResult = [7, 8, 9];
    const valuesAsRows: number[][] = _.toArray(_.chunk(actualResult, 1));

    return (
        <ExerciseComponent
            directions={directions.createYourOwnObservable}
            headers={[['Your values']]}
            data={valuesAsRows}
            expectedResult={expectedResult}
            result={actualResult} />

    );
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

export const TakeFiveRowsFromTheTweets: React.FC = () => {
    const [rows, setRows] = useState<any[]>([]);
    const expectedIds = ["1006566899541598210",
                         "1006566899843510272",
                         "1006566899608707074",
                         "1006566900040650752",
                         "1006566900237848577"];

    useEffect(() => {
        puzzles
            .takeFiveRows('/nintendo')
            .subscribe(row => {
                setRows(rows => [...rows, row]);
            })
    }, []);

    return (
        <ExerciseComponent
            directions={directions.takeFiveRowsFromTheJSON}
            headers={[['Your JSON']]}
            data={rows.map(row => [JSON.stringify(row)])}
            expectedResult={expectedIds}
            result={rows.map(row => row["id_str"])} />
    )
}

export const CountValidUsers: React.FC = () => {
    const [count, setCount] = useState(0);
    const expectedCount = 2997;

    useEffect(() => {
        puzzles
            .countValidUsers("/nintendo")
            .subscribe(count => setCount(count))
    }, []);

    return (
        <ExerciseComponent
            directions={directions.countValidUsers}
            headers={[['Valid Users']]}
            data={[[count]]}
            expectedResult={expectedCount}
            result={count} />
    )
}

export const FindUsersNamed: React.FC = () => {
    const [userNames, setUserNames] = useState<string[]>([]);

    useEffect(() => {
        puzzles
            .findUsersNamed("/nintendo")
            .subscribe(userName => setUserNames(names => [...names, userName]))
    }, [])

    const expectedUserNames: string[] = [
        'liebes engelchen',
        'luping74',
        "lae♡ˡᵒᵛᵉ⁴ᵉᵛᵃ",
        'luping74',
        "l'Olonnais Zero",
        "luke @ comic writing",
        "leslie ✿",
        "la la layo🌸",
        "lesbian rights! ⚡️🍻",
        "lili™",
        "luna 🌈🐸👖 @ ANIMAL CROSSING PLS",
        "liebes engelchen",
        "local dumpster fire",
        "livyathan",
        "liebes engelchen",
        "lili™",
        "liam wallace",
        "liebes engelchen",
        "liebes engelchen"
    ];
    const userNamesAsRows: number[][] = _.toArray(_.chunk(userNames, 1))
    console.log(userNames);
    console.log("expected", expectedUserNames);

    return (
        <ExerciseComponent
            directions={directions.findUsersNamed}
            headers={[['User Names']]}
            data={userNamesAsRows}
            expectedResult={expectedUserNames}
            result={userNames} />
    );
   
}

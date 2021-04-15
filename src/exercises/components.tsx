import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import * as directions from './directions';
import { DrawerAppContent } from '@rmwc/drawer';
import { of, throwError, concat } from 'rxjs';
import * as puzzles from './puzzles';
import { Grid, GridCell } from '@rmwc/grid';
import { SimpleDataTable } from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';
import _ from 'underscore';
import { flatMap, map, tap } from 'rxjs/operators';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@rmwc/icon/icon.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/list/dist/mdc.list.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

function arrayToRows<T>(entries: T[]): T[][] {
    return _.toArray(_.chunk(entries, 1));
}

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


export const UsingFetch: React.FC = () => {
    const [response, setResponse] = useState({});

    useEffect(() => {
        puzzles
            .usingFetch('/posts')
            .pipe(
                flatMap(response => response.json())
            )
            .subscribe(body => setResponse(body[0]));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.usingFetch}
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

    useEffect(() => {
        const phonyLogger = {
            log(...args: any[]) {
                updateState(state => { return {logged: true, nums: state.nums}});
                console.log(args);
            },
            error(...args: any[]) {}
        }

        puzzles
            .logging(phonyLogger, of(1, 2, 3))
            .subscribe(num => updateState(state => {
                return {
                    logged: state.logged,
                    nums: [...state.nums, num]
                };
            }));
    }, []);

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
        "noah",
        "negative",
        "nibiruBzH - #E3CaroJu 🎮",
        "nACABun",
        "nick_haskell▧",
        "nugget",
        "nACABun",
        "n3rdabl3.",
        "nACABun",
        "noah",
        "nusi",
        "nuzesy"
    ];
    const userNamesAsRows: string[][] = _.toArray(_.chunk(userNames, 1))

    return (
        <ExerciseComponent
            directions={directions.findUsersNamed}
            headers={[['User Names']]}
            data={userNamesAsRows}
            expectedResult={expectedUserNames}
            result={userNames} />
    );
}

export const FindUniqueUsersByName: React.FC = () => {
    const [userNames, setUserNames] = useState<string[]>([]);

    useEffect(() => {
        puzzles
            .findUniqueUsersNamed("/nintendo")
            .subscribe(userName => setUserNames(names => [...names, userName]))
    }, [])

    const expectedUserNames: string[] = [
        "noah",
        "negative",
        "nibiruBzH - #E3CaroJu 🎮",
        "nACABun",
        "nick_haskell▧",
        "nugget",
        "n3rdabl3.",
        "nusi",
        "nuzesy"
    ]
    const userNamesAsRows: string[][] = _.toArray(_.chunk(userNames, 1))

    return (
        <ExerciseComponent
            directions={directions.findUniqueUsersNamed}
            headers={[['User Names']]}
            data={userNamesAsRows}
            expectedResult={expectedUserNames}
            result={userNames} />
    );
}

export const SubscribeAndHandleAnError: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('No error sent');
    let console = {
        log(...args: any[]) { },
        error(...args: any[]) { setErrorMessage(args[0]) }
    }

    useEffect(() => {
        puzzles.subscribeAndHandleAnError(console, throwError('Wrong Url'));
    }, [console]);

    return (
        <ExerciseComponent
            directions={directions.subscribeAndHandleAnError}
            headers={[['Error Message']]}
            data={[[errorMessage]]}
            expectedResult={'Wrong Url'}
            result={errorMessage} />
    )
}

export const CatchErrorEmitsASuccessMessage: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const observableWithError = concat(of('Right Url'), throwError('Wrong Url'));

        puzzles.catchErrorEmitsASuccessMessage(observableWithError)
               .subscribe(newMessage => setMessages(messages => [...messages, newMessage]));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.catchErrorEmitsASuccessMessage}
            headers={[['Success Message']]}
            data={arrayToRows(messages)}
            expectedResult={['Right Url', 'Wrong Url']}
            result={messages} />
    )
}

export const ConvertSuccessIntoErrorWithThrow: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('No Error Reported');

    useEffect(() => {
        puzzles
            .convertSuccessfulFetchIntoError('/badUrl')
            .subscribe(() => {}, err => setErrorMessage(err));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.convertSuccessfulFetchIntoError}
            headers={[['Error Message']]}
            data={[[errorMessage]]}
            expectedResult={404}
            result={errorMessage} />
    )
}

export const ChainFetches: React.FC = () => {
    const [tweets, setTweets] = useState<string[][]>([]);


    useEffect(() => {
        const nintendoUrl = "/nintendo?id=1006567010153705500";
        const twitterUrl = _.template('/twitter?user.id=<%= id %>');
        puzzles
            .chainFetches(nintendoUrl, twitterUrl)
            .subscribe(obj => setTweets(t => [...t, [obj.screenName, obj.tweet]]));
    }, []);

    const expectedResult = [
        ["jojade74", "why does everyone like my voice i sound like ed miliband choking on sandwich"],
        ["jojade74", "@Johnny_G86 @bbcnickrobinson he was a young Tory -comes from Cheadle Hulme"]
    ]

    return (
        <ExerciseComponent
        directions={directions.chainFetches}
        headers={[['Username', 'Tweet']]}
        data={tweets}
            expectedResult={expectedResult}
            result={tweets}
        />
    )
  
}

export const MergeToCombineRequests: React.FC = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const nintendoUrl = "/nintendo";
        const twitterUrl = "/twitter";
        puzzles
            .mergeToCombineRequests(nintendoUrl, twitterUrl)
            .subscribe(ct => setCount(ct));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.mergeToCombineRequests}
            headers={[['Tweet Count']]}
            data={[[count]]}
            expectedResult={4776}
            result={count}
        />
    )
}

export const CreateYourOwnFetch: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const goodRequestUrl = "/nintendo?id=1006567010153705500";
        const badRequestUrl = "/nope";

        puzzles.createYourOwnFetch(goodRequestUrl).pipe(
            map(body => body[0]['user']?.['screen_name']),
            tap(screenName => setMessages(messages => [...messages, screenName])),
            flatMap( _ =>  puzzles.createYourOwnFetch(badRequestUrl))
        ).subscribe(msg => setMessages(messages => [...messages, msg]),
                    err => setMessages(messages => [...messages, err]));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.createYourOwnFetch}
            headers={[['Results']]}
            data={arrayToRows(messages)}
            expectedResult={['jojade74', 404]}
            result={messages}
        />
    )
}

export const CreatingBehaviorSubjects: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);


    useEffect(() => {
        const phonyLogger = {
            log(...args: any[]) {
                setMessages(messages => [...messages, ...args]);
            },
            error(...args: any[]) {}
        }
        const subject = puzzles.creatingBehaviorSubjects(phonyLogger)
        subject.next("one");
        subject.next("two");
        subject.next("three");
    }, []);

    return (
        <ExerciseComponent
            directions={directions.creatingBehaviorSubjects}
            headers={[['Results']]}
            data={arrayToRows(messages)}
            expectedResult={["zero", "one", "three"]}
            result={messages}
        />
    )
}

export const EmitAllTheSentValues: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const observable = puzzles.emitAllTheSentValues(["1", "four", "the end"]);
        observable.subscribe(x => setMessages(messages => [...messages, x]));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.emitAllTheSentValues}
            headers={[['Results']]}
            data={arrayToRows(messages)}
            expectedResult={["1", "four", "the end"]}
            result={messages}
        />
    )
}

export const EmitTheLastSentValue: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const observable = puzzles.emitTheLastSentValue(["1", "four", "the end"]);
        observable.subscribe(x => setMessages(messages => [...messages, x]));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.emitTheLastSentValue}
            headers={[['Results']]}
            data={arrayToRows(messages)}
            expectedResult={["the end"]}
            result={messages}
        />
    )
}

export const CompleteASubscription: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        puzzles
            .completeASubscription()
            .subscribe(val => setMessages(m => [...m, val]),
                       err => setMessages(m => [...m, err]),
                       () => setMessages(m => [...m, "complete"]));
    }, []);

    return (
        <ExerciseComponent
            directions={directions.completeASubscription}
            headers={[['Emissions']]}
            data={arrayToRows(messages)}
            expectedResult={["value one", "complete"]}
            result={messages}
        />

    );
}

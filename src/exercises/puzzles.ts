import 'whatwg-fetch';
import { Observable, Observer, of, merge, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { take, map, flatMap, tap, filter, count, distinct, catchError} from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Dispatch, SetStateAction } from 'react';


interface Logger {
    log(...args: any[]): void;
    error(...args: any[]): void;
}

export const subscribe = (observable: Observable<number>, cb:Dispatch<SetStateAction<number>>) => {
    observable.subscribe(x => cb(x));
}

export const takeTwo = (observable: Observable<number>): Observable<number> => {
    return observable.pipe(
        take(2)
    )
}

export const usingFetch = (url: string): Observable<Response> => {
    return fromFetch(url);
}

export const mapStatus = (invalidUrl: string): Observable<number> => {
    return fromFetch(invalidUrl).pipe(
        map(response => response.status)
    );
}

export const logging = (console: Logger, observable: Observable<number>): Observable<number> => {
    return observable.pipe(
        tap(x => console.log(x))
    );
}

export const createYourOwnObservable = (): Observable<number> => {
    return of(7, 8, 9);
}

export const getTheJSON = (url: string): Observable<any> => {
    return fromFetch(url).pipe(
        flatMap(response => response.json())
    );
}

export const takeFiveRows = (url: string): Observable<any> => {
    return fromFetch(url).pipe(
        flatMap(response => response.json()),
        flatMap(body => of(...body)),
        take(5)
    );
}

export const countValidUsers = (url: string): Observable<number> => {
    return fromFetch(url).pipe(
        flatMap(response => response.json()),
        flatMap(body => of(...body)),
        filter(entry => entry['user'] != null),
        count()
    )
}

export const findUsersNamed = (url: string): Observable<string> => {
    return fromFetch(url).pipe(
        flatMap(response => response.json()),
        flatMap(body => of(...body)),
        filter(entry => entry['user']?.['name']?.startsWith('l')),
        map(entry => entry['user']?.['name'])
    );
}

export const findUniqueUsersNamed = (url: string): Observable<string> => {
    return fromFetch(url).pipe(
        flatMap(response => response.json()),
        flatMap(body => of(...body)),
        filter(entry => entry['user']?.['name']?.startsWith('l')),
        map(entry => entry['user']?.['name']),
        distinct()
    );
}

export const subscribeAndHandleAnError = (console: Logger, observable: Observable<string>) => {
    observable.subscribe(() => {}, err => console.error(err))
}

export const catchErrorEmitsASuccessMessage = (observable: Observable<any>): Observable<any> => {
    return observable.pipe(
        catchError(err => of(err))
    );
}

export const convertSuccessfulFetchIntoError = (url: string): Observable<any> => {
    return fromFetch(url).pipe(
        map(response => {
            if (!response.ok) {
                throw response.statusText;
            }
            return response;
        })
    )
}

interface Tweet {
    screenName: string;
    tweet: string;
}

const fromFetchToJsonObjects = (url:string): Observable<any> => {
    return fromFetch(url).pipe(
        flatMap(response => response.json()),
        flatMap(body => of(...body))
    );
}

export const chainFetches = (firstUrl: string, secondUrl: _.CompiledTemplate): Observable<Tweet> => {
    // secondUrl can have the id substituted in with
    // secondUrl({id: <the right id>})
    //
    return fromFetchToJsonObjects(firstUrl).pipe(
        flatMap(entry => fromFetchToJsonObjects(secondUrl({id: entry.user.id}))),
        map(entry => { return { screenName: entry.user.screen_name, tweet: entry.text } } )
    );
}

export const mergeToCombineRequests = (firstUrl: string, secondUrl: string): Observable<number> => {
    return merge(fromFetchToJsonObjects(firstUrl), fromFetchToJsonObjects(secondUrl)).pipe(
        map(entry => entry.user?.screen_name),
        filter(screen_name => screen_name),
        distinct(),
        count()
    );
}

export const createYourOwnFetch = (url: string): Observable<any> => {
    return Observable.create((observer: Observer<any>) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    observer.error(response.statusText);
                }
                return response.json();
            })
            .then(blob => observer.next(blob));
    });
}

export const creatingBehaviorSubjects = (logger: Logger): Subject<string> => {
    const subject = new BehaviorSubject<string>("zero");
    subject.pipe(filter(val => val !== 'two')).subscribe(val => logger.log(val));
    return subject;
}

export const emitAllTheSentValues = (values: string[]): Observable<string> => {
    const subject = new ReplaySubject<string>();
    values.forEach(value => subject.next(value));
    return subject;
}

export const emitTheLastSentValue = (values: string[]): Observable<string> => {
    const subject = new BehaviorSubject<string>("wont matter");
    values.forEach(value => subject.next(value));
    return subject;
}

export const completeASubscription = (): Observable<string> => {
    return Observable.create((observer: Observer<string>) => {
        observer.next("value one");
        observer.complete();
    });
}

import 'whatwg-fetch';
import { Observable, Observer, of, empty, merge, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { take, map, flatMap, tap, filter, count, distinct, catchError} from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Dispatch, SetStateAction } from 'react';

interface Logger {
    log(...args: any[]): void;
    error(...args: any[]): void;
}

export const subscribe = (observable: Observable<number>, cb:Dispatch<SetStateAction<number>>) => {
}

export const takeTwo = (observable: Observable<number>): Observable<number> => {
    return observable;
}

export const usingFetch = (url: string): Observable<Response> => {
    return empty();
}

export const mapStatus = (invalidUrl: string): Observable<number> => {
    return of(1);
}

export const logging = (console: Logger, observable: Observable<number>): Observable<number> => {
    return empty();
}

export const createYourOwnObservable = (): Observable<number> => {
    return empty();
}

export const getTheJSON = (url: string): Observable<any> => {
    return empty();
}

export const takeFiveRows = (url: string): Observable<any> => {
    return empty();
}

export const countValidUsers = (url: string): Observable<number> => {
    return empty();
}

export const findUsersNamed = (url: string): Observable<string> => {
    return empty();
}

export const findUniqueUsersNamed = (url: string): Observable<string> => {
    return empty();
}

export const subscribeAndHandleAnError = (console: Logger, observable: Observable<string>) => {
}

export const catchErrorEmitsASuccessMessage = (observable: Observable<any>): Observable<any> => {
    return observable;
}

/// FIGURE OUT HOW TO CONTINUE THE STREAM AFTER
//
export const convertSuccessfulFetchIntoError = (url: string): Observable<any> => {
    return empty();
}

interface Tweet {
    screenName: string;
    tweet: string;
}

export const chainFetches = (firstUrl: string, secondUrl: _.CompiledTemplate): Observable<Tweet> => {
    // secondUrl can have the id substituted in with
    // secondUrl({id: <the right id>})
    return empty();
}

export const mergeToCombineRequests = (firstUrl: string, secondUrl: string): Observable<number> => {
    return empty();
}

export const createYourOwnFetch = (url: string): Observable<any> => {
    return empty();
}

export const creatingBehaviorSubjects = (logger: Logger): Subject<string> => {
    const subject = new Subject<string>();
    return subject;
}

export const emitAllTheSentValues = (values: string[]): Observable<string> => {
    return empty();
}

export const emitTheLastSentValue = (values: string[]): Observable<string> => {
    return empty();
}

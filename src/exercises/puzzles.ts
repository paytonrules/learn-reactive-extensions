import 'whatwg-fetch';
import { Observable, of, empty } from 'rxjs';
import { take, map, flatMap, tap  } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Dispatch, SetStateAction } from 'react';

export const subscribe = (observable: Observable<Number>, cb:Dispatch<SetStateAction<number>>) => {
}

export const takeTwo = (observable: Observable<Number>): Observable<Number> => {
    return observable;
}

export const fetch = (url: string): Observable<Response> => {
    return empty();
}

export const mapStatus = (invalidUrl: string): Observable<number> => {
    return of(1);
}

export const getTheJSON = (url: string): Observable<any> => {
    return empty();
}

export const takeFiveRows = (url: string): Observable<any> => {
    return empty();
}

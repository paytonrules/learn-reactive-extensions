import { Observable, of } from 'rxjs';
import { take  } from 'rxjs/operators';
import { Dispatch, SetStateAction } from 'react';

export const subscribe = (observable: Observable<Number>, cb:Dispatch<SetStateAction<number>>) => {
}

export const takeTwo = (observable: Observable<Number>): Observable<Number> => {
    return observable;
}

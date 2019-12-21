import { Observable } from "rxjs";
import { Dispatch, SetStateAction } from "react";

export const subscribePuzzle = (observable: Observable<Number>, cb:Dispatch<SetStateAction<number>>) => {
//    observable.subscribe(x => cb(x.valueOf()));
}

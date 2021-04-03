import {Match} from "./match"
export interface Reservation {
        match : Match,
        seat_row : Array<number>,
        seat_col: Array<number>
}
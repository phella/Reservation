import {Match} from "./match"
export interface Reservation {
        _id: string,
        match : Match,
        seat_row : Array<number>,
        seat_col: Array<number>,
        seats: Array<{seat_row, seat_col}>
}
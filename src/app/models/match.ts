export interface Match {
    id: string;
    home_team: string;
    away_team: string;
    match_venue: string;
    date: Date;
    main_referee: string;
    line_man1: string;
    line_man2: string;
    stadium: string;
    seats: Array<Array<Boolean>>;
}
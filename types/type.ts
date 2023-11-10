export enum STATUS{
    ACCEPTED,
    WAITING,
    REJECTED,
}

export type Premium = {
    user_id : number,
    username : string,
    status : STATUS,
}
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

export type CoursePremium = {
    id : number,
    title : string,
    description : string,
    image_path? : string,
    teacher_id : number,
    release_date : Date
}

export interface Task {
    id?:string;
    desc:string;
    completed:boolean;
    priority:number;
    dueDate?:Date;
    reminder?:Date;
    remark?:string;
    createDate:Date;
    ownerId?:string;
    participantIds:string[];//参与者的ID，与任务是多对多
    taskListId:string;
}
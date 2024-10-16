import { ITask } from '../task/taks.interface';

export interface IUser {
    name: string;
    tasks: ITask[];
    assignTask(task: ITask): boolean;
    completeTask(task: ITask): boolean;
}

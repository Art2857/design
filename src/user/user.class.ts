import { ITask } from '../task/taks.interface';
import { IUser } from './user.interface';

export class User implements IUser {
    public tasks: ITask[] = [];

    constructor(public name: string) {}

    assignTask(task: ITask): boolean {
        const assignedTask = this.tasks.find((t) => t === task);

        if (assignedTask) {
            return false;
        }

        this.tasks.push(task);

        return true;
    }

    completeTask(task: ITask): boolean {
        const assignedTask = this.tasks.find((t) => t === task);

        if (!assignedTask) {
            return false;
        }

        if (assignedTask.isCompleted()) {
            return false;
        }

        assignedTask.complete();

        return true;
    }
}

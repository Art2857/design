import { ITask } from './taks.interface';

export class Task implements ITask {
    private completed: boolean = false;

    constructor(public title: string, public priority: string) {}

    isCompleted(): boolean {
        return this.completed;
    }

    complete(): void {
        this.completed = true;
    }
}

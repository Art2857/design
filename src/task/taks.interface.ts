export interface ITask {
    title: string;
    priority: string;
    isCompleted(): boolean;
    complete(): void;
}

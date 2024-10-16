import { ITask } from '../task/taks.interface';

export interface IUser {
    /** Имя пользователя */
    name: string; // example
    /** Массив задач, которые назначены пользователю */
    tasks: ITask[];

    /** Метод для назначения задачи пользователю.
     * Возвращает true, если задача успешно назначена, иначе false (например, если задача уже назначена).*/
    assignTask(task: ITask): boolean;

    /** Метод для завершения задачи.
     * Возвращает true, если задача успешно завершена, иначе false (например, если задача уже завершена или не назначена).*/
    completeTask(task: ITask): boolean;
}

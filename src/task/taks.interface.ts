export interface ITask {
    /** Название задачи */
    title: string; // example
    /** Приоритет задачи (например, высокий, средний, низкий) */
    priority: string; // example

    /** Метод для проверки, завершена ли задача. */
    isCompleted(): boolean;

    /** Метод для завершения задачи. */
    complete(): void;
}

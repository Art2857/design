import { ITask } from './taks.interface';
import { Task } from './task.class';

/*
    Тестируемые кейсы:
    - должна возвращать false, если задача не завершена
    - должна завершить задачу
*/
describe('Задача', () => {
    let task: ITask;

    beforeEach(() => {
        task = new Task('Complete project', 'High');
    });

    it('должна быть не завершена по умолчанию', () => {
        const isCompleted = task.isCompleted();

        expect(isCompleted).toBe(false); // Проверяем, что задача не завершена до вызова complete (по умолчанию не завершена)
    });

    it('должна быть завершена после вызова complete', () => {
        task.complete();
        const isCompleted = task.isCompleted();

        expect(isCompleted).toBe(true); // Проверяем, что задача завершена после вызова complete
    });
});

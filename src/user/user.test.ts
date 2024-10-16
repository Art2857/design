import { ITask } from '../task/taks.interface';
import { User } from './user.class';
import { IUser } from './user.interface';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

/*
    Тестируемые кейсы:
    - user.assignTask - должен назначать задачу пользователю
    - user.assignTask - не должен назначать уже назначенную задачу
    - user.completeTask - должен завершить назначенную задачу
    - user.completeTask - не должен завершить неназначенную задачу
    - user.completeTask - не должен завершить задачу, если она уже завершена
    - user.assignTask и user.completeTask - должены корректно работать с несколькими задачами
*/
describe('Пользователь и задачи', () => {
    let user: IUser;
    let task: DeepMockProxy<ITask>;
    let anotherTask: DeepMockProxy<ITask>;

    beforeEach(() => {
        user = new User('Alice');
        task = mockDeep<ITask>(); // Создаём глубокий мок задачи
        anotherTask = mockDeep<ITask>(); // Создаём глубокий мок для другой задачи

        // Настроим поведение методов isCompleted и complete
        task.isCompleted.mockReturnValue(false); // Задача по умолчанию не завершена
        anotherTask.isCompleted.mockReturnValue(false); // Аналогично для второй задачи
    });

    it('user.assignTask - должен назначать задачу пользователю', () => {
        const isAssignedTask = user.assignTask(task);

        expect(user.tasks).toContain(task); // Проверяем, что задача была добавлена в массив задач
        expect(isAssignedTask).toBe(true); // Проверяем, что метод вернул true
    });

    it('user.assignTask - не должен назначать уже назначенную задачу', () => {
        user.assignTask(task); // Назначаем задачу
        const isAssignedAgain = user.assignTask(task); // Пытаемся назначить ту же задачу снова

        expect(isAssignedAgain).toBe(false); // Проверяем, что повторное назначение вернуло false
        expect(user.tasks.length).toBe(1); // Убедитесь, что задача добавлена только один раз
    });

    it('user.completeTask - должен завершить назначенную задачу', () => {
        user.assignTask(task);
        const isCompletedTask = user.completeTask(task);

        expect(task.complete).toHaveBeenCalled(); // Проверяем, что метод complete был вызван
        expect(isCompletedTask).toBe(true); // Проверяем, что метод вернул true
    });

    it('user.completeTask - не должен завершить неназначенную задачу', () => {
        const isCompletedTask = user.completeTask(task); // Пытаемся завершить задачу, которая не назначена

        expect(task.isCompleted()).toBe(false); // Проверяем, что задача не завершена
        expect(task.complete).not.toHaveBeenCalled(); // Убеждаемся, что метод complete не был вызван
        expect(isCompletedTask).toBe(false); // Проверяем, что метод вернул false
    });

    it('user.completeTask - не должен завершить задачу, если она уже завершена', () => {
        user.assignTask(task);
        task.isCompleted.mockReturnValue(true); // Задача уже завершена
        const isCompletedTask = user.completeTask(task);

        expect(task.complete).not.toHaveBeenCalled(); // Проверяем, что метод complete не вызван повторно
        expect(isCompletedTask).toBe(false); // Проверяем, что метод вернул false
    });

    it('user.assignTask и user.completeTask - должены корректно работать с несколькими задачами', () => {
        user.assignTask(task);
        user.assignTask(anotherTask);

        // Проверяем добавление нескольких задач
        expect(user.tasks).toContain(task);
        expect(user.tasks).toContain(anotherTask);

        // Завершаем первую задачу
        user.completeTask(task);
        expect(task.complete).toHaveBeenCalled(); // Первая задача завершена

        // Вторая задача не завершена
        expect(anotherTask.isCompleted()).toBe(false);
        expect(anotherTask.complete).not.toHaveBeenCalled(); // Проверяем, что complete не вызван для второй задачи
    });
});

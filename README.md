<h2>Пошаговый подход к проектированию и разработке в TypeScript: от взаимодействия до реализации с учётом тестирования</h2>

Разработка сложных систем требует планирования и структурированного подхода, чтобы избежать ошибок и облегчить тестирование. Один из таких подходов предполагает прохождение трёх ключевых этапов: взаимодействие, абстракции и реализация. На каждом этапе важно учитывать тестирование, чтобы убедиться, что система работает правильно.

<h3>Шаг 1: Уровень взаимодействия — прототипирование</h3>
На первом этапе мы сосредотачиваемся на том, как сущности будут взаимодействовать в системе, описывая сценарии использования на высоком уровне. Это помогает создать общее представление о будущей системе и её компонентах, не углубляясь в детали реализации.

Пример взаимодействия

Предположим, мы создаём систему управления задачами с двумя основными сущностями: User и Task. На этом этапе мы просто описываем, как пользователь будет взаимодействовать с задачами.

```ts
const user = new User('Alice');
const task = new Task('Complete project', 'High');

// Пользователь назначает задачу
user.assignTask(task);

// Пользователь выполняет задачу
user.completeTask(task);

// Проверяем, что задача выполнена
console.log(task.isCompleted()); // true
```

Этот пример помогает нам понять, как система должна работать с точки зрения взаимодействия, но ещё не определяет структуру данных или поведение.

На этом этапе тесты ещё не пишутся, так как у нас нет конкретной структуры данных или логики. Здесь мы определяем сценарии, которые будут протестированы на следующих этапах.

<h3>Шаг 2: Уровень абстракций — определение структуры и тестирование</h3>
На этом этапе мы начинаем проектировать структуру данных и поведение сущностей. Для этого удобно использовать интерфейсы, чтобы описать контракты между компонентами системы. На этом этапе также начинается тестирование, чтобы проверить взаимодействие сущностей с точки зрения их контрактов.

Пример абстракций:

Определим интерфейсы для сущностей User и Task:

```ts
interface IUser {
    name: string;
    tasks: ITask[];
    assignTask(task: ITask): boolean;
    completeTask(task: ITask): boolean;
}

interface ITask {
    title: string;
    priority: string;
    isCompleted(): boolean;
    complete(): void;
}
```

Эти интерфейсы описывают контракт для каждой сущности, и мы можем использовать их для тестирования взаимодействия.

<b>Тестирование на уровне абстракций (TDD)</b>

На этом этапе мы используем подход TDD (разработка через тестирование), при котором сначала пишутся тесты для желаемого поведения, а затем реализуются соответствующие функции. Это помогает убедиться, что каждая сущность работает так, как ожидается, ещё до полной реализации всех деталей.

На этом шаге тесты играют ключевую роль, так как они определяют сценарии использования системы и граничные условия. Мы создаём тесты на основе интерфейсов, проверяя, что все методы и взаимодействия между сущностями выполняются правильно. Такой подход позволяет выявить ошибки на ранних стадиях разработки и облегчает дальнейшую реализацию, гарантируя, что каждая функция работает корректно с самого начала.

TDD требует сначала определить, как сущности будут вести себя в различных ситуациях. Например, что произойдёт, если задача уже завершена, или как должен вести себя пользователь при назначении одной и той же задачи дважды. Тесты, написанные до реализации, направляют нас в создании кода, фокусируясь на правильности выполнения задач и снижая вероятность ошибок.

Определяем тестовые кейсы и граничные случаи для задач и пользователей, которые хотим протестировать.

Тестовые кейсы для задач:

- task.isCompleted - должна быть не завершена по умолчанию
- task.complete - должна завершить задачу

Тестовые кейсы для пользователей:

- user.assignTask - должен назначать задачу пользователю
- user.assignTask - не должен назначать уже назначенную задачу
- user.completeTask - должен завершить назначенную задачу
- user.completeTask - не должен завершить неназначенную задачу
- user.completeTask - не должен завершить задачу, если она уже завершена
- user.assignTask и user.completeTask - должены корректно работать с несколькими задачами

Пример тестов для задач:

```ts
describe('Задача', () => {
    let task: ITask;

    beforeEach(() => {
        task = new Task('Complete project', 'High');
    });

    it('task.isCompleted - должна быть не завершена по умолчанию', () => {
        const isCompleted = task.isCompleted();

        expect(isCompleted).toBe(false); // Проверяем, что задача не завершена до вызова complete (по умолчанию не завершена)
    });

    it('task.complete - должна завершить задачу', () => {
        task.complete();
        const isCompleted = task.isCompleted();

        expect(isCompleted).toBe(true); // Проверяем, что задача завершена после вызова complete
    });
});
```

Пример тестов для пользователей:

```ts
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
```

Моки позволяют изолировать логику и тестировать её независимо от полной реализации.

<h3>Шаг 3: Уровень реализации — создание классов</h3>
После того как абстракции и тесты определены, можно переходить к реализации классов, которые будут реализовывать интерфейсы.

Пример реализации классов:

```typescript
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
```

<b>Финальные тесты</b>

Теперь мы можем запускать те же тесты с настоящими классами. Тесты должны успешно пройти, подтверждая корректность реализации.

Перед началом разработки необходимо установить jest для выполнения тестов.

```bash
> test:coverage
> jest --coverage

 PASS  src/task/task.test.ts
 PASS  src/user/user.test.ts
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 |
 task           |     100 |      100 |     100 |     100 |
  task.class.ts |     100 |      100 |     100 |     100 |
 user           |     100 |      100 |     100 |     100 |
  user.class.ts |     100 |      100 |     100 |     100 |
----------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.735 s, estimated 2 s
Ran all test suites.
```

<h3>Заключение</h3>
Этот поэтапный подход — от взаимодействия к абстракциям и затем к реализации — помогает структурировать процесс разработки и уменьшить количество ошибок. Тестирование на этапе абстракций даёт возможность убедиться в корректности взаимодействия сущностей ещё до завершения полной реализации, а конечные тесты обеспечивают надёжность системы и упрощают её поддержку.

import { Task } from './task/task.class';
import { User } from './user/user.class';

const user = new User('Alice');
const task = new Task('Complete project', 'High');

// Пользователь назначает задачу
user.assignTask(task);

// Пользователь выполняет задачу
user.completeTask(task);

// Проверяем, что задача выполнена
console.log(task.isCompleted()); // true

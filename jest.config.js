/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: 'ts-jest', // Используем ts-jest для работы с TypeScript
    testEnvironment: 'node', // Указываем среду тестирования, например node
    moduleFileExtensions: ['ts', 'js'], // Поддерживаемые расширения файлов
    testMatch: ['**/*.test.ts'], // Шаблон для поиска тестовых файлов
    transform: {
        '^.+\\.ts$': 'ts-jest', // Используем ts-jest для трансформации TypeScript-файлов
    },
};

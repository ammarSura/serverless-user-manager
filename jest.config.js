module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/", "<rootDir>/src/tests/api/handlers", "<rootDir>/src/tests/db", "<rootDir>/src/tests/api/apiHandler.test.ts"]
}
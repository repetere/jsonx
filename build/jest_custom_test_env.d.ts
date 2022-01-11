import Environment from 'jest-environment-jsdom';
export default class CustomTestEnvironment extends Environment {
    setup(): Promise<void>;
}

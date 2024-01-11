export {};

declare global {
    interface Array<T> {
        isEmpty<T>(): boolean;
    }
}
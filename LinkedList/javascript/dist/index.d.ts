declare class LinkNode {
    next: LinkNode | undefined;
    previous: LinkNode | undefined;
    value: any;
    constructor(value: string, next: any, previous: any);
}
declare class LinkedList {
    head: LinkNode | undefined;
    tail: LinkNode | undefined;
    length: number;
    constructor(value: string);
    addHead(value: string): LinkedList;
    removeHead(): this;
    find(value: string): LinkNode | undefined;
    remove(value: string): this;
    addTail(value: string): LinkedList;
    removeTail(): LinkedList;
    print(): string;
}
declare const Link: LinkedList;

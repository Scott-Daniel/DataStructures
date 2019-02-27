class LinkNode {
    constructor(value, next, previous) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}
class LinkedList {
    constructor(value) {
        this.head = new LinkNode(value, undefined, undefined);
        this.tail = this.head;
        this.length = 1;
    }
    addHead(value) {
        const oldHead = this.head;
        const newNode = new LinkNode(value, oldHead, undefined);
        this.head = newNode;
        if (this.tail === undefined || this.tail.value === undefined) {
            this.tail = this.head;
        }
        if (this.tail && oldHead && this.tail.value === oldHead.value) {
            this.tail.previous = this.head;
        }
        if (this.head.next && this.head.next.previous === undefined) {
            this.head.next.previous = this.head;
        }
        this.length++;
        return this;
    }
    removeHead() {
        const oldHead = this.head;
        if (oldHead && oldHead.next) {
            this.head = oldHead.next;
            this.head.previous = undefined;
        }
        if (oldHead && this.tail && oldHead.value === this.tail.value) {
            this.tail = undefined;
        }
        this.length--;
        return this;
    }
    find(value) {
        if (this.head && value === this.head.value) {
            return this.head;
        }
        if (this.tail && value === this.tail.value) {
            return this.tail;
        }
        let found = undefined;
        if (this.head && this.head.next !== this.tail) {
            let node = this.head.next;
            while (node !== undefined) {
                if (node.value === value) {
                    found = node;
                    break;
                }
                else {
                    node = node.next;
                }
            }
        }
        return found;
    }
    remove(value) {
        if (this.head && this.head.value === value) {
            const oldHead = this.head;
            this.head = oldHead.next;
        }
        if (this.tail && this.tail.value === value) {
            const oldTail = this.tail;
            this.tail = oldTail.previous;
        }
        let found = undefined;
        if (this.head && this.head.next !== this.tail) {
            let node = this.head.next;
            while (node !== undefined) {
                if (node.value === value) {
                    found = node;
                    break;
                }
                else {
                    node = node.next;
                }
            }
        }
        if (found) {
            const prev = found.previous;
            const next = found.next;
            if (prev && next && found.next && found.previous) {
                found.next.previous = prev;
                found.previous.next = next;
            }
            found.next = next;
            this.length--;
        }
        return this;
    }
    addTail(value) {
        const oldTail = this.tail;
        if (oldTail) {
            this.tail = new LinkNode(value, undefined, oldTail);
            oldTail.next = this.tail;
        }
        this.length++;
        return this;
    }
    removeTail() {
        const oldTail = this.tail;
        if (oldTail) {
            this.tail = oldTail.previous;
            if (this.tail) {
                this.tail.next = undefined;
            }
            this.length--;
        }
        return this;
    }
    print() {
        let result = [];
        let temp = this.head;
        while (temp) {
            result.push(temp.value);
            temp = temp.next;
        }
        return result.join("\n => ");
    }
}
const Link = new LinkedList("Bob");
console.log("Starting a linked list", Link);
console.log("===================");
console.log("Adding onto linked list", Link.addHead("Harry"));
console.log("===================");
console.log("Removing from the head", Link.removeHead());
console.log("===================");
console.log("Adding onto linked list", Link.addHead("Misty"));
console.log("Adding onto linked list", Link.addHead("Phil"));
console.log("===================");
console.log("Find a node", Link.find("Misty"));
console.log("===================");
console.log("add tail", Link.addTail("Gary"));
console.log("===================");
console.log("Print list", Link.print());
console.log("===================");
console.log("Remove one", Link.remove("Misty"));
console.log("===================");
console.log("Remove Tail", Link.removeTail());
console.log("===================");
console.log("Print list", Link.print());
Link.addHead("fafa")
    .removeHead()
    .addHead("afafa")
    .addHead("afsa")
    .print();
//# sourceMappingURL=index.js.map
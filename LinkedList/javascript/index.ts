// This class holds each node's value, as-well as previous and next nodes
class LinkNode {
  next: LinkNode | undefined;
  previous: LinkNode | undefined;
  value: any;

  constructor(value: string, next: any, previous: any) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

class LinkedList {
  head: LinkNode | undefined;
  tail: LinkNode | undefined;

  length: number;

  constructor(value: string) {
    // Each Linked list starts with a genesis node
    this.head = new LinkNode(value, undefined, undefined);
    this.tail = this.head;

    this.length = 1;
  }

  addHead(value: string): LinkedList {
    const oldHead = this.head;

    const newNode = new LinkNode(value, oldHead, undefined);

    // Add the new node onto the head
    this.head = newNode;

    // Check if tail is undefined, if so just add the head to it
    if (this.tail === undefined || this.tail.value === undefined) {
      this.tail = this.head;
    }

    // Make sure tail has correct relation to previous node
    if (this.tail && oldHead && this.tail.value === oldHead.value) {
      this.tail.previous = this.head;
    }

    // If the head had any children, make sure the next one has
    // the correct previous reference
    if (this.head.next && this.head.next.previous === undefined) {
      this.head.next.previous = this.head;
    }

    this.length++;

    return this;
  }

  removeHead() {
    const oldHead = this.head;

    // Use previous head child as the new head, and remove
    // the previous reference
    if (oldHead && oldHead.next) {
      this.head = oldHead.next;
      this.head.previous = undefined;
    }

    // If both head and tail were the same node,
    // remove both to remove any lingering nodes
    if (oldHead && this.tail && oldHead.value === this.tail.value) {
      this.tail = undefined;
    }

    this.length--;

    return this;
  }

  find(value: string) {
    // Check if value equals head value, also O(1)
    if (this.head && value === this.head.value) {
      return this.head;
    }

    // Same but reversed, also O(1)
    if (this.tail && value === this.tail.value) {
      return this.tail;
    }

    let found = undefined;

    // Now we crawl through the list finding the value,
    // this is O(n), which isn't
    // the best but there are ways to help it like spliting
    // the list.
    if (this.head && this.head.next !== this.tail) {
      let node = this.head.next;

      while (node !== undefined) {
        if (node.value === value) {
          found = node;
          break;
        } else {
          node = node.next;
        }
      }
    }

    return found;
  }

  remove(value: string) {
    // Check if the head matches and change references
    if (this.head && this.head.value === value) {
      const oldHead = this.head;

      this.head = oldHead.next;
    }

    // Same as above, but for the tail
    if (this.tail && this.tail.value === value) {
      const oldTail = this.tail;

      this.tail = oldTail.previous;
    }

    let found: LinkNode | undefined = undefined;

    // Just a seach through the list, using the next reference
    if (this.head && this.head.next !== this.tail) {
      let node = this.head.next;

      while (node !== undefined) {
        if (node.value === value) {
          found = node;
          break;
        } else {
          node = node.next;
        }
      }
    }

    if (found) {
      // Keeping the old reference so we can use them
      // to change surronding nodes
      const prev = found.previous;
      const next = found.next;

      // Swapping references for both next and previous nodes
      if (prev && next && found.next && found.previous) {
        found.next.previous = prev;
        found.previous.next = next;
      }

      found.next = next;

      this.length--;
    }

    return this;
  }

  addTail(value: string): LinkedList {
    const oldTail = this.tail;

    if (oldTail) {
      this.tail = new LinkNode(value, undefined, oldTail);

      // Making sure the old tail has a next reference for
      // the new tail
      oldTail.next = this.tail;
    }

    this.length++;

    return this;
  }

  removeTail(): LinkedList {
    const oldTail = this.tail;

    if (oldTail) {
      // Referencing old tails previous node
      this.tail = oldTail.previous;

      if (this.tail) {
        // It's safe to remove the next reference in the
        // tail for obvious reasons.
        this.tail.next = undefined;
      }

      this.length--;
    }

    return this;
  }

  print() {
    let result: any[] = [];

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

// Also because we pass the class reference back,
// the above can look quite clean.

Link.addHead("fafa")
  .removeHead()
  .addHead("afafa")
  .addHead("afsa")
  .print();

// Only find and print don't pass back the LinkedList object.

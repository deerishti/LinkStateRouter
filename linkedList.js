class Node {
  constructor(id,cost) {
    this.id = id;
    this.cost = cost;
    this.next = null;
  }
};

class LinkedList {
  constructor() {
    this._length = 0;
    this.head = null;
  }
  add(id,cost) {
    var node = new Node(id,cost),
        currentNode = this.head;
    if (!currentNode) {
        this.head = node;
        this._length++;
        return node;
    }
    while (currentNode.next) {
        currentNode = currentNode.next;
        if (node.id = currentNode.id){
          console.log('Node already exists')
          return
        }
    }
    currentNode.next = node;
    this._length++;
    return this.head;
  }
  print() {
    console.log('Linked List:')
    let currentNode = this.head;
    if (!currentNode) {
        console.log('Empty list');
    }
    while (currentNode.next) {
        console.log('Node: id',currentNode.id,'cost',currentNode.cost);
        currentNode = currentNode.next;
    }
  }
};
global.LinkedList = LinkedList;

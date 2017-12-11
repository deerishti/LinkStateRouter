class Node {
  constructor(id,cost,name) {
    this.id = id;
    this.cost = cost;
    this.name = name;
    this.next = null;
  }
};

class LinkedList {
  constructor() {
    this._length = 0;
    this.head = null;
  }
  add(id,cost,name) {
    let node = new Node(id,cost,name),
        currentNode = this.head;
    if (!currentNode) {
        this.head = node;
        this._length++;
        return true;
    }
    while (currentNode.next) {
        currentNode = currentNode.next;
        if (node.id == currentNode.id){
          if (node.cost == currentNode.cost){
            // node already exists
            return false;
          }else{
            // update cost
            currentNode.cost = node.cost;
            return true;
          }
        }
    }
    currentNode.next = node;
    this._length++;
    return true;
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

class LSP {
    constructor(originID, seq) {
        this.origin_router_id = originID;
        this.sequence = seq;
        this.ttl = 10;
        this.listOfSinglyLists = []; // treating the list as an Array for now list of SinglyLists
    }
};

global.LSP = LSP;


class Node{
  constructor(id,cost) {
    this.id = id;
    this.cost = cost;
    this.next = null;
  }
}
class SinglyList() {
  constructor(){
    this._length = 0;
    this.head = null;
  }
  add(id,cost) {
    var node = new Node(id,cost),
        currentNode = this.head;

    // 1st use-case: an empty list
    if (!currentNode) {
        this.head = node;
        this._length++;

        return node;
    }

    // 2nd use-case: a non-empty list
    while (currentNode.next) {
        currentNode = currentNode.next;
    }

    currentNode.next = node;

    this._length++;

    return node;
};

searchNodeAt(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};

    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }

    return currentNode;
};

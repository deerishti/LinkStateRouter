class MinPriorityQueue{
    constructor() {
        this.items = [];
        this.n = 0;
        this.pos = [];
    }

    newNode(v,dist){
      return [v,dist];
    }

    swap(j, k) {
       let temp = this.items[j];
       this.items[j] = this.items[k];
       this.items[k] = temp;
    }

    isEmpty(){
        return this.n === 0;
    }

    getSize(){
        return this.n;
    }

    heapify(idx){
      let smallest = idx;
      let left = 2*idx + 1;
      let right = 2*idx + 2;

      if (left < this.n && this.items[left][1] <this.items[smallest][1]){
        smallest = left;
      }
      if (right < this.n && this.items[right][1] <this.items[smallest][1]){
        smallest = right;
      }

      if (smallest != idx){
          this.pos[this.items[smallest][0]] = idx;
          this.pos[this.items[idx][0]] = smallest;

          this.swapMinHeapNode(smallest, idx);
          this.heapify(smallest);
      }
    }

    deleteMin(){
      if(this.IsEmpty()) {
          return;
      }
      let root = this.items[0];

      let lastNode = this.items[this.n-1];
      this.items[0]=lastNode;

      this.pos[lastNode[0]]=0;
      this.pos[root[0]]=this.n-1
      this.n--;
      this.heapify(0);

      return root;
    }

   decreaseKey(v,dist){
     console.log(v);
     let i = this.pos[v];
     this.items[i][1] = dist;

     while (i>0 && this.items[i][1]<this.items[(i-1)/2][1]){
       this.pos[this.items[i][0]] = (i-1)/2;
       this.pos[this.items[(i-1)/2][0]] = i;
       this.swap(i,(i-1)/2);
       i = (i-1)/2;
     }
   }

   isInMinQueue(v){
     return this.pos[v]<this.n;
   }

};

global.MinPriorityQueue = MinPriorityQueue;

class Graph{
  constructor(verticies){
    // list of verticies
    this.V = verticies;
    // map with key of vertex id -> list of destinations and their cost
    this.graph = new Map();
  }
  // add edge from source -> destination and destination -> source
  addEdge(src,dest,cost){
    let newNode = [dest,cost];
    if (this.graph.has(src)) {
      this.graph.get(src).push(newNode);
    } else {
      this.graph.set(src, [newNode]);
    }

    newNode = [src,cost];
    if (this.graph.has(dest)) {
      this.graph.get(dest).push(newNode);
    } else {
      this.graph.set(dest, [newNode]);
    }
  }

  dijkstra(src){
    let V = this.V;
    console.log("This is V: " + V);
    let dist = [];
    // init with dist infinity to all except the source vertex
    let minHeap = new MinPriorityQueue();
    for(var v=0; v<V.length; v++){
      dist.shift(Infinity);
      //console.log("Node: " + minHeap.newNode(V[v],dist[v]));
      minHeap.items.push(minHeap.newNode(V[v],dist[v]));
      minHeap.pos.push(V[v]);
    }
    console.log("MinHeap Items: " + minHeap.items);
    minHeap.pos[src] = src;
    dist[src] = 0;
    minHeap.decreaseKey(src, dist[src]);

    minHeap.size = V.length;

    while (!minHeap.isEmpty){
      let newHeapNode = minHeap.deleteMin();
      let u = newHeadNode[0];
      for (pCrawl in self.graph.get(u)){
          let v = pCrawl[0];

          if (minHeap.isInMinHeap(v) && dist[u] != Infinity &&
          pCrawl[1] + dist[u] < dist[v]){
            dist[v] = pCrawl[1] + dist[u];
            minHeap.decreaseKey(v,dist[v])
          }
      }
    }
    return dist;
  }

}

global.Graph = Graph;

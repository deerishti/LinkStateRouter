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
      left = 2*idx + 1;
      right = 2*idx + 2;

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
      root = this.items[0];

      lastNode = this.items[this.n-1];
      this.items[0]=lastNode;

      this.pos[lastNode[0]]=0;
      this.pos[root[0]]=this.n-1

      this.n--;
      this.heapify(0);

      return root;
    }

   decreaseKey(v,dist){
     i = this.pos[v];
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

    toString() {
        let array = [];
        for (let index = 1; index < this.n + 1; index++) {
          array.push(this.items[index].weight);
        }
        return array;
    }
};

global.MinPriorityQueue = MinPriorityQueue;

class Graph{
  constructor(V){
    // number of verticies
    this.V = V;
    // map with key of vertex id -> list of destinations and their cost
    this.graph = new Map();
  }
  // add edge from source -> destination and destination -> source
  addEdge(src,dest,cost){
    newNode = [dest,cost];
    this.graph.set(src,this.graph.get(src).push(newNode));

    newNode = [src,cost];
    this.graph.set(dest,this.graph.get(dest).push(newNode));

  }

  dijkstra(src, adjacency_list){
    sptSet = new Map()
    V = this.V;
    dist = [];
    // init with dist infinity to all except the source vertex
    minHead = new MinPriorityQueue();
    for(var v=0; v<V; v++){
      if (src != V){
        dist.shift(Infinity);
      }else{
        dist.shift(0);
      }
      minHeap.insert({root:v,weight:dist[v]});
    }
    while (!minHeap.isEmpty){
      newHeapNode = minHeap.DeleteMin();
      u = newHeadNode[0];
      for pCrawl in self.graph.get(u){
          v = pCrawl[0];

          if minHeap.isInMinHeap(v) and dist[u] != Infinity and
          pCrawl[1] + dist[u] < dist[v]{
            dist[v] = pCrawl[1] + dist[u];
            minHeap.decreaseKey(v,dist[v])
          }
      }
    }
  }
}


global.Graph = Graph

require('./lsp.js');
require('./MinPriorityQueue.js');
require('./linkedList.js');

class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        this.sequence = 0;
        // a dictionary that stores references to other connected routers
        this.routing_table = new Map(); // key: router id, value: {cost, outgoing_link}
        this.direct_routers = new Map(); // key: router id, value: {initital_cost, last_packet_sequence}
    }

    originatePacket() {
        if (this.active) {
            let self = this;
            let packet = new LSP(this.id, this.sequence++);
            // call receive packet on each directly connected node
            this.direct_routers.forEach(function(router_details, router_id) {
                let router = arrRouters.get(router_id);
                let last_packet_sequence = router_details.last_packet_sequence;

                if (last_packet_sequence === 0 || Math.abs(last_packet_sequence - this.sequence) <= 2) {
                    router.receivePacket(packet, self.id);
                    console.log("Origin Router: " + self.id + "|| Next Router: " + router.id);
                }else{
                  self.routing_table.get(router_id).cost = Infinity;
                }
            });
            console.log('Now finding shortest routes to all connected.');
            if (packet.list.size >0 ){
              console.log(packet.list);
              let graph = new Graph(Array.from(packet.list.keys()))
              //let graph = new Graph(packet.list.keys);
              packet.list.forEach(function(linked_list, source_vertex) {
                let currentNode = linked_list.head;
                while (currentNode.next) {
                  console.log('Edge created between ',source_vertex,currentNode.id);
                  graph.addEdge(source_vertex,currentNode.id,currentNode.cost);
                  currentNode = currentNode.next;
                }
                console.log('Edge created between ',source_vertex,currentNode.id);
                graph.addEdge(source_vertex,currentNode.id,currentNode.cost);
            });
            console.log(graph.graph);
            let dist = graph.dijkstra(this.id);
            console.log(dist);
            }

      }
    }

    receivePacket(packet, id) {
      // only receive the packet if the router is active
      if (this.active) {
        // Send out LSP packet to all directly connected routers (but not the one it was sent from) if
        // (i) TTL > 0
        // and
        // (ii) no other packet with a higher sequence number was received from the sending router
                            // - I'm not sure what that means though and when that would be the case
        if (packet.ttl > 0 && this.direct_routers.get(id).last_packet_sequence < packet.sequence){
          // Decrement Time To Live of the received LSP
          packet.ttl--;
          // add itself to the linked list of routers on this packet
          if (!packet.list.get(id)){
            let new_packet_list = new LinkedList();
            packet.list.set(id,new_packet_list);
          };
          let edge_cost =this.routing_table.get(id).cost;
          packet.list.get(id).add(this.id,edge_cost);
          //decrement the tick of the received router id
          if (id == packet.origin_router_id){
            this.direct_routers.get(id).last_packet_sequence = packet.sequence;
          }
          let self = this;
          // send the pack to each of the directly connected routers
          this.direct_routers.forEach(function(value, router_id){
            if (router_id != id && router_id != packet.origin_router_id){
              arrRouters.get(router_id).receivePacket(packet,self.id);
            }
          });
        }
      }

    }
}
global.Router = Router;

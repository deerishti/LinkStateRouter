require('./lsp.js');
require('./MinPriorityQueue.js');
require('./linkedList.js');

class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        this.sequence_number = 1;
        // a dictionary that stores references to other connected routers
        this.routing_table = new Map(); // key: router id, value: {cost, outgoing_link}
        this.initial_routers = new Map(); // key: router id, value: {initital_cost}
        this.direct_routers = new Map(); // key: router id, value: {cost, last_packet_sequence}

        this.connected_routers = new Map(); // key router_id, value {network_name,last_packet_sequence}
        this.adjacency_list = new Map(); // key source_id, value {dest_id,cost}
    }

    originatePacket() {
        if (this.active) {
            let self = this;
            let packet = new LSP(this.id,this.network, this.sequence_number++, this.direct_routers);
            // call receive packet on each directly connected node
            this.direct_routers.forEach(function(router_details, router_id) {
                let router = arrRouters.get(router_id);
                let last_packet_sequence = router_details.last_packet_sequence;

                if (last_packet_sequence === 0 || Math.abs(last_packet_sequence - this.sequence_number) <= 2) {
                    router.receivePacket(packet, self.id);
                    console.log("Origin Router: " + self.id + "|| Next Router: " + router.id);
                }else{
                  router_details.cost = Infinity;
                }
            });
            console.log('Now finding shortest routes to all connected.');
            if (this.adjacency_list.size >0 ){
              console.log(this.adjacency_list);
              let graph = new Graph(Array.from(this.adjacency_list));
              this.adjacency_list.forEach(function(linked_list, source_vertex) {
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
        // Decrement Time To Live of the received LSP
        packet.ttl--;
        // Send out LSP packet to all directly connected routers (but not the one it was sent from) if
        // (i) TTL > 0
        // and
        // (ii) no other packet with a higher sequence number was received from the original sending router
        if (!this.connected_routers.get(packet.origin_router_id)){
          this.connected_routers.set(packet.origin_router_id,{'last_packet_sequence':0,'network_name':packet.network_str});
          this.adjacency_list.set(packet.origin_router_id,new LinkedList());
        };
        if (packet.ttl > 0 && this.connected_routers.get(packet.origin_router_id).last_packet_sequence < packet.sequence){
          let self = this;

          packet.list.forEach(function(value,router_id){
            // try and add to the routers adjacency_list
            self.adjacency_list.get(packet.origin_router_id).add(router_id,value.cost,value.network);
          });
          //update the last packet sequence of the origin router
          this.connected_routers.get(packet.origin_router_id).last_packet_sequence = packet.sequence;
          // send the packet to each of its directly connected routers but not the one it received it from
          this.direct_routers.forEach(function(value, router_id){
            if (router_id != id){
              arrRouters.get(router_id).receivePacket(packet,self.id);
            }
          });
        }
      }

    }
}
global.Router = Router;

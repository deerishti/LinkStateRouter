require('./lsp.js');
require('./MinPriorityQueue.js');

class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        this.sequence_number = 1;
        // a dictionary that stores references to other connected routers
        this.routing_table = new Map(); // key: router id, value: [{cost, outgoing_link}]
        this.directly_connected_routers = new Map(); // key: router id, value: [{directly connected edge, last packet sequence}]
    }

    originatePacket() {
        let self = this;
        this.sequence_number++;
        let packet = new LSP(this.id, this.sequence_number);
        // direct_nodes is an array
        let direct_nodes = this.network_graph.get(this.id);

        // call receive packet on each directly connected node
        direct_nodes.forEach(function(connctedRouter) {
            let router = arrRouters.get(connctedRouter.router_id);
            let last_packet_sequence = connctedRouter.last_packet_sequence;

            // check tick validity
            if (last_packet_sequence === 0 || Math.abs(last_packet_sequence - router.sequence_number) <= 2) {
                router.receivePacket(packet, self.id);
                console.log("Origin Router: " + self.id + "|| Next Router: " + router.id);
            }
        });
        console.log(packet.list);
        let graph = new Graph(packet.list.keys);
        packet.list.forEach(function(direct_connections, vertex_id){
          for (connection in direct_connections){
            console.log('Adding edge')
            console.log(vertex_id,direct_connections[connection].id,connection.id);
            graph.addEdge(vertex_id,
                          direct_connections[connection].id,
                          direct_connections[connection].cost);
          }
        });
        // let costs = graph.dijkstra(this.id);
        // console.log(costs);

    }
  }

    receivePacket(packet, id) {
      // only receive the packet if the router is active
      if (this.active) {
        // Decrement Time To Live of the received LSP
        console.log(this.id,'received packet from ',id);
        packet.ttl--;
        // Send out LSP packet to all directly connected routers (but not the one it was sent from) if
        // (i) TTL > 0
        // and
        // (ii) no other packet with a higher sequence number was received from the sending router
                            // - I'm not sure what that means though
                      console.log(      this.network_graph.get(id).last_packet_sequence);
                        console.log(    packet.sequence);
      //  if (packet.ttl > 0 && this.network_graph.get(id).last_packet_sequence < packet.sequence){
          console.log('in first if');
          // add itself to the list of routers on this packet
          packet.list.get(id).add(this.id,this.routing_table[id].cost);
          //decrement the tick of the received router id
          this.network_graph.get(id).last_packet_sequence = packet.sequence;
          let self = this ;
          // send the pack to each of the directly connected routers
          this.network_graph.forEach(function(value, router_id){
            if (router_id != id){
              console.log('in second if');
              arrRouters.get(router_id).receivePacket(packet,self.id);
            }
          });
      //  }
      }

    };
  }
global.Router = Router;

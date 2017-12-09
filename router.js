class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        // a dictionary that stores references to other "directly" connected routers
        this.routing_table = new Map(); // key: router id, value: {cost:x, tick:y, highest_lsp_seq:z}
        this.network_graph = new Map(); // key: router id (edge), value: an array of all directly connected edges
    }

    originatePacket() {
    }

    receivePacket(packet, id) {
      // only receive the packet if the router is active
      if this.active {
        // Decrement Time To Live of the received LSP
        packet.ttl--;
        // Send out LSP packet to all directly connected routers (but not the one it was sent from) if
        // (i) TTL > 0
        // and
        // TODO: add to if statement
        // (ii) no other packet with a higher sequence number was received from the sending router
                            // - I'm not sure what that means though
        if (packet.ttl > 0 && routing_table[id][highest_lsp_seq] < packet.sequence){
          // add itself to the list of routers on this packet
          packet.list[id].add(this.id,this.routing_table[id]['cost']);
          //decrement the tick of the received router id
          this.routing_table[id]['tick']--;
          // send the pack to each of the directly connected routers
          for router in routers_table{
            if routers_table[router].id != id{
              routers_table[router].receivePacket(packet,this.id);
            }
          }
        }
      }

    };

};

global.Router = Router;

class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        // a dictionary that stores references to other "directly" connected routers
        this.routing_table = new Map(); // key: router id, value: cost
        this.network_graph = new Map(); // key: router id (edge), value: an array of all directly connected edges
    }

    originatePacket() {
      if this.active {
        // TODO:
        // generate and send an LSP packet to all directly connected routers based on the current state of the network in the        Routing_Table


      }

    }

    receivePacket(packet, id) {
      // only receive the packet if the router is active
      if this.active {

        // Decrement TTL of LSP
        packet.ttl = packet.ttl -1
        // Send out LSP packet to all directly connected routers (but not the one it was sent from) if
        // (i) TTL > 0
        // and
        // TODO: add to if statement
        // (ii) no other packet with a higher sequence number was received from    the sending router
        if (packet.ttl > 0){
          for router in routers_table{
            if routers_table[router].id != id{
              routers_table[router].receivePacket(packet,this.id)

            }
          }
        }
      }

    }

};

global.Router = Router;

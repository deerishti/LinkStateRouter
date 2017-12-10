class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        this.sequence_number = 1;
        // a dictionary that stores references to other "directly" connected routers
        this.routing_table = new Map(); // key: router id, value: [{network_name, outgoing_link, cost}]
        this.network_graph = new Map(); // key: router id, value: [{directly connected edge, tick, highest_lsp_seq}]
    }

    originatePacket() {
      if (this.active){
        // TODO:
        // generate and send an LSP packet to all directly connected routers based on the current state of the network in the        Routing_Table
        let packet = new LSP(this.id, this.sequence_number);
        this.sequence_number++;
        this.network_graph.forEach(function(value, router_id){
            if (value.tick>2){
              packet.list.set(router_id,new SinglyList());
              value.tick--;
            }else{
              value.tick = 0;
              this.routing_table.get(router_id).cost = Infinity;
            }

        //  router.receivePacket(packet,router.id);
        });
        this.network_graph.forEach(function(value, router_id){
          arrRouters.get(router_id).receivePacket(packet,router_id);
        });
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
        // (ii) no other packet with a higher sequence number was received from the sending router
                            // - I'm not sure what that means though
        if (packet.ttl > 0 && network_graph.get(id).highest_lsp_seq < packet.sequence){
          // add itself to the list of routers on this packet
          packet.list.get(id).add(this.id,this.routing_table[id].cost);
          //decrement the tick of the received router id
          this.network_graph.get(id).tick--;
          this.network_graph.get(id).highest_lsp_seq = packet.sequence;
          // send the pack to each of the directly connected routers
          this.network_graph.forEach(function(value, router_id){
            if (router_id != id){
              arrRouters.get(router_id).receivePacket(packet,this.id);
            }
          });
        }
      }

    };

};

global.Router = Router;

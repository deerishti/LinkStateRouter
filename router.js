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
        this.direct_routers = new Map(); // key: router id, value: {initital_cost, last_packet_sequence}
    }

    originatePacket() {
        if (this.active) {
            let self = this;
            this.sequence_number++;
            let packet = new LSP(this.id, this.sequence_number);

            // call receive packet on each directly connected node
            this.direct_routers.forEach(function(router_details, router_id) {
                let router = arrRouters.get(router_id);
                let last_packet_sequence = router_details.last_packet_sequence;

                // check tick validity
                if (last_packet_sequence === 0 || Math.abs(last_packet_sequence - router.sequence_number) <= 2) {
                    router.receivePacket(packet, self.id);
                    console.log("Origin Router: " + self.id + "|| Next Router: " + router.id);
                }
            });
            console.log('All packets sent to directly connected routers.');
            console.log('Now finding shortest routes to all connected.');
            console.log(packet.list);
        }
    }

    receivePacket(packet, id) {
      // only receive the packet if the router is active
      if (this.active) {
        // Decrement Time To Live of the received LSP
        console.log(this.id,'received packet from ',id);
        console.log(packet.ttl);
        //TODO determine whether we should decrement ttl before or after checking for >0
        packet.ttl--;

        console.log('Last seq of packet from this router');
        console.log(this.direct_routers.get(id).last_packet_sequence);
        console.log('This packet seq');
        console.log(packet.sequence);
        // Send out LSP packet to all directly connected routers (but not the one it was sent from) if
        // (i) TTL > 0
        // and
        // (ii) no other packet with a higher sequence number was received from the sending router
                            // - I'm not sure what that means though and when that would be the case
        if (packet.ttl > 0 && this.direct_routers.get(id).last_packet_sequence < packet.sequence){
          console.log('');
          // add itself to the linked list of routers on this packet
          if (!packet.list.get(id)){
            let new_packet_list = new LinkedList();
            packet.list.set(id,new_packet_list);
          };
          let edge_cost =this.routing_table.get(id).cost;
          this.id,packet.list.get(id).add(this.id,edge_cost);
          console.log(packet.list.get(id).print());
          //decrement the tick of the received router id
          this.direct_routers.get(id).last_packet_sequence = packet.sequence;
          let self = this ;
          // send the pack to each of the directly connected routers
          this.direct_routers.forEach(function(value, router_id){
            if (router_id != id){
              console.log(self.id,'sending packet to ',router_id);
              arrRouters.get(router_id).receivePacket(packet,self.id);
            }
          });
        }
      }

    }
}
global.Router = Router;

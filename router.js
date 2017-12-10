require('./lsp.js');

class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        this.sequence_number = 1;
        // a dictionary that stores references to other connected routers
        this.routing_table = new Map(); // key: router id, value: {cost, outgoing_link}
        this.direct_routers = new Map(); // key: router id, value: {cost, last_packet_sequence}
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
                } else if (Math.abs(last_packet_sequence - router.sequence_number) > 2) {
                    self.direct_routers.get(router_id).cost = Infinity;
                }
            });
        }
    }

    receivePacket(packet, id) {
        // TODO:
        // Send out LSP packet to all directly connected routers if 
        // (i) TTL > 0
        // and
        // (ii) no other packet with a higher sequence number was received from the sending router
    }
};

global.Router = Router;
require('./lsp.js');

class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.active = true;
        this.sequence_number = 1;
        // a dictionary that stores references to other connected routers
        this.routing_table = new Map(); // key: router id, value: cost, path
        this.network_graph = new Map(); // key: router id, value: [{directly connected edge, last packet sequence}]
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
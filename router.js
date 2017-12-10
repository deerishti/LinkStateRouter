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
        this.sequence_number++;
        let packet = new LSP(this.id, this.sequence_number);
        let router_in_graph = this.network_graph.get(this.id);
        let direct_nodes = router_in_graph.values();
        
        while (!direct_nodes.next().done) {
            let direct_router = direct_nodes.next().value;
            direct_router.receivePacket(packet, this.id); 
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
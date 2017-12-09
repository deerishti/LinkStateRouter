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
        // TODO:  
        // generate and send an LSP packet to all directly connected routers based on the current state of the network in the        Routing_Table
        this.sequence_number++;
        let packet = new LSP(this.id, this.sequence_number);
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
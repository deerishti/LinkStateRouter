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
        // TODO:  
        // generate and send an LSP packet to all directly connected routers based on the current state of the network in the        Routing_Table
    }

    receivePacket(packet, id) {
        // TODO:
        // Send out LSP packet to all directly connected routers if 
        // (i) TTL > 0
        // and
        // (ii) no other packet with a higher sequence number was received from    the sending router
        
    }

};

global.Router = Router;
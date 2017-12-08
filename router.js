class Router {
    constructor(id, network) {
        this.id = id;
        this.network = network;
        this.routing_table = []; // could be implemented as  an adjacency matrix or adjacency list
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
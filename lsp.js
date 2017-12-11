class LSP {
    constructor(originID, network, seq,directly_connected_routers) {
        this.origin_router_id = originID;
        this.network_str = network;
        this.sequence = seq;
        this.ttl = 10;
        this.list = directly_connected_routers;  // key directly_connected_router, value {cost, network_name}
      }
};

global.LSP = LSP;

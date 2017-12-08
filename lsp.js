class LSP {
    constructor(originID) {
        this.origin_router_id = originID;
        this.sequence = 1;
        this.ttl = 10;
        this.list = []; // treating the list as an Array for now
    }
};

global.LSP = LSP;
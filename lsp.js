class LSP {
    constructor(originID, seq) {
        this.origin_router_id = originID;
        this.sequence = seq;
        this.ttl = 10;
        this.list = new Map(); // adjacence list with id as key and all directly connected following

    }
};

global.LSP = LSP;

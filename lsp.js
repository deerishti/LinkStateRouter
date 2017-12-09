class LSP {
    constructor(originID, sequence) {
        this.origin_router_id = originID;
        this.sequence_number = sequence;
        this.ttl = 10;
        this.list = []; // treating the list as an Array for now
    }
};

global.LSP = LSP;
require('./lsp.js');
require('./router.js');
let readline_sync = require("readline-sync");
let readline = require("linebyline");
const DEFAULT_COST = 1;
let arrRouters = new Map;
let router;

// method to bootstrap the App
let init = function () {
    readNetworkFile();
};

let readNetworkFile = function () {
    let networkFile = readline_sync.question("\nEnter network file path and name: ");
    let readStream = readline(networkFile).on("error", function () {
        console.log("\nFile " + networkFile + " not found!");
        readNetworkFile(); // keep calling recursively till user inputs a valid file
        return;
    });
    
    readStream.on('line', function (line, lineCount, byteCount) {
        let currLine = line.trim().replace(/\s+/g, ' '); // collapses multiple whitespaces to one
        let elements = currLine.split(" ");
        if (elements.length > 1 && isNaN(elements[1])) { // isNaN is to check if line contains network name
            if (router) {
                // add router to array of routers
                arrRouters.set(router.id, router);
            }
            router = new Router(elements[0], elements[1]);
        } else {
            router.routing_table.set(elements[0], elements[1] || DEFAULT_COST);
        }
    }).on('end', function() {
        // add last initialized router to array
        arrRouters.set(router.id, router);
        buildNetworkGraph();
    });
};

/*
// iterate through router array and 
    build each router's network graph
    */
let buildNetworkGraph = function() {
    arrRouters.forEach(function(router, router_id) {
        console.log('\n' + router_id);
        router.routing_table.forEach(function (value, key) {
            console.log(key + ' => ' + value);
        });
    });
};

init();
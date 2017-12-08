require('./lsp.js');
require('./router.js');
let readline_sync = require("readline-sync");
let readline = require("linebyline");
const DEFAULT_COST = 1;
let arrRouters = [];
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
                arrRouters.push(router);
            }
            router = new Router(elements[0], elements[1]);
        } else {
            router.routing_table.set(elements[0], elements[1] || DEFAULT_COST);
        }
    }).on('end', function() {
        // add last initialized router to array
        arrRouters.push(router);
        buildNetworkGraph();
    });

    /*
    // iterate through router array and 
       build each router's network graph
     */
    let buildNetworkGraph = function() {
       for (let i = 0; i < arrRouters.length; i++) {
           console.log('\n' + arrRouters[i].id);
           arrRouters[i].routing_table.forEach(function (value, key) {
               console.log(key + ' => ' + value);
           });
       }
    };
};

init();
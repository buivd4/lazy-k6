'use strict';
import * as k6_loader from "./loader.js";
import * as k6_writer from "./writer.js";

function build(input_file, output_file){
    let loader = new k6_loader.YamlLoader(input_file)
    let writer = new k6_writer.FileWriter(output_file)
    writer.write(loader.load())
}

function usage(){
    console.log("lazy-k6 <mode> <input> <output>")
    console.log("   - mode: build or batch-build")
}

function main(args){
    switch (args[0]){
        case "build":
            build(args[1], args[2])
            break
        case "batch-build":
            break
        default:
            usage()
    }
}

main(process.argv.slice(2))
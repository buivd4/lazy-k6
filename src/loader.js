import * as builder from "./builder/index.js";
export class JSONLoader{
    data
    constructor(data){
        this.data = data
    }
    load(){
        let script = new builder.script.Script()
        script.options = new builder.Options(this.data.options)
        this.data.scenarios.forEach((scenario,idx) => {
            let req = new builder.request.Request(idx, scenario.request.url, scenario.request.method)
            if (scenario.request.headers !== undefined){
                req.setHeader(scenario.request.headers)
            }
            if (scenario.request.body !== undefined){
                req.setBody(scenario.request.body)
            }
            let sce = new builder.script.Scenario(idx, req)
            script.addScenario(sce)          
        });
        return script
    }
    
}

const fs = require('fs');
const yaml = require('js-yaml');
export class YamlLoader extends JSONLoader{
    data
    constructor(file_path){
        super()
        let fileContents = fs.readFileSync(file_path, 'utf8')
        let data = yaml.load(fileContents)
        this.data = data
    }
}
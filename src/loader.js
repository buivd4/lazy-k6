import * as builder from "./builder/index.js";
import Threshold from "./builder/threshold.js";
export class JSONLoader{
    data
    constructor(data){
        this.data = data
    }
    load(){
        let script = new builder.Script()
        this.data.scenarios.forEach((scenario,idx) => {
            let req = new builder.request.Request(idx, scenario.url, scenario.method)
            if (scenario.headers !== undefined){
                req.setHeader(scenario.headers)
            }
            if (scenario.body !== undefined){
                req.setBody(scenario.body)
            }
            let sce = new builder.Scenario(idx, req)
            if (scenario.options!==undefined){
                if (scenario.options.executor!==undefined) sce.setExecutor(scenario.options.executor)
                if (scenario.options.gracefulStop!==undefined) sce.setGracefulStop(scenario.options.gracefulStop)
                if (scenario.options.stages!==undefined) sce.setStages(scenario.options.stages)
                if (scenario.options.gracefulRampDown!==undefined) sce.setGracefulRampDown(scenario.options.gracefulRampDown)
            }
            script.addScenario(sce)
        })
        if (this.data.thresholds === undefined) return script
        this.data.thresholds.forEach((threshold)=>{
            script.options.addThresholds(new Threshold(threshold.metric, threshold.statistics, threshold.condition, threshold.value, threshold.target_url, threshold.abortOnFail || false))
        })
        return script
    }
}

import * as fs from 'fs'
import * as yaml from 'js-yaml'

export class YamlLoader extends JSONLoader{
    data
    constructor(file_path){
        super()
        let fileContents = fs.readFileSync(file_path, 'utf8')
        let data = yaml.load(fileContents)
        this.data = data
    }
}
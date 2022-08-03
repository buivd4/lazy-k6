import * as constants from "./constants.js";

export default class Scenario {
    nth
    request
    executor = constants.DEFAULT_SCENARIO_EXECUTOR
    gracefulStop = constants.DEFAULT_SCENARIO_GRACEFUL_STOP
    stages = constants.DEFAULT_SCENARIO_STAGES
    gracefulRampDown = constants.DEFAULT_SCENARIO_GRACEFUL_RAMPDOWN

    constructor(nth, request){
        this.nth=nth
        this.request = request
    }
    setExecutor(executor){
        this.executor = executor
    }
    setGracefulStop(gracefulStop){
        this.gracefulStop = gracefulStop
    }
    setStages(stages){
        this.stages = stages
    }
    setGracefulRampDown(gracefulRampDown){
        this.gracefulRampDown = gracefulRampDown
    }
    getCanonicalName(){
        return `Scenario_${this.nth}`
    }
    getExecutorName(){
        return `scenario_${this.nth}`
    }
    generate(){
        return constants.SCENARIO_TEMPLATE.supplant({name: this.getExecutorName(), request: this.request.generate()})
    }
}
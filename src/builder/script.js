import * as constants from "./constants.js";
import Options from "./options.js";

export class Scenario {
    nth
    request
    constructor(nth, request){
        this.nth=nth
        this.request = request
    }
    generate(){
        return constants.SCENARIO_TEMPLATE.supplant({nth: this.nth, request: this.request.generate()})
    }
}
export class Script{
    options= new Options()
    scenarios=[]
    setOptions(options){
        this.options = options
    }
    addScenario(scenario){
        this.scenarios.push(scenario)
    }
    generate(){
        let scenarios = ""
        this.scenarios.forEach(scenario => {
            scenarios+= "\n" + scenario.generate()
        });
        return constants.SCRIPT_TEMPLATE.supplant({options: this.options.generate(), scenarios: scenarios})
    }
}
import * as constants from "./constants.js";
import Options from "./options.js";

export default class Script{
    options= new Options()
    scenarios=[]
    setOptions(options){
        this.options = options
    }
    addScenario(scenario){
        this.scenarios.push(scenario)
        this.options.addScenario(scenario)
    }
    generate(){
        let scenarios = ""
        this.scenarios.forEach(scenario => {
            scenarios+= "\n" + scenario.generate()
        });
        return constants.SCRIPT_TEMPLATE.supplant({options: this.options.generate(), scenarios: scenarios})
    }
}
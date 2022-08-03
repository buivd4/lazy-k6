import * as constants from "./constants.js";

export default class Options{
    scenarios = []
    thresholds = []
    addThresholds(threshold){
        this.thresholds.push(threshold)
    }
    addScenario(scenario){
        this.scenarios.push(scenario)
    }
    generate(){
        let thresholds = {}
        let scenarios = {}
        this.thresholds.forEach(threshold => {
            thresholds[threshold.metric] = threshold.generate()
        });
        this.scenarios.forEach(scenario => {
            scenarios[scenario.getCanonicalName()] = {
                executor: scenario.executor,
                gracefulStop: scenario.gracefulStop,
                stages: scenario.stages,
                gracefulRampDown: scenario.gracefulRampDown,
                exec: scenario.getExecutorName(),          
            }
        });
        let options = {
            thresholds: thresholds,
            scenarios: scenarios
        }
        return constants.OPTION_TEMPLATE.supplant({options: JSON.stringify(options, null, 4)})
    }
}
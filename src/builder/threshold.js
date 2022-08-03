export const constants = {
    metric:{
        RESPONSE_TIME: "http_req_duration"
    },
    statistics:{    
        PERC_99TH: "p(99)",
        PERC_95TH: "p(95)",
        PERC_90TH: "p(90)",
        PERC_50TH: "p(50)",
        MAX: "max",
        MEAN: "mean",
        MIN: "min",
        COUNT: "count",
        RATE: "rate"
    },
    condition:{
        LT: "<",
        LTE: "<=",
        GT: ">",
        GTE: ">=",
        EQ: "===",
        NEQ: "!==",
    }
}

export default class Threshold{
    metric
    target_url = undefined
    statistics
    condition
    value
    abortOnFail = false
    constructor(metric, statistics, condition, value, target_url = undefined, abortOnFail = false){
        this.metric = metric
        this.target_url = target_url
        this.statistics = statistics
        this.condition = condition
        this.value = value
        this.abortOnFail = abortOnFail
    }
    getConstrain(){
        if (this.target_url === undefined)
            return `${this.statistics}${this.condition}${this.value}`
        return  `${this.statistics}{url:${this.target_url}}${this.condition}${this.value}`
    }
    generate(){
        if (this.abortOnFail){
            return [{threshold: this.getConstrain(), abortOnFail: true}]
        }
        return [this.getConstrain()]
    }
}
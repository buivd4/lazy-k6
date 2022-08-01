import * as constants from "./constants.js";

export default class Options{
    options = {}
    constructor(options){
        this.options = options;
    }
    generate(){
        return constants.OPTION_TEMPLATE.supplant({options: JSON.stringify(this.options)})
    }
}
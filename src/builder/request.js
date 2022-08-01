import * as constants from "./constants.js"

export class Request{
    id
    method = constants.GET
    url = new RequestUrl()
    body = undefined
    param = undefined
    constructor(id, url, method){
        this.id = id
        this.url = new RequestUrl(url)
        this.method = method
    }
    setParam(param){
        this.param = param
    }
    setHeader(header){
        if(this.param === undefined){
            this.setParam(new RequestParam())
        }
        this.param.setHeader(header)
    }
    setBody(body){
        this.body = body
    }
    generate(){
        let output = ""
        let additional = ""
        let template
        switch (this.method) {
            case constants.GET:
                template = constants.REQ_GET_TEMPLATE;
                break;
            case constants.PUT:
                template = constants.REQ_PUT_TEMPLATE;
                break;
            case constants.POST:
                template = constants.REQ_POST_TEMPLATE;
                break;
            case constants.DELETE:
                template = constants.REQ_DELETE_TEMPLATE;
                break;
            default:
                template = constants.REQ_GET_TEMPLATE;
                break;
        }
        output += this.url.generate(this.id);
        if (this.body!==undefined && (this.method !== constants.GET)){
            output += this.body.generate(this.id)
            additional += `, ${constants.REQ_BODY_VARNAME}`.supplant({req_id: this.id})
        }
        if (this.param!==undefined){
            output += this.param.generate(this.id)
            additional += `, ${constants.REQ_PARAM_VARNAME}`.supplant({req_id: this.id})
        }
        output += template.supplant({req_id: this.id, additional_args:additional})
        // TODO: Add checks part
        return output
    }
}

export class RequestUrl{
    value = ""
    constructor(value){
        this.setValue(value)
    }
    setValue(value){
        this.value = value
    }
    generate(reqId){
        return constants.REQ_URL_TEMPLATE.supplant({req_id: reqId, value: this.value})
    }
}

export class RequestParam{
    // Default header is empty
    headers = {}
    constructor(headers){
        this.headers = headers;
    }
    setHeader(value){
        this.headers = value
    }
    generate(reqId){
        return constants.REQ_HEADER_TEMPLATE.supplant({req_id: reqId, headers: JSON.stringify(this.headers)})
    }
}

export class RequestBody{
    // Default body is empty
    value = {}
    constructor(value){
        this.value=value
    }
    setValue(value){
        this.value = value
    }
    generate(reqId){
        return constants.REQ_BODY_TEMPLATE.supplant({req_id: reqId, value: JSON.stringify(this.value)})
    }
}
// For string interpolation
String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

// HTTP methods
const GET = "GET"
const PUT = "PUT"
const POST = "POST"
const DELETE = "DELETE"

// Constants for script's variables naming
const REQ_BODY_VARNAME = "body_{req_id}"
const REQ_HEADER_VARNAME = "header_{req_id}"
const REQ_URL_VARNAME = "url_{req_id}"
const REQ_PARAM_VARNAME = "param_{req_id}"

/*
    Constants for code generating
*/
// For GET request
//      req_id: Id of the request
//      additional_args: Additional arguments
const REQ_GET_TEMPLATE = `
    const req_{req_id} = http.get(${REQ_URL_VARNAME}{additional_args});
`
// For PUT request
//      req_id: Id of the request
//      additional_args: Additional arguments
const REQ_PUT_TEMPLATE = `
    const req_{req_id} = http.put(${REQ_URL_VARNAME}{additional_args});
`
// For PATCH request
//      req_id: Id of the request
//      additional_args: Additional arguments
const REQ_PATCH_TEMPLATE = `
    const req_{req_id} = http.patch(${REQ_URL_VARNAME}{additional_args});
`
// For POST request
//      req_id: Id of the request
//      additional_args: Additional arguments
const REQ_POST_TEMPLATE = `
    const req_{req_id} = http.post(${REQ_URL_VARNAME}{additional_args});
`
// For DELETE request
//      req_id: Id of the request
//      additional_args: Additional arguments
const REQ_DELETE_TEMPLATE = `
    const req_{req_id} = http.delete(${REQ_URL_VARNAME}{additional_args});
`
// For request url
//      req_id: Id of the request
//      value: value of the body
const REQ_URL_TEMPLATE = `
    const ${REQ_URL_VARNAME} = {value};
`
// For request body
//      req_id: Id of the request
//      value: value of the body
const REQ_HEADER_TEMPLATE = `
    const ${REQ_PARAM_VARNAME} = { headers: {value} };
`
// For request body
//      req_id: Id of the request
//      value: value of the body
const REQ_BODY_TEMPLATE = `
    const ${REQ_BODY_VARNAME} = {value};
`

export default {
    GET, PUT, POST, DELETE,
    REQ_BODY_VARNAME, REQ_HEADER_VARNAME, REQ_URL_VARNAME, REQ_PARAM_VARNAME,
    REQ_GET_TEMPLATE, REQ_PUT_TEMPLATE, REQ_POST_TEMPLATE,REQ_DELETE_TEMPLATE,
    REQ_URL_TEMPLATE, REQ_BODY_TEMPLATE, REQ_HEADER_TEMPLATE
}
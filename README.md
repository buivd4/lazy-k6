# lazy-k6
A JS library for K6 script auto generator.

**Author**: buivd4 <br/>
**License**: MIT

## Installation

Install from source:

```shell
./lazy-k6> npm install
```

Run command:

```shell
./lazy-k6> lazy-k6 <mode> <input> <output>
   - mode: build or batch-build
```

For example:

```shell
./lazy-k6> lazy-k6 build ./examples/request.yml ./examples/request.js
Generated: examples/request.js
```


## Example
Input YAML file:

```yaml
# Created at Aug 03, 2022

thresholds:
  #Refer: https://k6.io/docs/using-k6/metrics/#http-specific-built-in-metrics
  - metric: http_req_duration
    statistics: "p(99)"
    condition: ">"
    value: 10

scenarios:
  - options:
      executor: ram-vu
      stages:
        - target: 20
          duration: '1m'
        - target: 20
          duration: '3m30s'
        - target: 0
          duration: '1m'
      gracefulRampDown: '20s'
    url: http://google.com
    method: GET
```

Auto-generated script:

```javascript
import { sleep, check } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'



export const options = {
    "thresholds": {
        "http_req_duration": [
            "p(99)>10"
        ]
    },
    "scenarios": {
        "Scenario_0": {
            "executor": "ram-vu",
            "gracefulStop": "30s",
            "stages": [
                {
                    "target": 20,
                    "duration": "1m"
                },
                {
                    "target": 20,
                    "duration": "3m30s"
                },
                {
                    "target": 0,
                    "duration": "1m"
                }
            ],
            "gracefulRampDown": "20s",
            "exec": "scenario_0"
        }
    }
}




export function scenario_0(){
    
    const url_0 = "http://google.com";

    const req_0 = http.get(url_0);

}



```

## Features
* Auto generate script from YAML/JSON


## Credit
* js-yaml
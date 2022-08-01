# lazy-k6
A JS library for K6 script auto generator.

**Author**: buivd4 <br/>
**License**: MIT

## Example
Input YAML file:

```yaml
options:
  ram_vu: 10

scenarios:
  - request:
      url: google.com
      method: GET
      headers:
        Test-X-Header: ahihi
  - request:
      url: google.com
      method: POST
      headers:
        Test-X-Header: XXXsss
```

Auto-generated script:

```javascript
import { sleep, check } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {"ram_vu":10}

export function scenario_0{
    
    const url_0 = google.com;

    const param_0 = { headers: {"Test-X-Header":"ahihi"} };

    const req_0 = http.get(url_0, param_0);

}

export function scenario_1{
    
    const url_1 = google.com;

    const param_1 = { headers: {"Test-X-Header":"XXXsss"} };

    const req_1 = http.post(url_1, param_1);

```

## Features
* Auto generate script from YAML/JSON


## Credit
* js-yaml
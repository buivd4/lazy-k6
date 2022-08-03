class Writer{
    write(data){
        throw new Error()
    }
}

import * as fs from 'fs'
export class FileWriter extends Writer{
    output_file
    constructor(output_file){
        super()
        this.output_file = output_file
    }
    write(script){
        fs.writeFile(this.output_file, script.generate(), ()=>{console.log(`Generated: ${this.output_file}`)})
    }
}

export class ConsoleWriter extends Writer{
    write(script){
        console.log(script.generate())
    }
}
class Writer{
    write(data){
        throw new Error()
    }
}

fs = require('fs');
export class FileWriter extends Writer{
    output_file
    constructor(output_file){
        super()
        this.output_file = output_file
    }
    write(script){
        fs.writeFile(this.output_file, script.generate())
    }
}

export class ConsoleWriter extends Writer{
    write(script){
        console.log(script.generate())
    }
}
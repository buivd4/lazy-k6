import * as  lazy_k6 from "lazy-k6"

let loader = new lazy_k6.loader.YamlLoader("./test/resources/request.yml")
let writer = new lazy_k6.writer.ConsoleWriter()
writer.write(loader.load())
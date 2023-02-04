import fs from 'fs';

const controllerPath = `/src/controllers/`

function createNewController(name) {
    if(!name) {
        console.error("Please provide a name for the controller.")
        return;
    }

    let controllerFileString = `
import Controller from './base.controller.js';
// Import the required models here!


// The controller. Put in here what you need.
class ${name}Controller extends Controller {

}

export default new ${name}Controller();

    `

    fs.open(process.cwd() + controllerPath + (name + '.controller.js'), 'w', (err, fd) => {
        if(err) {
            throw err
        }

        fs.writeFile(fd, controllerFileString, (err) => {
            if(err) {
                throw err
            }

        })
    })
}


createNewController(process.argv[2], process.argv[3])
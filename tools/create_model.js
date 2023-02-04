import fs from 'fs';

const modelPath = `/src/models/`


function createNewModel(name) {
    if(!name) {
        console.error("Please provide a name for the model.")
        return;
    }
    const modelString  =`
import Sequelize from 'sequelize';
import sequelize from '../database.js'

// Here we define the model.
const ${name} = sequelize.define('${name}', {

})

// All relations MUST be done in './relations.js'!

export default ${name}
`
    fs.open(process.cwd() + modelPath + (name + '.model.js'), 'w', (err, fd) => {
        if(err) {
            throw err
        }

        fs.writeFile(fd, modelString, (err) => {
            if(err) {
                throw err
            }

        })
    })
}

createNewModel(process.argv[2])
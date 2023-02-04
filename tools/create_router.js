import fs from 'fs';

const routerPath = `/src/routers/`

console.log(process.argv0)
function createNewRouter(name, mount) {
    // If params are not given, error out.
    if(!name || !mount) {
        console.error("Please provide a name and a mountpoint for the router.")
        return;
    }

    let routerFileString = `
import express from 'express';

// IMPORT YOUR CONTROLLER HERE!

// ============================

export const mount = '${mount}';
export const router = express.Router();

// Here you can create routes.

const Router = {
    mount: mount,
    router: router
}
export default Router
`

    fs.open(process.cwd() + routerPath + (name + '.router.js'), 'w', (err, fd) => {
        if(err) {
            throw err
        }

        fs.writeFile(fd, routerFileString, (err) => {
            if(err) {
                throw err
            }

        })
    })
}


createNewRouter(process.argv[2], process.argv[3])
import express from 'express'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import db from './database.js'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.static('public'))
app.use(cors({
    origin: '*'
}));

const routers:express.Router[] = [];

db.start({
	models: [
		await import('./models/Account.model.js'),
		await import('./models/Transaction.model.js'),
		await import("./models/Token.model.js")
	]
})

// Routing
function mountRouters() {
	console.log("\n==== Mounting Routers ===");
	let routerfolder = fs.readdirSync(path.join(process.cwd(), "dist/routers"));
	routerfolder.forEach(async element => {
		if(element.endsWith('.d.ts')) return;

		let router = await import(`./routers/${element}`);
		console.log(`Loaded Router: '${element}' on '${router.mount}'`);
		app.use(router.mount, router.router);
		routers.push(router);
	});
	console.log("==== Routers Mounted ====\n");
}


// Startup
mountRouters();
app.listen(80, () => {
	console.log(`${process.env.SERVER_NAME} running on ${process.env.SERVER_PORT}!`)
})
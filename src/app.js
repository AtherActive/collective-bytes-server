import express from 'express';
import session from 'express-session';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import SessionManager from './sessionManager.js';

dotenv.config();
const app = express();
let routers = [];

app.use(session(SessionManager.sess));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Always send userdata to the templating engine.
// This does NOT mean it is shown, just usable during templating.
app.use((req, res, next) => {
	res.locals.G_USER = req.session.user;
	res.locals.query = req.query;
	res.sitename = process.env.SITENAME;
	next();
})

nunjucks.configure('./src/templates', {
    autoescape: false,
    express: app,
	noCache: true
});

// Routing
function mountRouters() {
	console.log("\n==== Mounting Routers ===");
	let routerfolder = fs.readdirSync(path.join(process.cwd(), "/src/routers"));
	routerfolder.forEach(async element => {
		let router = await import(`./routers/${element}`);
		console.log(`Loaded Router: '${element}' on '${router.mount}'`);
		app.use(router.mount, router.router);
		routers.push(router);
	});
	console.log("==== Routers Mounted ====\n");
}


// Startup
mountRouters();
app.listen(process.env.SERVER_PORT, () => console.log(`${process.env.SERVER_NAME} running on ${process.env.SERVER_PORT}!`))
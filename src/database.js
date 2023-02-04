import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const sequelize =  new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	operatorsAliases: false,
});

setTimeout(async () => {
	// Import your models below.

    //

	const relations = await import('./models/relations.js');
	await sequelize.sync();

}, 1000);

export default sequelize
import { DatabaseConnection } from "./connection";
import { database } from "./databaseBuilder";
import { Student } from "./modelBuilder";

async function main() {
	const db = new DatabaseConnection({
		user: "postgres",
		host: "localhost",
		database: "CUSTOM-ORM",
		password: "postgres",
		port: 5432,
	});

	const createDatabase = database({
		models: [Student],
		connection: db,
	});

	try {
		const result = await db.getPool().query("SELECT 1 as ok");
		console.log("Connected:", result.rows[0].ok === 1);
	} catch (err) {
		console.error("Connection failed:", err);
	} finally {
		await db.close();
	}
}

main();

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

	try {
		const result = await db.getPool().query("SELECT 1 as ok");
		console.log("Connected:", result.rows[0].ok === 1);

		const orm = await database({
			connection: db,
			models: [Student],
			runMigrations: true,
		});

		console.log("Tables created. Models:", orm.models.length);
	} catch (err) {
		console.error("Connection failed:", err);
	} finally {
		await db.close();
	}
}

main();

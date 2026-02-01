import { DatabaseConnection } from "./connection";

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
		// or: const time = await db.getPool().query("SELECT now()");
		// console.log("Server time:", time.rows[0].now);
	} catch (err) {
		console.error("Connection failed:", err);
	} finally {
		await db.close();
	}
}

main();

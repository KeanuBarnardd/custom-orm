/** biome-ignore-all assist/source/organizeImports: <NA> */
import type { Model } from "./modelBuilder";
import { createTable } from "@datazod/zod-sql";
import type { DatabaseConnection } from "./connection";

export interface DatabaseBuilderOptions<T = unknown> {
	models: Model<T>[];
	connection: DatabaseConnection;
	/** If true, run CREATE TABLE (and indexes) against the connection. Default true. */
	runMigrations?: boolean;
}

export async function database<T>(options: DatabaseBuilderOptions<T>) {
	const { connection, models, runMigrations = true } = options;

	// Generate DDL for each model using @datazod/zod-sql.
	// zod-sql expects ZodObject (z.object({...})); our Model<T>.schema is ZodType<T>.
	const tableResults = models.map((model) =>
		createTable(
			model.tableName,
			model.schema as Parameters<typeof createTable>[1],
			{
				dialect: "postgres",
				primaryKey: "id",
			},
		),
	);

	if (runMigrations) {
		const pool = connection.getPool();
		for (const result of tableResults) {
			await pool.query(result.table);
			for (const indexSql of result.indexes) {
				await pool.query(indexSql);
			}
		}
	}

	return {
		models,
		connection,
	};
}

/** biome-ignore-all assist/source/organizeImports: <NA> */
import type { Model } from "./model-builder";
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

	if (runMigrations) {
		const pool = connection.getPool();
		const newTables = models.map((model) => {
			const table = createTable(
				model.tableName,
				model.schema as Parameters<typeof createTable>[1],
				{
					dialect: "postgres",
					primaryKey: "id", // TODO: Make this configurable
				},
			);

			return pool.query(table.table);
		});

		await Promise.all(newTables);
	}

	return {
		models,
		connection,
	};
}

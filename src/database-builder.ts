import { createTable } from "@datazod/zod-sql";
import type { DatabaseConnection } from "./connection";
import type { Model } from "./model-builder";
import { initModelQueryBuilder } from "./query-builder";

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

			console.log("STRUCTURE", table.structure);

			// Create our query builder for this model
			const modelQueryBuilder = initModelQueryBuilder(model, table.structure);
			return pool.query(table.table);
		});

		await Promise.all(newTables);
	}

	return {
		models,
		connection,
	};
}

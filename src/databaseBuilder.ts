/** biome-ignore-all assist/source/organizeImports: <NA> */
import type { Model } from "./modelBuilder";
import { createTable } from "@datazod/zod-sql";
import type { DatabaseConnection } from "./connection";

export interface DatabaseBuilder<T> {
	models: Model<T>[];
	connection: DatabaseConnection;
}

export function database<T>(options: DatabaseBuilder<T>) {
	// zod-sql expects ZodObject (z.object({...})); our Model<T>.schema is ZodType<T>.
	// We only use object schemas for tables, so this cast is safe at runtime.
	options.models.map((model) =>
		createTable(
			model.tableName,
			model.schema as Parameters<typeof createTable>[1],
			{
				dialect: "postgres",
				primaryKey: "id",
			},
		),
	);

	return {
		models: options.models,
		connection: options.connection,
	};
}

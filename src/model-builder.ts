import type { ZodType, z } from "zod";
import type { $ZodTypeInternals } from "zod/v4/core";

export type ModelOptions<T> = {
	tableName: string;
	schema: z.ZodType<T>;
};

export type Model<T> = {
	tableName: string;
	schema: ZodType<T, unknown, $ZodTypeInternals<T, unknown>>;
};

export function createModel<T>(options: ModelOptions<T>): Model<T> {
	return {
		tableName: options.tableName,
		schema: options.schema,
	};
}

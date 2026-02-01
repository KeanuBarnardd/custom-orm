import { z, type ZodType } from "zod";
import { $ZodTypeInternals } from "zod/v4/core";

export type ModelOptions<T> = {
	tableName: string;
	schema: z.ZodType<T>;
};

export type Model<T> = {
	tableName: string;
	schema: ZodType<T, unknown, $ZodTypeInternals<T, unknown>>;
};

export function createModel<T>(options: ModelOptions<T>): Model<T> {
	const { tableName, schema } = options;
	return {
		tableName,
		schema,
	};
}

export const Student = createModel({
	tableName: "students",
	schema: z.object({
		id: z.number().int(),
		name: z.string(),
		age: z.number().int(),
		email: z.email(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
});

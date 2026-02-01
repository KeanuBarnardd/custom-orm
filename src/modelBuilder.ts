import { z } from "zod";

export type ModelOptions<T> = {
	tableName: string;
	schema: z.ZodType<T>;
};

export type SafeParseResult<T> =
	| { success: true; data: T }
	| { success: false; error: z.ZodError };

export type Model<T> = {
	tableName: string;
	schema: z.ZodType<T>;
};

export function createModel<T>(options: ModelOptions<T>): Model<T> {
	const { tableName, schema } = options;
	return {
		tableName,
		schema,
	};
}

const Student = createModel({
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

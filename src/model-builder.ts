import type { ZodType, z } from "zod";
import type { $ZodTypeInternals } from "zod/v4/core";

// Condition shape used by column refs and the query builder
export type Condition = {
	column: string;
	operator: "=" | "!=" | ">" | "<" | ">=" | "<=";
	value: unknown;
};

export type ColumnRef = {
	equals(value: unknown): Condition;
	notEquals(value: unknown): Condition;
	greaterThan(value: unknown): Condition;
	lessThan(value: unknown): Condition;
	greaterThanOrEqual(value: unknown): Condition;
	lessThanOrEqual(value: unknown): Condition;
};

function createColumnRef(columnName: string): ColumnRef {
	return {
		equals(value) {
			return { column: columnName, operator: "=", value };
		},
		notEquals(value) {
			return { column: columnName, operator: "!=", value };
		},
		greaterThan(value) {
			return { column: columnName, operator: ">", value };
		},
		lessThan(value) {
			return { column: columnName, operator: "<", value };
		},
		greaterThanOrEqual(value) {
			return { column: columnName, operator: ">=", value };
		},
		lessThanOrEqual(value) {
			return { column: columnName, operator: "<=", value };
		},
	};
}

// Schema with a .shape (ZodObject) so we can get column names
type SchemaWithShape = z.ZodType<unknown> & { shape?: Record<string, unknown> };

function getColumnNames(schema: SchemaWithShape): string[] {
	const shape = schema.shape;
	if (!shape || typeof shape !== "object") return [];
	return Object.keys(shape);
}

export type ModelOptions<T> = {
	tableName: string;
	schema: z.ZodType<T>;
};

export type Model<T> = {
	tableName: string;
	schema: ZodType<T, unknown, $ZodTypeInternals<T, unknown>>;
	columns: string[];
} & { [K in keyof T]: ColumnRef };

export function createModel<T extends Record<string, unknown>>(
	options: ModelOptions<T>,
): Model<T> {
	const { tableName, schema } = options;
	const columnNames = getColumnNames(schema as SchemaWithShape);
	const columns = columnNames;
	const refs = Object.fromEntries(
		columnNames.map((col) => [col, createColumnRef(col)]),
	) as { [K in keyof T]: ColumnRef };

	return {
		tableName,
		schema,
		columns,
		...refs,
	} as Model<T>;
}

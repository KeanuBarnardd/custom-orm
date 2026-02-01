// This will need to be a function that takes a model and returns the query builder for that model

import type { TableStructure } from "@datazod/zod-sql";
import type { Model } from "./model-builder";

export function initModelQueryBuilder<T>(
	model: Model<T>,
	tableStructure: TableStructure,
) {
	const conditions: Array<(item: T) => boolean> = [];

	const builder = {
		where(predicate: (item: T) => boolean) {
			conditions.push(predicate);
			return builder; // same object with .where and .toArray
		},
		toArray() {
			return [];
		},
	};

	return builder;
}

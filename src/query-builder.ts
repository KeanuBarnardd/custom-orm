// This will need to be a function that takes a model and returns the query builder for that model

import { Model } from "./model-builder";
import { Student } from "./test-models";

export function initModelQueryBuilder<T>(model: Model<T>) {
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

initModelQueryBuilder(Student)
	.where((s) => s.age < 10)
	.where((s) => s.age > 18)
	.toArray();

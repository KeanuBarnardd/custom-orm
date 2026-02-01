// This will need to be a function that takes a model and returns the query builder for that model

import type { TableStructure } from "@datazod/zod-sql";
import type { Condition, Model } from "./model-builder";

export type { Condition };

export function initModelQueryBuilder<T>(
	model: Model<T>,
	tableStructure: TableStructure,
) {}

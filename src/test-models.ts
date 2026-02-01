import z from "zod";
import { createModel } from "./model-builder";

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

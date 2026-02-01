import { DatabaseConnection } from "./connection";
import { Model } from "./modelBuilder";

export interface DatabaseBuilder<T> {
	models: Model<T>[];
	connection: DatabaseConnection;
}

export function database<T>(): DatabaseBuilder<T> {
	return {
		models: [],
		connection: new DatabaseConnection({
			user: "postgres",
			host: "localhost",
			database: "CUSTOM-ORM",
			password: "postgres",
			port: 5432,
		}),
	};
}

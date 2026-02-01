import { Pool, type PoolConfig } from "pg";

export class DatabaseConnection {
	private pool: Pool;

	constructor(config: PoolConfig) {
		this.pool = new Pool(config);
	}

	async close() {
		await this.pool.end();
	}

	getPool() {
		return this.pool;
	}
}

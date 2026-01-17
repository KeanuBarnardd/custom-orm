import { DatabaseConnection } from "./connection";

async function main() {
  const db = new DatabaseConnection({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
  })
}
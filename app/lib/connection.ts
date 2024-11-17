import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db:  Database | undefined;

export async function getDBConnection(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (!db) {
    db = await open({
      filename: "./db/starred.db",
      driver: sqlite3.Database,
    });
    console.log('Connection with SQLite has been established')
  }
  return db;
}
export async function fetchUsers() {
  try {
    const connection = await getDBConnection();

    const users = await connection.all("SELECT * FROM USER");
      console.log('Users fetched' + JSON.stringify(users));
      return users;
  } catch (error) {
    throw new Error('Failed to fetch user data.' + error);
  }
}






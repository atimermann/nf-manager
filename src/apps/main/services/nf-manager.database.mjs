/**
 * Created on 07/09/23
 *
 * src/apps/main/services/nf-manager.database.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 */
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import SQL from 'sql-template-strings'

/**
 * Class to facilitate SQLite database management in the project.
 *
 * Aims to simplify database management and structure, avoiding the necessity for migrations,
 * model creations, installing external services like a DBMS, or executing scripts. It is designed
 * to streamline and automate processes like database creation through code using SQLite. If a more
 * complex structure becomes necessary, there's the option to migrate to a more robust database like
 * PostgreSQL or to use Prisma with migration support.
 */
export default class NfManagerDatabase {
  static db
  /**
   * Initializes the database by opening a connection to SQLite.
   *
   * @static
   * @async
   * @returns {Promise<void>}
   */
  static async initDatabase () {
    this.db = await open({
      filename: './storage/nfmonitor.sqlite.db',
      driver: sqlite3.cached.Database
    })
  }

  /**
   * Creates the necessary tables in the database if they do not already exist.
   *
   * @static
   * @async
   * @returns {Promise<void>}
   */
  static async createTables () {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS jobError (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid VARCHAR(32),
        jobName TEXT,
        worker TEXT,
        jobInstance INTEGER,
        errorTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        errorDescription TEXT,
        note TEXT
      );
    `)

    await this.db.exec('CREATE INDEX IF NOT EXISTS uuid_index ON jobError (uuid);')
  }

  /**
   * Adds a process error to the database and returns the data that was just inserted.
   *
   * @static
   * @async
   * @param {object} jobProcess - The job process containing details about the error.
   * @returns {Promise<object>} - The process error data that was added to the database.
   */
  static async addProcessError (jobProcess) {
    await this.db.run(
      SQL`INSERT INTO jobError (uuid, jobName, worker, jobInstance, errorDescription)
    VALUES (${jobProcess.worker.job.uuid}, ${jobProcess.worker.job.name}, ${jobProcess.worker.name}, ${jobProcess.id}, ${jobProcess.errorsMessage.join('\n')});`
    )

    return await this.db.get(
      SQL`SELECT * FROM jobError WHERE uuid = ${jobProcess.worker.job.uuid} ORDER BY errorTimestamp DESC LIMIT 1;`
    )
  }

  /**
   * Retrieves all records associated with a specific UUID.
   *
   * @static
   * @async
   * @param {string} uuid - The UUID to fetch records for.
   * @returns {Promise<Array<object>>} - A list of records associated with the provided UUID.
   */
  static async getRecordsByUUID (uuid) {
    return await this.db.all(SQL`SELECT * FROM jobError WHERE uuid = ${uuid}`)
  }

  /**
   * Retrieves the count of records associated with a specific UUID in the jobError table.
   *
   * @static
   * @async
   * @param {string} uuid - The UUID to fetch records count for.
   * @returns {Promise<number>} - The count of records associated with the provided UUID.
   */
  static async getJobErrorCountByUUID (uuid) {
    const result = await this.db.get(SQL`SELECT COUNT(*) AS count FROM jobError WHERE uuid = ${uuid}`)
    return result.count
  }
}

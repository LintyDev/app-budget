import connectDatabase from "@/lib/datasource";
import { InputLog, Log } from "@/types/logs";
import { SQLiteDatabase } from "expo-sqlite"

class ActivitiesServices {
  db: SQLiteDatabase;

  constructor() {
    this.db = connectDatabase();
  }

  addLog(data: InputLog) : Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO ActivitiesLogs (type, description, date, amount, transaction_type, remainingAmount, categoryId)
            values (?, ?, ?, ?, ?, ?, ?)`,
          [data.type, data.description, data.date, data.amount, data.transaction_type, data.remainingAmount, data.categoryId],
          (_, result) => {
            if (result.rowsAffected > 0 && result.insertId) {
              resolve(result.insertId);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return true;
          }
        )
      })
    });
  };

  getLogs() : Promise<Log[] | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ActivitiesLogs`,
          [],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows._array);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return true;
          }
        )
      });
    });
  }
}

export default ActivitiesServices;
import connectDatabase from "@/lib/datasource";
import { AccountState, InputAccount } from "@/types/accounts";
import * as SQLite from "expo-sqlite";

class AccountsService {
  db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = connectDatabase();
  }

  createAccount(data: InputAccount) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Accounts (name, currentAmount, initalAmount, currentMonthYear, countCategories) 
            values (?, ?, ?, ?, ?)`,
          [data.name, data.currentAmount, data.initalAmount, data.currentMonthYear, data.countCategories],
          (_, result) => {
            console.log(result);
            if (result.rowsAffected > 0) {
              resolve(true);
            } else {
              resolve(false);
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

  getAccount(id: number) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Accounts WHERE id = ?',
          [id],
          (_, result) => {
            resolve(result.rows._array as unknown as AccountState);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        )
      });
    });
  }

  updateAccount(id: number, data: any) {

  }

  deleteAccount(id: number) {

  }
}

export default AccountsService;
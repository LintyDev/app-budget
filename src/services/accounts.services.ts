import connectDatabase from "@/lib/datasource";
import Account, { AccountState, InputAccount, InputIncome } from "@/types/accounts";
import * as SQLite from "expo-sqlite";
import ActivitiesServices from "./activities.services";

class AccountsService {
  db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = connectDatabase();
  }

  // ACCOUNT FUNCTION
  createAccount(data: InputAccount) : Promise<null | number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Accounts (name, currentAmount, initalAmount, currentMonthYear, countCategories) 
            values (?, ?, ?, ?, ?)`,
          [data.name, data.currentAmount, data.initalAmount, data.currentMonthYear, data.countCategories],
          async (_, result) => {
            console.log('result createAccount : ', result);
            if (result.rowsAffected > 0 && result.insertId) {
              // insert activites logs
              try {
                const date = new Date();
                const addActivitiesLogs = await new ActivitiesServices().addLog({
                  type: 'add_account',
                  description: `Création du compte : ${data.name}`,
                  date: date.toLocaleDateString(),
                  amount: null,
                  transaction_type: null,
                  remainingAmount: null,
                  categoryId: null
                });
                if(addActivitiesLogs) {
                  resolve(result.insertId);
                } else {
                  resolve(null);
                }
              } catch (error) {
                reject(error);
              }
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

  getAccountById(id: number) : Promise<Account | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Accounts WHERE id = ?',
          [id],
          (_, result) => {
            console.log('result getAccountById : ', result);
            if (result.rows.length > 0) {
              resolve(result.rows._array[0] as unknown as Account);
            }
            resolve(null);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        )
      });
    });
  }

  getAccount() : Promise<Account[] | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Accounts',
          [],
          (_, result) => {
            console.log('result getAccount : ', result);
            if (result.rows.length > 0) {
              resolve(result.rows._array as unknown as Account[])
            }
            resolve(null);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        )
      });
    });
  }

  updateAccount(id: number, data: InputAccount) : Promise<null | Account> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE Accounts 
            SET name = ?, currentAmount = ?, initalAmount = ?, currentMonthYear = ?, countCategories = ?
            WHERE id = ?`,
          [data.name, data.currentAmount, data.initalAmount, data.currentMonthYear, data.countCategories, id],
          (_, result) => {
            console.log('result updateAccount', result);
            if (result.rowsAffected > 0) {
              const sendData = {...data, id}
              resolve(sendData);
            }
            resolve(null);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        )
      });
    });
  }

  deleteAccount(id: number) {

  }

  // INCOME FUNCTION
  addIncome(data: InputIncome) : Promise<null | number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Income (description, monthYear, amount, recursive, accountId)
            values (?, ?, ?, ?, ?)`,
          [data.description, data.monthYear, data.amount, data.recursive, data.accountId],
          (_, result) => {
            console.log('result addIncome : ', result);
            if (result.rowsAffected > 0 && result.insertId) {
              // insert activities logs (maybe later because we need some informations)
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
      });
    });
  }

}

export default AccountsService;
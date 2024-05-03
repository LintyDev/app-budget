import connectDatabase from "@/lib/datasource";
import { SQLiteDatabase } from "expo-sqlite";
import CategoriesService from "./categories.services";
import ActivitiesServices from "./activities.services";
import { Expense, InputExpense } from "@/types/accounts";

class ExpensesService {
  db: SQLiteDatabase
  date: Date;

  constructor() {
    this.db = connectDatabase();
    this.date = new Date();
  }

  addExpense(data: InputExpense, remainingAmountAcc: number, remainAmountCat: number) :  Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Expense (description, amount, monthYear, date, categoryId, accountId)
            values (?, ?, ?, ?, ?, ?)`,
          [data.description, data.amount, data.monthYear, this.date.toLocaleDateString(), data.categoryId, data.accountId],
          async (_, result) => {
            if (result.rowsAffected > 0 && result.insertId) {
              const date = new Date();
              try {
                const updateCat = await new CategoriesService().updateAmountCategory(data.categoryId, remainAmountCat);
                const addActivitiesLogs = await new ActivitiesServices().addLog({
                  type: 'transaction_expense',
                  description: `Dépense : ${data.description}`,
                  date: date.toLocaleDateString(),
                  amount: data.amount,
                  transaction_type: null,
                  remainingAmount: remainingAmountAcc,
                  categoryId: data.categoryId
                });
                if (addActivitiesLogs && updateCat) {
                  resolve(result.insertId);
                }
                resolve(null);
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

  getExpensesByCatId(catId: number) : Promise<null | Expense[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Expense
            WHERE categoryId = ?`,
          [catId],
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
        );
      });
    });
  }

  getMonthlyExpensesByCatId(catId: number, monthYear: string) : Promise<null | Expense[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Expense
            WHERE categoryId = ? AND monthYear = ?`,
          [catId, monthYear],
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
        );
      });
    });
  }
}

export default ExpensesService;
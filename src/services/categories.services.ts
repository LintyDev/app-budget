import connectDatabase from "@/lib/datasource";
import Category, { InputCategory } from "@/types/categories";
import { SQLiteDatabase } from "expo-sqlite";
import ActivitiesServices from "./activities.services";

class CategoriesService {
  db: SQLiteDatabase;

  constructor() {
    this.db = connectDatabase()
  }

  addCategory(data: InputCategory) : Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Category (name, color, amountAllocated, currentAmount, accountId)
            values (?, ?, ?, ?, ?)`,
          [data.name, data.color, data.amountAllocated, data.currentAmount, data.accountId],
          async (_, result) => {
            if (result.rowsAffected > 0 && result.insertId) {
              // insert activities logs
              try {
                const date = new Date();
                const addActivitiesLogs = await new ActivitiesServices().addLog({
                  type: 'add_category',
                  description: `Ajout de la catégorie : ${data.name}`,
                  date: date.toLocaleDateString(),
                  amount: null,
                  transaction_type: null,
                  remainingAmount: null,
                  categoryId: result.insertId
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
        );
      });
    });
  }

  getCategories() : Promise<Category[] | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Category`,
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
      })
    })
  }

  countAllocated(id: number) : Promise<null | {allAmountAllocated: number}> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT SUM(amountAllocated) as allAmountAllocated
            FROM Category
            WHERE accountId = ?`,
          [id],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows._array[0]);
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
    })
  }

  getCategory(id: number) {

  }
}

export default CategoriesService;
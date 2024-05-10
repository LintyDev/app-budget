import connectDatabase from "@/lib/datasource";
import Category, { CategoryWithExpenses, InputCategory } from "@/types/categories";
import { SQLiteDatabase } from "expo-sqlite";
import ActivitiesServices from "./activities.services";

class CategoriesService {
  db: SQLiteDatabase;
  date: Date;

  constructor() {
    this.db = connectDatabase();
    this.date = new Date();
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

  updateAmountCategory(id: number, newAmount: number) : Promise<null | true>{
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE Category
            SET currentAmount = ?
            WHERE id = ?`,
          [newAmount, id],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(true);
            } else {
              resolve(null)
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

  getCategory(id: number) : Promise<null | CategoryWithExpenses> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Category
            WHERE id = ?`,
          [id],
          async (_, result) => {
            if (result.rows.length > 0) {
              const category = result.rows.item(0) as Category;
              // const getExpense = await new AccountsService().getExpensesByCatId(catId);
              resolve({...category, expenses: null});
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

  updateCategory(data: Category) : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE Category
            SET name = ?, color = ?, amountAllocated = ?, currentAmount = ?, accountId = ?
            WHERE id = ?`,
          [data.name, data.color, data.amountAllocated, data.currentAmount, data.accountId, data.id],
          async (_, result) => {
            if (result.rowsAffected > 0) {
              await new ActivitiesServices().addLog({
                type: 'update_category',
                description: `Modification : ${data.name}`,
                date: this.date.toLocaleDateString(),
                amount: null,
                transaction_type: null,
                remainingAmount: null,
                categoryId: data.id
              });
              resolve(true);
            } else {
              resolve(false);
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

  updateCategoryForExpense(data: Category) : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE Category
            SET name = ?, color = ?, amountAllocated = ?, currentAmount = ?, accountId = ?
            WHERE id = ?`,
          [data.name, data.color, data.amountAllocated, data.currentAmount, data.accountId, data.id],
          async (_, result) => {
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
        );
      });
    });
  }

  deleteCategory(id: number, name: string, amount: number) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM Category
            WHERE id = ?`,
          [id],
          async (_, result) => {
            if (result.rowsAffected > 0) {
              await new ActivitiesServices().addLog({
                type: 'delete_category',
                description: `Suppression : ${name}`,
                date: this.date.toLocaleDateString(),
                amount: amount,
                transaction_type: 'income_after_delete_cat',
                remainingAmount: null,
                categoryId: id
              });
              resolve(true);
            } else {
              resolve(false);
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

export default CategoriesService;
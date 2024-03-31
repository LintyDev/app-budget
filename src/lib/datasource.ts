import * as SQLite from "expo-sqlite";

export const connectDatabase = (): SQLite.SQLiteDatabase => {
  const db = SQLite.openDatabase("budget-app.sqlite");

  return db;
};

export const createTables = () => {
  console.log("create tables");
  const userTable = `
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      avatarId TEXT NOT NULL
    )
  `;

  const categoryTable = `
    CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      subcat TEXT DEFAULT null,
      amountAllocated NUMERIC DEFAULT null,
      currentAmount NUMERIC NOT NULL,
      recursive NUMERIC NOT NULL
    )
  `;

  const transactionTable = `
    CREATE TABLE IF NOT EXISTS TransactionTable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount NUMERIC NOT NULL,
      date NUMERIC NOT NULL,
      type TEXT NOT NULL,
      categoryId INTEGER NOT NULL,
      FOREIGN KEY(categoryId) REFERENCES Category(id)
    )
  `;

  const monthlyBalanceTable = `
    CREATE TABLE IF NOT EXISTS MonthlyBalance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT NOT NULL,
      initialAmount NUMERIC NOT NULL,
      currentAmount NUMERIC NOT NULL
    )
  `;

  const db = connectDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      userTable,
      [],
      () => {
      console.log("User table created");
      },
      (_, error)  => {
        console.log('User table not created', error);
        return false;
      }
    );

    tx.executeSql(
      categoryTable,
      [],
      () => {
      console.log("category table created");
      },
      (_, error)  => {
        console.log('category table not created', error);
        return false;
      }
    );

    tx.executeSql(
      transactionTable,
      [],
      () => {
      console.log("transaction table created");
      },
      (_, error)  => {
        console.log('transaction table not created', error);
        return false;
      }
    );

    tx.executeSql(
      monthlyBalanceTable,
      [],
      () => {
      console.log("monthlybalance table created");
      },
      (_, error)  => {
        console.log('monthlybalance table not created', error);
        return false;
      }
    );
  });
};

export default connectDatabase;
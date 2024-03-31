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
      accountId INTEGER NOT NULL,
      FOREIGN KEY(accountId) REFERENCES Accounts(id)
    )
  `;

  const transactionTable = `
    CREATE TABLE IF NOT EXISTS TransactionTable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      categoryId INTEGER NOT NULL,
      FOREIGN KEY(categoryId) REFERENCES Category(id)
    )
  `;

  const monthyTransaction = `
    CREATE TABLE IF NOT EXISTS MonthlyTransaction (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      categoryId INTEGER NOT NULL,
      FOREIGN KEY(categoryId) REFERENCES Category(id)
    )
  `;

  const accountsTable = `
    CREATE TABLE IF NOT EXISTS Accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      currentAmount NUMERIC NOT NULL,
      initalAmount NUMERIC NOT NULL,
      currentMonthYear TEXT NOT NULL,
      countCategories NUMERIC DEFAULT 0
    )
  `;

  const monthlyBalanceTable = `
    CREATE TABLE IF NOT EXISTS MonthlyBalance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      monthYear TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      recursive NUMERIC NOT NULL,
      accountId INTEGER NOT NULL,
      FOREIGN KEY(accountId) REFERENCES Accounts(id)
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
        return true;
      }
    );

    tx.executeSql(
      categoryTable,
      [],
      () => {
      console.log("Category table created");
      },
      (_, error)  => {
        console.log('Category table not created', error);
        return true;
      }
    );

    tx.executeSql(
      transactionTable,
      [],
      () => {
      console.log("Transaction table created");
      },
      (_, error)  => {
        console.log('Transaction table not created', error);
        return true;
      }
    );

    tx.executeSql(
      accountsTable,
      [],
      () => {
      console.log("accountsTable table created");
      },
      (_, error)  => {
        console.log('accountsTable table not created', error);
        return true;
      }
    );

    tx.executeSql(
      monthlyBalanceTable,
      [],
      () => {
      console.log("monthlyBalance table created");
      },
      (_, error)  => {
        console.log('monthlyBalance table not created', error);
        return true;
      }
    );
  });
};

export default connectDatabase;
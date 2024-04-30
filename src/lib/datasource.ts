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

  const categoryTable = `
    CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT DEFAULT null,
      amountAllocated NUMERIC DEFAULT null,
      currentAmount NUMERIC NOT NULL,
      accountId INTEGER NOT NULL,
      FOREIGN KEY(accountId) REFERENCES Accounts(id)
    )
  `;

  const expenseTable = `
    CREATE TABLE IF NOT EXISTS Expense (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      monthYear TEXT NOT NULL,
      categoryId INTEGER NOT NULL,
      accountId INTEGER NOT NULL,
      FOREIGN KEY(categoryId) REFERENCES Category(id),
      FOREIGN KEY(accountId) REFERENCES Accounts(id)
    )
  `;

  const incomeTable = `
    CREATE TABLE IF NOT EXISTS Income (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      monthYear TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      recursive NUMERIC NOT NULL,
      accountId INTEGER NOT NULL,
      FOREIGN KEY(accountId) REFERENCES Accounts(id)
    )
  `;

  const activitiesLogs = `
    CREATE TABLE IF NOT EXISTS ActivitiesLogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      amount NUMERIC,
      transaction_type TEXT,
      remainingAmount NUMERIC,
      categoryId INTEGER
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
      expenseTable,
      [],
      () => {
      console.log("Expense table created");
      },
      (_, error)  => {
        console.log('Expense table not created', error);
        return true;
      }
    );

    tx.executeSql(
      incomeTable,
      [],
      () => {
      console.log("incomeTable table created");
      },
      (_, error)  => {
        console.log('incomeTable table not created', error);
        return true;
      }
    );

    tx.executeSql(
      activitiesLogs,
      [],
      () => {
      console.log("activitiesLogs table created");
      },
      (_, error)  => {
        console.log('activitiesLogs table not created', error);
        return true;
      }
    );
  });
};

export default connectDatabase;
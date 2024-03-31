import connectDatabase from "@/lib/datasource";
import User, { InputUser } from "@/types/user";
import * as SQLite from "expo-sqlite";

class UserService {
  db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = connectDatabase();
  }

  createUser(data: InputUser) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql('INSERT INTO User (name, avatarId) values (?, ?)',
          [data.name, data.avatarId],
          (_, result) => {
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

  checkUser() : Promise<User | null>  {
   return new Promise((resolve, reject) => {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM User WHERE id = 1',
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows._array[0] as unknown as User);
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

export default UserService;
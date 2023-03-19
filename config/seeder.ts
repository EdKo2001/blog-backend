import { deleteUsers, importUsers } from "./dummy-users-seeder";

switch (process.argv[2]) {
  case "-d": {
    // Users Seeder
    deleteUsers();
    break;
  }
  default: {
    // Users Seeder
    importUsers();
  }
}

import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  tableName: "users",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    age: {
      type: "int",
      nullable: true,
    },
    role: {
      type: "varchar",
      default: "user", // Matches logic in user registration tests
    },
    refreshToken: {
      type: "text",
      nullable: true, // Required for the logout functionality tests
    },
  },
});

export default User;
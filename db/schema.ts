import { pgTable,serial,text,timestamp } from "drizzle-orm/pg-core"
export const users = pgTable('user', {
  id: serial("id"),
  name:text("name"),
  email:text("email"),
  password:text("password"),
  role:text("role").$type<"admin"|"customer">(),
  createAt:timestamp("created-at"),
  updatedAt:timestamp("updated-at"),
});
import { conversation } from './schema';
import { relations } from "drizzle-orm";
import { pgTable,text,timestamp, uuid } from "drizzle-orm/pg-core"
export const user = pgTable('user', {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name:text("name").notNull(),
  email:text("email").notNull().unique(),
  password:text("password").notNull(),
  role:text("role").$type<"user"|"assistant">(),
  createAt:timestamp("created-at").defaultNow().notNull(),
  updatedAt:timestamp("updated-at").defaultNow().notNull(),
});

export const conversation = pgTable('conversation',{
  id:uuid("id").defaultRandom().notNull().primaryKey(),
  name:text("name"),
  userId:uuid("userId").references(()=>user.id,{onDelete:'cascade'}).notNull(),
  createAt:timestamp("created-at").defaultNow().notNull(),
  updatedAt:timestamp("updated-at").defaultNow().notNull(),
})

export const userRelations = relations(user,({many})=>({
  conversation:many(conversation)

}))

export const conversationRelations = relations(conversation,({one,many})=>({
  user:one(user,{
    fields:[conversation.userId],
    references:[user.id]
  }),
  messages:many(message)
}))

export const message = pgTable('message',{
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  content:text("content").notNull(),
  role:text("role").$type<"user"|"assistant">(),
  conversationId:uuid("conversationId").references(()=>conversation.id,{onDelete:"cascade"}).notNull(),
  createAt:timestamp("created-at").defaultNow().notNull(),
  updatedAt:timestamp("updated-at").defaultNow().notNull(),
})

export const messageRelations = relations(message,({one})=>({
  conversation:one(conversation,{
    fields:[message.conversationId],
    references:[conversation.id]
  })
}))
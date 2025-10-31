import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const shifts = pgTable("shifts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  category: text("category").notNull(),
});

export const insertShiftSchema = createInsertSchema(shifts).omit({
  id: true,
});

export type InsertShift = z.infer<typeof insertShiftSchema>;
export type Shift = typeof shifts.$inferSelect;

export const timeSlots = [
  { value: "6am-7am", label: "6am - 7am", name: "Day" },
  { value: "7am-3pm", label: "7am - 3pm", name: "Day" },
  { value: "3pm-11pm", label: "3pm - 11pm", name: "Evening" },
  { value: "11pm-12am", label: "11pm - 12am", name: "Evening" },
] as const;

export const categories = [
  { value: "pe-home", label: "PE Home" },
  { value: "paul", label: "Paul" },
] as const;

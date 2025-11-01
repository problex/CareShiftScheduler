import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, index, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
// Reference: blueprint:javascript_log_in_with_replit
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
// Reference: blueprint:javascript_log_in_with_replit
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const shifts = pgTable("shifts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  date: text("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  category: text("category").notNull(),
  pay: numeric("pay", { precision: 10, scale: 2 }),
  notes: text("notes"),
});

export const insertShiftSchema = createInsertSchema(shifts).omit({
  id: true,
});

export const updateShiftSchema = z.object({
  pay: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type InsertShift = z.infer<typeof insertShiftSchema>;
export type UpdateShift = z.infer<typeof updateShiftSchema>;
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

export const sharedCalendars = pgTable("shared_calendars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  shareId: text("share_id").notNull().unique(),
  shifts: text("shifts").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSharedCalendarSchema = createInsertSchema(sharedCalendars).omit({
  id: true,
  createdAt: true,
});

export type InsertSharedCalendar = z.infer<typeof insertSharedCalendarSchema>;
export type SharedCalendar = typeof sharedCalendars.$inferSelect;

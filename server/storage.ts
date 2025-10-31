// Reference: blueprint:javascript_log_in_with_replit, blueprint:javascript_database
import { 
  users,
  sharedCalendars,
  type User, 
  type UpsertUser, 
  type SharedCalendar, 
  type InsertSharedCalendar 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Shared calendar operations
  getSharedCalendar(shareId: string): Promise<SharedCalendar | undefined>;
  createSharedCalendar(calendar: InsertSharedCalendar): Promise<SharedCalendar>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Shared calendar operations
  async getSharedCalendar(shareId: string): Promise<SharedCalendar | undefined> {
    const [calendar] = await db
      .select()
      .from(sharedCalendars)
      .where(eq(sharedCalendars.shareId, shareId));
    return calendar;
  }

  async createSharedCalendar(insertCalendar: InsertSharedCalendar): Promise<SharedCalendar> {
    const [calendar] = await db
      .insert(sharedCalendars)
      .values(insertCalendar)
      .returning();
    return calendar;
  }
}

export const storage = new DatabaseStorage();

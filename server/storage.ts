// Reference: blueprint:javascript_log_in_with_replit, blueprint:javascript_database
import { 
  users,
  shifts,
  sharedCalendars,
  type User, 
  type UpsertUser,
  type Shift,
  type InsertShift, 
  type SharedCalendar, 
  type InsertSharedCalendar 
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Shift operations
  getUserShifts(userId: string): Promise<Shift[]>;
  createShift(shift: InsertShift): Promise<Shift>;
  deleteShift(id: string, userId: string): Promise<void>;
  // Shared calendar operations
  getSharedCalendar(shareId: string): Promise<SharedCalendar | undefined>;
  createSharedCalendar(calendar: InsertSharedCalendar): Promise<SharedCalendar>;
  updateSharedCalendar(shareId: string, userId: string): Promise<SharedCalendar | undefined>;
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

  // Shift operations
  async getUserShifts(userId: string): Promise<Shift[]> {
    const userShifts = await db
      .select()
      .from(shifts)
      .where(eq(shifts.userId, userId));
    return userShifts;
  }

  async createShift(shiftData: InsertShift): Promise<Shift> {
    const [shift] = await db
      .insert(shifts)
      .values(shiftData)
      .returning();
    return shift;
  }

  async deleteShift(id: string, userId: string): Promise<void> {
    await db
      .delete(shifts)
      .where(and(eq(shifts.id, id), eq(shifts.userId, userId)));
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

  async updateSharedCalendar(shareId: string, userId: string): Promise<SharedCalendar | undefined> {
    const [calendar] = await db
      .update(sharedCalendars)
      .set({ shifts: "" })
      .where(and(eq(sharedCalendars.shareId, shareId), eq(sharedCalendars.userId, userId)))
      .returning();
    return calendar;
  }
}

export const storage = new DatabaseStorage();

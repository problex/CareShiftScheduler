import { type User, type InsertUser, type SharedCalendar, type InsertSharedCalendar } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSharedCalendar(shareId: string): Promise<SharedCalendar | undefined>;
  createSharedCalendar(calendar: InsertSharedCalendar): Promise<SharedCalendar>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sharedCalendars: Map<string, SharedCalendar>;

  constructor() {
    this.users = new Map();
    this.sharedCalendars = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSharedCalendar(shareId: string): Promise<SharedCalendar | undefined> {
    return Array.from(this.sharedCalendars.values()).find(
      (calendar) => calendar.shareId === shareId,
    );
  }

  async createSharedCalendar(insertCalendar: InsertSharedCalendar): Promise<SharedCalendar> {
    const id = randomUUID();
    const calendar: SharedCalendar = {
      ...insertCalendar,
      id,
      createdAt: new Date(),
    };
    this.sharedCalendars.set(id, calendar);
    return calendar;
  }
}

export const storage = new MemStorage();

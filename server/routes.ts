import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertShiftSchema, insertSharedCalendarSchema } from "@shared/schema";
import { nanoid } from "nanoid";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Reference: blueprint:javascript_log_in_with_replit
  // Setup authentication middleware
  await setupAuth(app);

  // Auth route to get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get all shifts for the authenticated user
  app.get("/api/shifts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const shifts = await storage.getUserShifts(userId);
      res.json(shifts);
    } catch (error) {
      console.error("Error fetching shifts:", error);
      res.status(500).json({ error: "Failed to fetch shifts" });
    }
  });

  // Create a new shift for the authenticated user
  app.post("/api/shifts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertShiftSchema.parse({ ...req.body, userId });
      const shift = await storage.createShift(validatedData);
      res.json(shift);
    } catch (error) {
      console.error("Error creating shift:", error);
      res.status(400).json({ error: "Failed to create shift" });
    }
  });

  // Delete a shift for the authenticated user
  app.delete("/api/shifts/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      await storage.deleteShift(id, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting shift:", error);
      res.status(500).json({ error: "Failed to delete shift" });
    }
  });

  // Create or get a shareable calendar link (protected route)
  // Now stores userId reference instead of shift snapshot for live updates
  app.post("/api/share", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Check if user already has a share link
      const shareId = nanoid(10);
      const sharedCalendar = await storage.createSharedCalendar({
        userId,
        shareId,
        shifts: "", // Empty string - we'll fetch live shifts instead
      });

      res.json({ shareId: sharedCalendar.shareId });
    } catch (error) {
      console.error("Error creating shared calendar:", error);
      res.status(500).json({ error: "Failed to create shared calendar" });
    }
  });

  // Get a shared calendar by shareId - now fetches live shifts from user
  app.get("/api/share/:shareId", async (req, res) => {
    try {
      const { shareId } = req.params;
      const sharedCalendar = await storage.getSharedCalendar(shareId);

      if (!sharedCalendar) {
        return res.status(404).json({ error: "Shared calendar not found" });
      }

      // Fetch live shifts from the user who created the share link
      const liveShifts = await storage.getUserShifts(sharedCalendar.userId);

      res.json({
        shifts: liveShifts,
        createdAt: sharedCalendar.createdAt,
      });
    } catch (error) {
      console.error("Error fetching shared calendar:", error);
      res.status(500).json({ error: "Failed to fetch shared calendar" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

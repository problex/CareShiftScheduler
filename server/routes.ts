import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSharedCalendarSchema } from "@shared/schema";
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

  // Create a shareable calendar link (protected route)
  app.post("/api/share", isAuthenticated, async (req: any, res) => {
    try {
      const { shifts } = req.body;
      const userId = req.user.claims.sub;
      
      if (!shifts || !Array.isArray(shifts)) {
        return res.status(400).json({ error: "Invalid shifts data" });
      }

      const shareId = nanoid(10);
      const sharedCalendar = await storage.createSharedCalendar({
        userId,
        shareId,
        shifts: JSON.stringify(shifts),
      });

      res.json({ shareId: sharedCalendar.shareId });
    } catch (error) {
      console.error("Error creating shared calendar:", error);
      res.status(500).json({ error: "Failed to create shared calendar" });
    }
  });

  // Get a shared calendar by shareId
  app.get("/api/share/:shareId", async (req, res) => {
    try {
      const { shareId } = req.params;
      const sharedCalendar = await storage.getSharedCalendar(shareId);

      if (!sharedCalendar) {
        return res.status(404).json({ error: "Shared calendar not found" });
      }

      res.json({
        shifts: JSON.parse(sharedCalendar.shifts),
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

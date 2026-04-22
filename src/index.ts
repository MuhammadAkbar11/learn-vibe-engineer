import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
  .get("/", () => "Hello from Bun + ElysiaJS + DrizzleORM!")
  .get("/health", () => ({ status: "ok", message: "Server is healthy" }))
  .get("/users", async () => {
    try {
      const allUsers = await db.select().from(users);
      return { success: true, data: allUsers };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to fetch users. Ensure DB connection is valid and migrations are applied." };
    }
  })
  .post("/users", async ({ body }) => {
    try {
      const { name, email } = body as { name: string; email: string };
      if (!name || !email) {
        return { success: false, error: "Name and email are required" };
      }
      const result = await db.insert(users).values({ name, email });
      return { success: true, data: result };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to create user. Ensure DB connection is valid and migrations are applied." };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

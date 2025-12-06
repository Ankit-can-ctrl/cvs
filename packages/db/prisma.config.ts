import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "prisma/config";

// Load .env from monorepo root
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

const databaseUrl = process.env.DB_URL || process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl!,
  },
});

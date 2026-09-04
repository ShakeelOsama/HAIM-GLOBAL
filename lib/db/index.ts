import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const url =
  process.env.DATABASE_URL ??
  "postgresql://placeholder@placeholder.neon.tech/placeholder";

const sql = neon(url);

export const db = drizzle(sql, { schema });

/** True only when a real DATABASE_URL has been configured (not the build-time placeholder). */
export const isDatabaseConfigured =
  typeof process.env.DATABASE_URL === "string" &&
  process.env.DATABASE_URL.length > 0;

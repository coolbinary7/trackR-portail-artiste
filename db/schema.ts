import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default(""),
  artistName: text("artist_name").notNull().default(""),
  phone: text("phone").notNull().default(""),
  country: text("country").notNull().default(""),
  spotify: text("spotify").notNull().default(""),
  instagram: text("instagram").notNull().default(""),
  status: text("status").notNull().default("pending"),
  role: text("role").notNull().default("user"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const releases = sqliteTable("releases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ownerEmail: text("owner_email").notNull(),
  title: text("title").notNull(),
  releaseType: text("release_type").notNull(),
  releaseDate: text("release_date").notNull(),
  timingStatus: text("timing_status").notNull(),
  status: text("status").notNull().default("received"),
  payload: text("payload").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const assets = sqliteTable("assets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ownerEmail: text("owner_email").notNull(),
  releaseId: integer("release_id"),
  kind: text("kind").notNull(),
  objectKey: text("object_key").notNull().unique(),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  displayName: text("display_name").notNull().default(""),
  role: text("role").notNull().default("staff"),
  active: integer("active").notNull().default(1),
  invitedByEmail: text("invited_by_email").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("team_members_email_unique").on(table.email)]);

export const releaseCorrections = sqliteTable("release_corrections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  releaseId: integer("release_id").notNull(),
  ownerEmail: text("owner_email").notNull(),
  section: text("section").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("requested"),
  createdByEmail: text("created_by_email").notNull(),
  response: text("response").notNull().default(""),
  respondedByEmail: text("responded_by_email"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  respondedAt: text("responded_at"),
  dueAt: text("due_at"),
}, (table) => [
  index("release_corrections_release_idx").on(table.releaseId, table.createdAt),
  index("release_corrections_owner_idx").on(table.ownerEmail, table.status),
]);

export const activityLog = sqliteTable("activity_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  releaseId: integer("release_id"),
  actorEmail: text("actor_email").notNull(),
  actorRole: text("actor_role").notNull(),
  action: text("action").notNull(),
  details: text("details").notNull().default("{}"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("activity_log_release_idx").on(table.releaseId, table.createdAt)]);

export const releaseRevisions = sqliteTable("release_revisions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  releaseId: integer("release_id").notNull(),
  revisionNumber: integer("revision_number").notNull(),
  actorEmail: text("actor_email").notNull(),
  changeSummary: text("change_summary").notNull().default(""),
  snapshot: text("snapshot").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("release_revisions_number_unique").on(table.releaseId, table.revisionNumber),
  index("release_revisions_release_idx").on(table.releaseId, table.createdAt),
]);

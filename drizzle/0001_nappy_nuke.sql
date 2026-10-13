CREATE TABLE `activity_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`release_id` integer,
	`actor_email` text NOT NULL,
	`actor_role` text NOT NULL,
	`action` text NOT NULL,
	`details` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `activity_log_release_idx` ON `activity_log` (`release_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `release_corrections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`release_id` integer NOT NULL,
	`owner_email` text NOT NULL,
	`section` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`created_by_email` text NOT NULL,
	`response` text DEFAULT '' NOT NULL,
	`responded_by_email` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`responded_at` text
);
--> statement-breakpoint
CREATE INDEX `release_corrections_release_idx` ON `release_corrections` (`release_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `release_corrections_owner_idx` ON `release_corrections` (`owner_email`,`status`);--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`display_name` text DEFAULT '' NOT NULL,
	`role` text DEFAULT 'staff' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`invited_by_email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `team_members_email_unique` ON `team_members` (`email`);
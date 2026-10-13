CREATE TABLE `release_revisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`release_id` integer NOT NULL,
	`revision_number` integer NOT NULL,
	`actor_email` text NOT NULL,
	`change_summary` text DEFAULT '' NOT NULL,
	`snapshot` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `release_revisions_number_unique` ON `release_revisions` (`release_id`,`revision_number`);--> statement-breakpoint
CREATE INDEX `release_revisions_release_idx` ON `release_revisions` (`release_id`,`created_at`);
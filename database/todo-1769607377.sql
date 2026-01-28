CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL UNIQUE,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `categories` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Tasks` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`is_done` boolean NOT NULL,
	`categorie_id` int,
	`new_field` int NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `categories` ADD CONSTRAINT `categories_fk2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_fk3` FOREIGN KEY (`categorie_id`) REFERENCES `categories`(`id`);

ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_fk4` FOREIGN KEY (`new_field`) REFERENCES `users`(`id`);
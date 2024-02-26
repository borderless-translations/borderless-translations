

CREATE TABLE "clients" (
	"id" SERIAL NOT NULL,
	"client" VARCHAR(255) NOT NULL,
	"contact" VARCHAR(255) NOT NULL,
	"country" VARCHAR(150),
	"timezone" VARCHAR(64),
	"location" TEXT,
	"email" VARCHAR(320),
	"phone" VARCHAR(50),
	"client_notes" TEXT,
	"created_at" DATE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id")
);

CREATE TABLE "projects" (
	"id" SERIAL NOT NULL,
	"admin_id" INTEGER NOT NULL,
	"client_id" INTEGER NOT NULL,
	"description" TEXT,
	"duration" TEXT,
	"created_at" DATE DEFAULT CURRENT_TIMESTAMP, 
	"due_at" DATE NOT NULL,
	"status" VARCHAR DEFAULT 'NOT STARTED',
	"translator_status" TEXT DEFAULT 'NOT STARTED',
	"proofreader_status" TEXT DEFAULT 'NOT STARTED',
	CONSTRAINT "projects_pk" PRIMARY KEY ("id")
);

CREATE TABLE "contractor_profile" (
	"id" SERIAL NOT NULL,
	"user_id" INTEGER NOT NULL,
	"contractor_name" VARCHAR NOT NULL,
	"phone" VARCHAR (15),
	"available" BOOLEAN DEFAULT TRUE,
	"timezone" VARCHAR(15),
	"location" TEXT,
	"linked_in" TEXT,
	"status" TEXT,
	"via" TEXT,
	"signed_nda" BOOLEAN DEFAULT FALSE,
	"notes" TEXT,
	"base_written_rate" DECIMAL,
	"base_audio_video_rate" DECIMAL,
	CONSTRAINT "contractor_profile_pk" PRIMARY KEY ("user_id")
);

CREATE TABLE "project_language" (
	"id" SERIAL NOT NULL,
	"project_id" INTEGER NOT NULL,
	"contractor_id" INTEGER,
	"proofreader_id" INTEGER,
	"from_language_id" INTEGER NOT NULL,
	"to_language_id" INTEGER NOT NULL,
	"text_to_translate" TEXT,
	"translator_notes" TEXT,
	"service_id" INTEGER NOT NULL,
	"service_notes" TEXT,
	"file_link" VARCHAR (2048),
	"flagged" BOOLEAN DEFAULT FALSE,
	CONSTRAINT "project_language_pk" PRIMARY KEY ("id")
);

CREATE TABLE "services" (
	"id" SERIAL NOT NULL,
	"type" VARCHAR,
	CONSTRAINT "services_pk" PRIMARY KEY ("id")
);

CREATE TABLE "contractor_services" (
	"id" SERIAL NOT NULL,
	"service_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	CONSTRAINT "contractor_services_pk" PRIMARY KEY ("id")
);

CREATE TABLE "expertise" (
	"id" SERIAL NOT NULL,
	"type" VARCHAR,
	CONSTRAINT "expertise_pk" PRIMARY KEY ("id")
);

CREATE TABLE "contractor_expertise" (
	"id" SERIAL NOT NULL,
	"expertise_id" INTEGER NOT NULL,
	"user_id" INTEGER NOT NULL,
	CONSTRAINT "contractor_expertise_pk" PRIMARY KEY ("id")
);

CREATE TABLE "user" (
	"id" SERIAL NOT NULL,
	"username" VARCHAR UNIQUE NOT NULL,
	"password" VARCHAR NOT NULL,
	"type" VARCHAR DEFAULT 'contractor',
	"created_at" DATE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "contractor_language" (
	"id" SERIAL NOT NULL,
	"user_id" INTEGER NOT NULL,
	"from_language_id" INTEGER NOT NULL,
	"to_language_id" INTEGER NOT NULL,
	CONSTRAINT "contractor_language_pk" PRIMARY KEY ("id")
);

CREATE TABLE "languages" (
	"id" SERIAL NOT NULL,
	"name" VARCHAR NOT NULL,
	"tier" INTEGER,
	CONSTRAINT "languages_pk" PRIMARY KEY ("id")
);

CREATE TABLE "rates" (
	"id" SERIAL NOT NULL,
	"rate_min" DECIMAL,
	"rate_max" DECIMAL,
	"service_id" INTEGER NOT NULL,
	"tier" INTEGER,
	CONSTRAINT "rates_pk" PRIMARY KEY ("id")
);

INSERT INTO "languages" ("name", "tier")
VALUES ('Italian', '1'),('Spanish', '1'),('Portuguese', '1'),('Romanian', '1'),('Croatian', '1'),('Serbian', '1'),
('Czech', '1'),('Slovak', '1'),('Polish', '1'),('Bulgarian', '1'),('Hungarian', '1'),
('French', '2'),('English', '2'),('Ukranian', '2'),('Turkish', '2'),('Greek', '2'),('Vietnamese', '2'),('Khmer', '2'),
('Simplified Chinese', '3'),('German', '3'),('Duth', '3'),('Arabic', '3'),('Hebrew', '3'),
('Japanese', '4'),('Korean', '4'),('Finnish', '4'),('Danish', '4'),('Swedish', '4'),('Norwegian', '4');

INSERT INTO "services" ("type")
VALUES ('Audio/Visual Transcription'),('English Closed Caption'),('Global Translated Subtitles'),
('Non-Fiction Episodic Format Sheet (Chryon List)'),('As-Broadcast Script'),('Interpretation');

INSERT INTO "rates" ("rate_min","rate_max", "service_id","tier")
VALUES ('0.07','0.12','1','1'),('0.12','0.15','1','2'),('0.14','0.16','1','3'),('0.16','0.19','1','4'),
('5.00','8.00','2','1'),('7.00','9.00','2','2'),('9.00','13.00','2','3'),('13.00','16.00','2','4'),
('5.00','8.00','3','1'),('7.00','9.00','3','2'),('9.00','13.00','3','3'),('13.00','16.00','3','4');

INSERT INTO "user" ("username","password","type")
VALUES ('Robin', '','contractor'),('', '',''),('', '',''),('', '',''),('','',''),('','','');


INSERT INTO "clients" ("client","contact","country","timezone","location","email","phone","client_notes","created_at")
VALUES ('Stinger Attachments', 'Dustin Smith', 'USA', 'CST', 'Minneapolis, MN', 'email@email.email', '612-867-5309','note', '2-19-2024'),
('Jewels Films', 'Cloe', 'Poland', '', 'Warsaw','email1@email.email','+48 123-345-567', 'Translate from English to Polish', '2-23-2024'),
('Lionspath', 'Jennifer', 'France', 'CET', 'Paris','email2@email.email', '+33 11-22-33-44-55', 'Translate with subtitles a short documentary on french cows', '2-23-2024');

INSERT INTO "expertise" ("type")
VALUES ('Medical'), ('Legal'), ('Academic'), ('Certified Translator'), ('Tech'), ('Finance');

INSERT INTO "contractor_profile" ("user_id", "contractor_name", "phone", "available", "timezone", "location", "linkedIn", "base_written_rate", "base_audio_video_rate")
VALUES (7, 'translator 1', '1-222-333-4444', FALSE, '-6:00 UTC', 'Minneapolis, MN, USA', 'linkedInName', 0.25, 8),
(2, 'translator 2', '1-222-333-4444', TRUE, '-6:00 UTC', 'Minneapolis, MN, USA', 'linkedInName', 0.25, 8);

INSERT INTO "contractor_services" ("service_id", "user_id")
VALUES (4,	7), (3,	7), (2,	7), (1,	7), (4,	2), (3,	2), (2,	2), (1,	2);

INSERT INTO "contractor_language" ("user_id", "from_language_id", "to_language_id")
VALUES (7,	1,	2), (7,	3,	4), (7,	2,	1), (7,	4,	3), (2,	1,	2), (2,	3,	4), (2,	2,	1), (2,	4,	3);

INSERT INTO "projects" ("admin_id", "client_id", "description", "duration", "created_at", "due_at", "translator_status", "proofreader_status")
VALUES (1, 1, 'short description', '9 min', '2024-02-20', '2024-02-21', 'Not started',	'Not started'),
(1, 1, 'long description long description long description long description', '30000 words', '2024-02-20', '2024-02-21', 'Complete', 'Complete'),
(1, 1, 'short description', '5 min', '2024-02-12', '2024-02-16', 'Complete', 'Not started'),
(1, 1, 'long description long description long description long description', '50000 words', '2024-02-10', '2024-02-15', 'Complete', 'Complete');

INSERT INTO "project_language" ("project_id", "contractor_id", "proofreader_id", "from_language_id", "to_language_id", "text_to_translate", "translator_notes", "service_id", "flagged")
VALUES (1, 7, 2, 3, 4, 'this is the text to translate', 'current notes', 5, TRUE),
(2, 2, 7, 5, 6, 'this is the text to translate', '', 3, FALSE),
(1, 7, 2, 3, 4, 'this is the text  to translate', 'current notes', 5, FALSE),
(2, 2, 7, 5, 6, 'this is the text to translate', '', 3, TRUE);

INSERT INTO "contractor_expertise" ("expertise_id", "contractor_id")
VALUES (2, 2), (7, 3);
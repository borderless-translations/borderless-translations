

CREATE TABLE "clients" (
	"id" SERIAL NOT NULL,
	"client" INTEGER NOT NULL,
	"contact" TEXT NOT NULL,
	"country" TEXT NOT NULL,
	"timezone" VARCHAR NOT NULL,
	"location" TEXT,
	"email" VARCHAR NOT NULL,
	"phone" VARCHAR NOT NULL,
	"client_notes" VARCHAR,
	"created_at" DATE NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id")
);



CREATE TABLE "projects" (
	"id" SERIAL NOT NULL,
	"admin_id" INTEGER NOT NULL,
	"client_id" INTEGER NOT NULL,
	"description" TEXT,
	"duration" TEXT,
	"created_at" DATE NOT NULL,
	"due_at" DATE NOT NULL,
	CONSTRAINT "projects_pk" PRIMARY KEY ("id")
);



CREATE TABLE "contractor_profile" (
	"id" SERIAL NOT NULL,
	"user_id" INTEGER NOT NULL,
	"contractor_name" VARCHAR NOT NULL,
	"available" BOOLEAN NOT NULL,
	"timezone" VARCHAR NOT NULL,
	"location" TEXT,
	"language_profile" INTEGER NOT NULL,
	"linkedIn" TEXT NOT NULL,
	"status" TEXT NOT NULL,
	"via" TEXT NOT NULL,
	"signed_nda" BOOLEAN NOT NULL,
	"notes" TEXT NOT NULL,
	"base_written_rate" DECIMAL NOT NULL,
	"base_audio_video_rate" DECIMAL NOT NULL,
	CONSTRAINT "contractor_profile_pk" PRIMARY KEY ("user_id")
);



CREATE TABLE "project_language" (
	"id" SERIAL NOT NULL,
	"project_id" INTEGER NOT NULL,
	"contractor_id" INTEGER NOT NULL,
	"proofreader_id" INTEGER NOT NULL,
	"from_language_id" INTEGER NOT NULL,
	"to_language_id" INTEGER NOT NULL,
	"text_to_translate" TEXT NOT NULL,
	"translator_notes" TEXT,
	"service_id" INTEGER NOT NULL,
	"service_notes" TEXT,
	"file_link" VARCHAR,
	CONSTRAINT "project_language_pk" PRIMARY KEY ("id")
);



CREATE TABLE "services" (
	"id" SERIAL NOT NULL,
	"type" VARCHAR NOT NULL,
	CONSTRAINT "services_pk" PRIMARY KEY ("id")
);



CREATE TABLE "contractor_services" (
	"id" SERIAL NOT NULL,
	"service_id" INTEGER NOT NULL,
	"contractor_id" INTEGER NOT NULL,
	CONSTRAINT "contractor_services_pk" PRIMARY KEY ("id")
);



CREATE TABLE "user" (
	"id" SERIAL NOT NULL,
	"username" VARCHAR NOT NULL,
	"password" VARCHAR NOT NULL,
	"type" VARCHAR DEFAULT 'contractor',
	"created_at" DATE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
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
	"tier" INTEGER NOT NULL,
	CONSTRAINT "languages_pk" PRIMARY KEY ("id")
);



CREATE TABLE "rates" (
	"id" SERIAL NOT NULL,
	"rate" DECIMAL NOT NULL,
	"service_id" INTEGER NOT NULL,
	"tier" INTEGER NOT NULL,
	CONSTRAINT "rates_pk" PRIMARY KEY ("id")
);

INSERT INTO "languages" ("name", "tier")
VALUES ('Italian', '1'),('Spanish', '1'),('Portuguese', '1'),('Romanian', '1'),('Croation', '1'),('Serbian', '1'),
('Czech', '1'),('Slovak', '1'),('Polish', '1'),('Bulgarian', '1'),('Hungarian', '1'),
('French', '2'),('English', '2'),('Ukranian', '2'),('Turkish', '2'),('Greek', '2'),('Vietnamese', '2'),('Khmer', '2'),
('Simplified Chinese', '3'),('German', '3'),('Duth', '3'),('Arabic', '3'),('Hebrew', '3'),
('Japanese', '4'),('Korean', '4'),('Finnish', '4'),('Danish', '4'),('Swedish', '4'),('Norwegian', '4');

INSERT INTO "services" ("type")
VALUES ('Translations'),('Video'),('SRT'),('Copy Editing'),('Proofreading');




-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
    "type" VARCHAR (80)NOT NULL,
	"created_at" INTEGER NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);


CREATE TABLE "clients" (
	"id" SERIAL NOT NULL,
	"client" TEXT NOT NULL,
	"contact" TEXT NOT NULL,
	"country" TEXT NOT NULL,
	"timezone" DATETIME NOT NULL,
	"email" VARCHAR (1000) NOT NULL,
	"phone" VARCHAR (15) NOT NULL,
	"client_notes" TEXT,
	"created_at" DATETIME NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id")
);



CREATE TABLE "projects" (
	"id" SERIAL NOT NULL,
	"admin_id" VARCHAR (80) NOT NULL,
	"client_id" VARCHAR (80) NOT NULL,
	"description" TEXT,
	"duration" TEXT,
	"created_at" DATETIME NOT NULL,
	"due_at" DATETIME NOT NULL,
	CONSTRAINT "projects_pk" PRIMARY KEY ("id")
);



CREATE TABLE "contractor_profile" (
	"id" SERIAL NOT NULL,
	"user_id" TEXT NOT NULL,
	"available" BOOLEAN NOT NULL,
	"timezone" DATETIME NOT NULL,
	"language_profile" TEXT NOT NULL,
	"linkedIn" TEXT NOT NULL,
	"status" TEXT NOT NULL,
	"via" TEXT NOT NULL,
	"signed_nda" BOOLEAN NOT NULL,
	"notes" TEXT NOT NULL,
	"base_written_rate" DECIMAL NOT NULL,
	"base_audio_video_rate" DECIMAL NOT NULL,
	CONSTRAINT "contractor_profile_pk" PRIMARY KEY ("id")
);



CREATE TABLE "project_language" (
	"id" SERIAL NOT NULL,
	"project_id" VARCHAR (100) NOT NULL,
	"contractor_id" VARCHAR (100) NOT NULL,
	"proofreader_id" VARCHAR (100) NOT NULL,
	"from_language_id" VARCHAR (80) NOT NULL,
	"to_language_id" VARCHAR (80) NOT NULL,
	"text_to_translate" INTEGER NOT NULL,
	"translator_notes" TEXT,
	"service_id" VARCHAR (100) NOT NULL,
	"service_notes" TEXT,
	"file_link" TEXT,
	CONSTRAINT "project_language_pk" PRIMARY KEY ("id")

);



CREATE TABLE "services" (
	"id" SERIAL NOT NULL,
	"type" TEXT NOT NULL,
	CONSTRAINT "services_pk" PRIMARY KEY ("id")
);



CREATE TABLE "contractor_services" (
	"id" SERIAL NOT NULL,
	"service_id" VARCHAR (100) NOT NULL,
	"contractor_id" VARCHAR (100) NOT NULL,
	CONSTRAINT "contractor_services_pk" PRIMARY KEY ("id")
);







CREATE TABLE "contractor_language" (
	"id" SERIAL NOT NULL,
	"user_id" VARCHAR (80) NOT NULL,
	"from_language_id" VARCHAR (80) NOT NULL,
	"to_language_id" VARCHAR (80) NOT NULL,
	CONSTRAINT "contractor_language_pk" PRIMARY KEY ("id")
);



CREATE TABLE "languages" (
	"id" SERIAL NOT NULL,
	"name" TEXT NOT NULL,
	"tier" INTEGER NOT NULL,
	CONSTRAINT "languages_pk" PRIMARY KEY ("id")
);



CREATE TABLE "rates" (
	"id" SERIAL NOT NULL,
	"rate" DECIMAL NOT NULL,
	"service_id" VARCHAR (100) NOT NULL,
	"tier" INTEGER NOT NULL,
	CONSTRAINT "rates_pk" PRIMARY KEY ("id")

);



ALTER TABLE "clients" ADD CONSTRAINT "clients_fk0" FOREIGN KEY ("client") REFERENCES "users"("id");

ALTER TABLE "projects" ADD CONSTRAINT "projects_fk0" FOREIGN KEY ("admin_id") REFERENCES "users"("id");
ALTER TABLE "projects" ADD CONSTRAINT "projects_fk1" FOREIGN KEY ("client_id") REFERENCES "clients"("id");

ALTER TABLE "contractor_profile" ADD CONSTRAINT "contractor_profile_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "contractor_profile" ADD CONSTRAINT "contractor_profile_fk1" FOREIGN KEY ("language_profile") REFERENCES "languages"("id");

ALTER TABLE "project_language" ADD CONSTRAINT "project_language_fk0" FOREIGN KEY ("project_id") REFERENCES "projects"("id");
ALTER TABLE "project_language" ADD CONSTRAINT "project_language_fk1" FOREIGN KEY ("contractor_id") REFERENCES "contractor_profile"("id");
ALTER TABLE "project_language" ADD CONSTRAINT "project_language_fk2" FOREIGN KEY ("proofreader_id") REFERENCES "contractor_profile"("id");
ALTER TABLE "project_language" ADD CONSTRAINT "project_language_fk3" FOREIGN KEY ("from_language_id") REFERENCES "languages"("name");
ALTER TABLE "project_language" ADD CONSTRAINT "project_language_fk4" FOREIGN KEY ("to_language_id") REFERENCES "languages"("name");
ALTER TABLE "project_language" ADD CONSTRAINT "project_language_fk5" FOREIGN KEY ("service_id") REFERENCES "services"("type");

ALTER TABLE "services" ADD CONSTRAINT "services_fk0" FOREIGN KEY ("type") REFERENCES "project_language"("id");

ALTER TABLE "contractor_services" ADD CONSTRAINT "contractor_services_fk0" FOREIGN KEY ("service_id") REFERENCES "services"("id");
ALTER TABLE "contractor_services" ADD CONSTRAINT "contractor_services_fk1" FOREIGN KEY ("contractor_id") REFERENCES "contractor_profile"("id");


ALTER TABLE "contractor_language" ADD CONSTRAINT "contractor_language_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "contractor_language" ADD CONSTRAINT "contractor_language_fk1" FOREIGN KEY ("from_language_id") REFERENCES "languages"("id");
ALTER TABLE "contractor_language" ADD CONSTRAINT "contractor_language_fk2" FOREIGN KEY ("to_language_id") REFERENCES "languages"("id");


ALTER TABLE "rates" ADD CONSTRAINT "rates_fk0" FOREIGN KEY ("service_id") REFERENCES "services"("id");
ALTER TABLE "rates" ADD CONSTRAINT "rates_fk1" FOREIGN KEY ("tier") REFERENCES "languages"("id");
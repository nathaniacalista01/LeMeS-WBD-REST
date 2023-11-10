-- CreateEnum
CREATE TYPE "Source" AS ENUM ('PDF', 'VIDEO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "image_path" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursePremium" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_path" TEXT,
    "teacher_id" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoursePremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModulPremium" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "ModulPremium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialPremium" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source_type" "Source" NOT NULL,
    "material_path" TEXT NOT NULL,
    "module_id" INTEGER NOT NULL,

    CONSTRAINT "MaterialPremium_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "CoursePremium" ADD CONSTRAINT "CoursePremium_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulPremium" ADD CONSTRAINT "ModulPremium_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "CoursePremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialPremium" ADD CONSTRAINT "MaterialPremium_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "ModulPremium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

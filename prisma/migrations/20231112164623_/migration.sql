/*
  Warnings:

  - You are about to drop the column `module_id` on the `MaterialPremium` table. All the data in the column will be lost.
  - Added the required column `modul_id` to the `MaterialPremium` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MaterialPremium" DROP CONSTRAINT "MaterialPremium_module_id_fkey";

-- AlterTable
ALTER TABLE "MaterialPremium" DROP COLUMN "module_id",
ADD COLUMN     "modul_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MaterialPremium" ADD CONSTRAINT "MaterialPremium_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "ModulPremium"("id") ON DELETE CASCADE ON UPDATE CASCADE;

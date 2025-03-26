/*
  Warnings:

  - You are about to drop the column `power` on the `CharacterStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CharacterStats" DROP COLUMN "power",
ADD COLUMN     "Power" INTEGER NOT NULL DEFAULT 0;

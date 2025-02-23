/*
  Warnings:

  - You are about to drop the column `statsId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[characterStatsId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_statsId_fkey";

-- DropIndex
DROP INDEX "Character_statsId_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "statsId",
ADD COLUMN     "characterStatsId" TEXT;

-- DropTable
DROP TABLE "Stats";

-- CreateTable
CREATE TABLE "CharacterStats" (
    "id" TEXT NOT NULL,
    "power" INTEGER NOT NULL DEFAULT 0,
    "ATK" INTEGER NOT NULL DEFAULT 0,
    "HP" INTEGER NOT NULL DEFAULT 0,
    "DEF" INTEGER NOT NULL DEFAULT 0,
    "CRIT" INTEGER NOT NULL DEFAULT 0,
    "HIT" INTEGER NOT NULL DEFAULT 0,
    "FLEE" INTEGER NOT NULL DEFAULT 0,
    "SPD" INTEGER NOT NULL DEFAULT 0,
    "REG" INTEGER NOT NULL DEFAULT 0,
    "MR" INTEGER NOT NULL DEFAULT 0,
    "PR" INTEGER NOT NULL DEFAULT 0,
    "LL" INTEGER NOT NULL DEFAULT 0,
    "CDR" INTEGER NOT NULL DEFAULT 0,
    "CDA" INTEGER NOT NULL DEFAULT 0,
    "MP" INTEGER NOT NULL DEFAULT 0,
    "PP" INTEGER NOT NULL DEFAULT 0,
    "CBR" INTEGER NOT NULL DEFAULT 0,
    "IS" INTEGER NOT NULL DEFAULT 0,
    "HEAL" INTEGER NOT NULL DEFAULT 0,
    "TY" INTEGER NOT NULL DEFAULT 0,
    "RH" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CharacterStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSkills" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "CharacterSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "damage" INTEGER NOT NULL,
    "cooldown" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_characterStatsId_key" ON "Character"("characterStatsId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_characterStatsId_fkey" FOREIGN KEY ("characterStatsId") REFERENCES "CharacterStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkills" ADD CONSTRAINT "CharacterSkills_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkills" ADD CONSTRAINT "CharacterSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

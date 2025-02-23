/*
  Warnings:

  - A unique constraint covering the columns `[characterId,skillId]` on the table `CharacterSkills` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CharacterSkills_characterId_skillId_key" ON "CharacterSkills"("characterId", "skillId");

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "attackType" TEXT NOT NULL,
    "maxCap" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "skins" INTEGER NOT NULL,
    "urlSafeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "characterStatsId" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

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
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CharacterSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cooldown" INTEGER NOT NULL,
    "effectLvl1" TEXT NOT NULL,
    "effectLvl2" TEXT NOT NULL,
    "effectLvl3" TEXT NOT NULL,
    "effectLvl4" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_urlSafeName_key" ON "Character"("urlSafeName");

-- CreateIndex
CREATE UNIQUE INDEX "Character_characterStatsId_key" ON "Character"("characterStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSkills_characterId_skillId_key" ON "CharacterSkills"("characterId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_characterStatsId_fkey" FOREIGN KEY ("characterStatsId") REFERENCES "CharacterStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkills" ADD CONSTRAINT "CharacterSkills_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkills" ADD CONSTRAINT "CharacterSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

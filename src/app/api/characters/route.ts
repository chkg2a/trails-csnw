import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Define request body structure to match schema
type CharacterRequestBody = {
  name: string;
  element: string;
  urlSafeName: string;
  attackType: string;
  job: string;
  role: string;
  maxCap: string;
  skins: number; // Changed from numberOfSkins to skins to match schema
  stats: {
    Power?: number;
    ATK?: number;
    HP?: number;
    DEF?: number;
    CRIT?: number;
    HIT?: number;
    FLEE?: number;
    SPD?: number;
    REG?: number;
    MR?: number;
    PR?: number;
    LL?: number;
    CDR?: number;
    CDA?: number;
    MP?: number;
    PP?: number;
    CBR?: number;
    IS?: number;
    HEAL?: number;
    TY?: number;
    RH?: number;
  };
  skillsData: {
    name: string;
    cooldown: number;
    effectLvl1: string;
    effectLvl2: string;
    effectLvl3: string;
    effectLvl4: string;
  }[];
};

export async function GET(): Promise<NextResponse> {
  try {
    const characters = await prisma.character.findMany({
      include: {
        characterStats: true,
        characterSkills: {
          include: {
            skill: true
          }
        }
      }
    });
    return NextResponse.json(characters);
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    );
  }
}

// POST: Add a new character
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: CharacterRequestBody = await req.json();
    
    // Validate required fields
    if (!body.name || !body.element || !body.urlSafeName || !body.job || !body.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Step 1: Create CharacterStats
    const createdStats = await prisma.characterStats.create({
      data: {
        Power: body.stats.Power || 0,
        ATK: body.stats.ATK || 0,
        HP: body.stats.HP || 0,
        DEF: body.stats.DEF || 0,
        CRIT: body.stats.CRIT || 0,
        HIT: body.stats.HIT || 0,
        FLEE: body.stats.FLEE || 0,
        SPD: body.stats.SPD || 0,
        REG: body.stats.REG || 0,
        MR: body.stats.MR || 0,
        PR: body.stats.PR || 0,
        LL: body.stats.LL || 0,
        CDR: body.stats.CDR || 0,
        CDA: body.stats.CDA || 0,
        MP: body.stats.MP || 0,
        PP: body.stats.PP || 0,
        CBR: body.stats.CBR || 0,
        IS: body.stats.IS || 0,
        HEAL: body.stats.HEAL || 0,
        TY: body.stats.TY || 0,
        RH: body.stats.RH || 0,
      },
    });
    
    // Step 2: Create Character & link stats
    const newCharacter = await prisma.character.create({
      data: {
        name: body.name,
        element: body.element,
        urlSafeName: body.urlSafeName,
        attackType: body.attackType,
        job: body.job,
        role: body.role,
        maxCap: body.maxCap,
        skins: body.skins, // Changed from numberOfSkins to skins
        characterStatsId: createdStats.id,
      },
    });
    
    // Step 3: Process Skills
    if (body.skillsData && body.skillsData.length > 0) {
      await Promise.all(
        body.skillsData.filter(skill => skill.name.trim() !== "").map(async (skillData) => {
          // Create the skill with the correct fields from schema
          const skill = await prisma.skill.create({
            data: {
              name: skillData.name,
              cooldown: skillData.cooldown,
              effectLvl1: skillData.effectLvl1,
              effectLvl2: skillData.effectLvl2,
              effectLvl3: skillData.effectLvl3,
              effectLvl4: skillData.effectLvl4,
            },
          });
          
          // Link skill to character
          await prisma.characterSkills.create({
            data: {
              skillId: skill.id,
              characterId: newCharacter.id,
              // level is optional since it defaults to 1
            },
          });
        })
      );
    }
    
    return NextResponse.json(newCharacter, { status: 201 });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add character" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Define request body structure
type CharacterRequestBody = {
  name: string;
  element: string;
  urlSafeName: string;
  attackType: string;
  job: string;
  role: string;
  maxCap: string;
  stats?: { [key: string]: number }; // Stats are key-value numbers
  skills?: string[]; // Skills are an array of names
};

export async function GET(): Promise<NextResponse> {
  try {
    const characters = await prisma.character.findMany();
    return NextResponse.json(characters); // ✅ Always return JSON
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    ); // ✅ Return error as JSON
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

    // ✅ Step 1: Create CharacterStats if provided
    let createdStats = null;
    if (body.stats) {
      createdStats = await prisma.characterStats.create({
        data: {
          ...body.stats, // Spread stats values
        },
      });
    }

    // ✅ Step 2: Create Character & link stats if applicable
    const newCharacter = await prisma.character.create({
      data: {
        name: body.name,
        element: body.element,
        urlSafeName: body.urlSafeName,
        attackType: body.attackType,
        job: body.job,
        role: body.role,
        maxCap: body.maxCap,
        characterStatsId: createdStats ? createdStats.id : null, // Link stats if they exist
      },
    });

    // ✅ Step 3: Process Skills
    if (body.skills && body.skills.length > 0) {
      const skillRecords = await Promise.all(
        body.skills.map(async (skillName) => {
          // Check if skill already exists, if not create it
          const skill = await prisma.skill.upsert({
            where: { name: skillName },
            update: {}, // If exists, do nothing
            create: {
              name: skillName,
              damage: 0, // Default values (adjust as needed)
              cooldown: 0,
            },
          });

          return {
            skillId: skill.id,
            characterId: newCharacter.id,
          };
        })
      );

      // Bulk insert character skills
      await prisma.characterSkills.createMany({
        data: skillRecords,
        skipDuplicates: true,
      });
    }

    return NextResponse.json(newCharacter, { status: 201 });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to add character" },
      { status: 500 }
    );
  }
}

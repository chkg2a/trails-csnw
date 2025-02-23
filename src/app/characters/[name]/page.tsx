import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CharacterStatsClient } from "./CharacterStatsClient";

interface CharacterPageProps {
  params: { name: string };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  try {
    const character = await prisma.character.findUnique({
      where: { urlSafeName: params.name },
      include: { characterStats: true },
    });

    if (!character) {
      notFound();
    }

    return (
      <div className="flex flex-col p-6">
        {/* Character Info Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-[180px] h-[250px]">
            <Image
              src={`/images/portrait/${character.urlSafeName}.png`}
              alt={character.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="text-gray-600">Element: {character.element}</p>
            <p className="text-gray-600">Attack Type: {character.attackType}</p>
            <p className="text-gray-600">Job: {character.job}</p>
            <p className="text-gray-600">Role: {character.role}</p>
          </div>
        </div>

        {/* Character Stats Component */}
        <CharacterStatsClient character={character} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching character:", error);
    notFound();
  }
}

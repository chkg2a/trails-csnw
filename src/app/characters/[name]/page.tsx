import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import "@/css/CharacterPage.css";

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
      <div className="flex flex-col py-8">
        {/* Character Info Section */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="container-character-portrait">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={`/images/hotshot/${character.urlSafeName}.png`}
                alt={character.name}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
          <div className="text-white text-center md:text-left w-full">
            <h1 className="text-3xl font-bold">{character.name}</h1>
          </div>
        </div>

      </div>
    );
  } catch (error) {
    console.error("Error fetching character:", error);
    notFound();
  }
}

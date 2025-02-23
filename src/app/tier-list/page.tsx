import { prisma } from "@/lib/prisma";
import CharacterCard from "@/components/CharacterCard";

// Function to fetch characters from the database
async function fetchCharacters() {
  return await prisma.character.findMany({
    include: { characterStats: true }, // Include stats if needed
  });
}

export default async function TierList() {
  const characters = await fetchCharacters();

  // Define tier placements (this can be adjusted or fetched dynamically)
  const tiers: Record<string, string[]> = {
    S: ["Renne Bright"],
    A: ["Alisa Reinford"],
    B: ["Rean Schwarzer", "Elliot Craig"],
    C: ["Machias Regnitz", "Gaius Worzel"],
    D: ["Jusis Albarea", "Fie Claussell"],
  };

  // Organizing characters into the respective tiers
  const categorizedCharacters: Record<string, typeof characters> = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
  };

  characters.forEach((char) => {
    for (const tier in tiers) {
      if (tiers[tier].includes(char.name)) {
        categorizedCharacters[tier].push(char);
        break;
      }
    }
  });

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Character Tier List</h1>

      <div className="w-full max-w-3xl space-y-6">
        {Object.entries(categorizedCharacters).map(([tier, chars]) => (
          <div key={tier} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{tier} Tier</h2>
            {chars.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {chars.map((char) => (
                  <CharacterCard
                    key={char.id}
                    elementType={char.element}
                    characterAvatar={char.urlSafeName}
                    characterName={char.name}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No characters in this tier.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

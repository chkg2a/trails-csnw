import CharacterCard from "@/components/CharacterCard";

export default function CharactersPage(){
  const characters = [
    {
      elementType: "earth.png",
      characterAvatar: "tita.png",
      characterName: "Tita Russell"
    },
  ]
  return (
    <div>
      <div>
        <h1>Trails of Cold Steel : Northern War Characters</h1>
      </div>
      <div>
        {characters.map((character) => (
          <CharacterCard
            elementType={character.elementType}
            characterAvatar={character.characterAvatar}
            characterName={character.characterName}
          />
        ))}
      </div>
    </div>
  )
}

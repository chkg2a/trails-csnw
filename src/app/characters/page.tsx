"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CharacterCard from "@/components/CharacterCard"; import SkeletonCharacterCard from "@/components/SkeletonCharacterCard";
import TitleTextBox from "@/components/TitleTextBox";
import { Character } from "@prisma/client";
import { elementTypes } from "@/constants/characterTraits";
import { useCharacterStore } from "@/store/useCharacterStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import "@/css/Characters.css";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const { searchTerm, attackType, job, role, elementType, setSearchTerm, setAttackType, setJob, setRole, setElementType } =
    useCharacterStore();

  const { setIsLoading } = useLoadingStore();
  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching data

    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setCharacters([]);
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading state is turned off after fetch
      });
  }, []);

  // Filtering Characters
  const filteredCharacters = characters.filter((char) => {
    return (
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (attackType ? char.attackType?.toLowerCase() === attackType.toLowerCase() : true) &&
      (job ? char.job?.toLowerCase() === job.toLowerCase() : true) &&
      (role ? char.role?.toLowerCase() === role.toLowerCase() : true) &&
      (elementType ? char.element?.toLowerCase() === elementType.toLowerCase() : true)
    );
  });

  return (
    <div>
      <TitleTextBox title="Characters" description="Search and filter characters." />

      {/* 🔍 Search & Filters */}
      <div>
        <div className="container-filter">
          <input
            type="text"
            placeholder="Enter Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="container-filter-forms"
          />

          <div className="flex items-center gap-2">
            {elementTypes.map((type) => (
              <div
                key={type}
                className={`container-elements ${elementType === type ? "bg-blue-500" : ""}`}
                onClick={() => setElementType(type)}
              >
                <Image src={`/images/${type.toLowerCase()}.png`} alt={type} width={30} height={30} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-character-cards">
        {isLoading ? (
          <>
            <SkeletonCharacterCard />
          </>
        ) : filteredCharacters.length > 0 ? (
          // Render character cards when characters are available
          filteredCharacters.map((char) => (
            <div className="container-character-card">
              <CharacterCard
                key={char.id}
                characterName={char.name}
                elementType={char.element}
                characterAvatar={char.urlSafeName}
              />
            </div>
          ))
        ) : (
          // Show "No characters found" message
          <p className="text-center col-span-full text-gray-500">
            No characters found.
          </p>
        )}
      </div>
    </div >
  );
}

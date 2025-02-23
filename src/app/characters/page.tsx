"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CharacterCard from "@/components/CharacterCard";
import TitleTextBox from "@/components/TitleTextBox";
import { Character } from "@prisma/client";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attackType, setAttackType] = useState("");
  const [job, setJob] = useState("");
  const [role, setRole] = useState("");
  const [elementType, setElementType] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState({
    attackType: false,
    job: false,
    role: false,
    elementType: false,
  });

  const attackTypes = ["Power", "Magic", "Speed"];
  const jobs = ["Warrior", "Tank", "Ranger", "Caster", "Support"];
  const roles = [
    "Range Effect",
    "Continuous Damage",
    "Powerful Damage",
    "Life Leech",
    "Assassin",
    "Buffer",
    "Debuffer",
    "Healer",
    "Action Inhibition",
  ];
  const elementTypes = ["Fire", "Water", "Wind", "Earth", "Time", "Space", "Mirage"];

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  // ✅ Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setAttackType("");
    setJob("");
    setRole("");
    setElementType("");
  };

  // ✅ Filter characters based on selections
  const filteredCharacters = characters.filter((char) => {
    return (
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (attackType ? char.attackType === attackType : true) &&
      (job ? char.job === job : true) &&
      (role ? char.role === role : true) &&
      (elementType ? char.element === elementType : true)
    );
  });

  const toggleDropdown = (dropdown: keyof typeof dropdownOpen) => {
    setDropdownOpen((prev) => ({
      attackType: false,
      job: false,
      role: false,
      elementType: false,
      [dropdown]: !prev[dropdown],
    }));
  };

  return (
    <div>
      <TitleTextBox title="Characters" description="Search and filter characters." />

      {/* 🔍 Search & Filters */}
      <div className="bg-[var(--primary)] shadow-md rounded-lg p-6 mb-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-black">
          {/* Search Box */}
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* 🔥 Custom Dropdown Component */}
          {[
            { label: "Attack Type", value: attackType, options: attackTypes, setValue: setAttackType },
            { label: "Job", value: job, options: jobs, setValue: setJob },
            { label: "Role", value: role, options: roles, setValue: setRole },
          ].map(({ label, value, options, setValue }, index) => (
            <div key={index} className="relative w-full">
              <button
                onClick={() => toggleDropdown(label.toLowerCase().replace(" ", "") as any)}
                className="p-3 w-full flex items-center justify-between border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {value || `All ${label}s`}
                <span>▼</span>
              </button>

              {dropdownOpen[label.toLowerCase().replace(" ", "") as keyof typeof dropdownOpen] && (
                <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="p-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setValue(option);
                        setDropdownOpen((prev) => ({ ...prev, [label.toLowerCase().replace(" ", "")]: false }));
                      }}
                    >
                      {option}
                    </div>
                  ))}
                  <div
                    className="p-3 text-center cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setValue("");
                      setDropdownOpen((prev) => ({ ...prev, [label.toLowerCase().replace(" ", "")]: false }));
                    }}
                  >
                    Clear Selection
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* 🌟 Custom Element Filter */}
          <div className="relative w-full">
            <button
              onClick={() => toggleDropdown("elementType")}
              className="p-3 w-full flex items-center justify-between border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {elementType ? (
                <span className="flex items-center">
                  <Image
                    src={`/images/${elementType.toLowerCase()}.png`}
                    alt={elementType}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  {elementType}
                </span>
              ) : (
                "All Elements"
              )}
              <span>▼</span>
            </button>

            {dropdownOpen.elementType && (
              <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                {elementTypes.map((type) => (
                  <div
                    key={type}
                    className="p-3 flex items-center cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setElementType(type);
                      setDropdownOpen({ ...dropdownOpen, elementType: false });
                    }}
                  >
                    <Image
                      src={`/images/${type.toLowerCase()}.png`}
                      alt={type}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {type}
                  </div>
                ))}
                <div
                  className="p-3 text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setElementType("");
                    setDropdownOpen({ ...dropdownOpen, elementType: false });
                  }}
                >
                  Clear Selection
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🔄 Reset Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* 🏆 Display Characters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              characterName={char.name}
              elementType={char.element}
              characterAvatar={char.urlSafeName}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No characters found.</p>
        )}
      </div>
    </div>
  );
}

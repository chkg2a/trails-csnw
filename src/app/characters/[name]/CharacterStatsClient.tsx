// CharacterStatsClient.tsx
'use client';

import { useState } from "react";

interface CharacterStats {
  id: string;
  power: number;
  ATK: number;
  HP: number;
  DEF: number;
  CRIT: number;
  HIT: number;
  FLEE: number;
  SPD: number;
  REG: number;
  MR: number;
  PR: number;
  LL: number;
  CDR: number;
  CDA: number;
  MP: number;
  PP: number;
  CBR: number;
  IS: number;
  HEAL: number;
  TY: number;
  RH: number;
}

interface Character {
  id: string;
  name: string;
  element: string;
  attackType: string;
  maxCap: string;
  job: string;
  role: string;
  urlSafeName: string;
  characterStats: CharacterStats | null;
}

function calculateStatAtLevel(baseStat: number, level: number, initialIncrease: number) {
  let multiplier = 1;

  for (let i = 1; i < level; i++) {
    multiplier *= 1 + Math.max(initialIncrease - (i - 1) * 0.001, 0.02); // Ensure min increase is 3%
  }

  return Math.round(baseStat * multiplier); // Round to keep it c
}

export function CharacterStatsClient({ character }: { character: Character }) {
  const [level, setLevel] = useState(1);

  const scaledStats = character.characterStats ? {
    ...character.characterStats,
    ATK: calculateStatAtLevel(character.characterStats.ATK, level, 0.049),
    HP: calculateStatAtLevel(character.characterStats.HP, level, 0.12),
    DEF: calculateStatAtLevel(character.characterStats.DEF, level, 0.08),
  } : null;

  const statDisplayNames: Record<string, { name: string; description: string }> = {
    power: { name: 'Power', description: 'Overall power rating' },
    ATK: { name: 'Attack', description: 'Base attack power' },
    HP: { name: 'Health', description: 'Hit points' },
    DEF: { name: 'Defense', description: 'Damage reduction' },
    CRIT: { name: 'Critical Rate', description: 'Chance to land critical hits' },
    HIT: { name: 'Hit Rate', description: 'Accuracy of attacks' },
    FLEE: { name: 'Flee Rate', description: 'Chance to dodge attacks' },
    SPD: { name: 'Speed', description: 'Movement and action speed' },
    REG: { name: 'Regeneration', description: 'HP recovery rate' },
    MR: { name: 'Magic Resistance', description: 'Magic damage reduction' },
    PR: { name: 'Physical Resistance', description: 'Physical damage reduction' },
    LL: { name: 'Life Leech', description: 'HP drain from attacks' },
    CDR: { name: 'Cooldown Reduction', description: 'Skill cooldown decrease' },
    CDA: { name: 'Critical Damage', description: 'Critical hit damage bonus' },
    MP: { name: 'Magic Pierce', description: 'Magic defense penetration' },
    PP: { name: 'Physical Pierce', description: 'Physical defense penetration' },
    CBR: { name: 'Combo Rate', description: 'Chance to perform combo attacks' },
    IS: { name: 'Initial Speed', description: 'Starting speed in battle' },
    HEAL: { name: 'Healing Bonus', description: 'Healing effectiveness' },
    TY: { name: 'Tenacity', description: 'Resistance to control effects' },
    RH: { name: 'Recovery Hit', description: 'Recovery from hits' }
  };

  return (
    <div className="mt-8">
      {/* Level Slider */}
      <div className="mb-6">
        <label htmlFor="level-slider" className="block text-sm font-medium text-gray-700 mb-2">
          Character Level: {level}
        </label>
        <input
          type="range"
          id="level-slider"
          min="1"
          max="360"
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>360</span>
        </div>
      </div>

      {/* Stats Table */}
      <h2 className="text-2xl font-semibold mb-4">Character Stats</h2>
      {scaledStats ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="text-left bg-gray-400/40 text-black">
                <th className="border border-gray-300 p-2">Stat</th>
                <th className="border border-gray-300 p-2">Value</th>
                <th className="border border-gray-300 p-2 hidden md:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(statDisplayNames).map(([key, { name, description }]) => {
                const value = scaledStats[key as keyof CharacterStats];
                const isScaledStat = ['ATK', 'HP', 'DEF'].includes(key);

                return (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-medium">
                      {name}
                      {isScaledStat && level > 1 && (
                        <span className="text-xs text-gray-500 ml-2">(Scaled)</span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {value ?? 'N/A'}
                    </td>
                    <td className="border border-gray-300 p-2 hidden md:table-cell text-gray-600">
                      {description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No stats available for this character.</p>
      )}
    </div>
  );
}

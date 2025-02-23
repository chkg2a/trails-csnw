"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCharacterPage() {
  const [name, setName] = useState("");
  const [element, setElement] = useState("Fire");
  const [maxCap, setMaxCap] = useState("SUL");
  const [urlSafeName, setUrlSafeName] = useState("");
  const [attackType, setAttackType] = useState("Power");
  const [job, setJob] = useState("Warrior");
  const [role, setRole] = useState("Range Effect");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Character Stats
  const [stats, setStats] = useState({
    power: 0, ATK: 0, HP: 0, DEF: 0, CRIT: 0, HIT: 0, FLEE: 0, SPD: 0,
    REG: 0, MR: 0, PR: 0, LL: 0, CDR: 0, CDA: 0, MP: 0, PP: 0, CBR: 0,
    IS: 0, HEAL: 0, TY: 0, RH: 0
  });

  // Character Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, element, urlSafeName, attackType, job, role, maxCap, stats, skills }),
    });

    if (res.ok) {
      router.push("/characters"); // Redirect to character list
    } else {
      const errorData = await res.json();
      setError(errorData.error || "Failed to add character");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Add New Character</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Character Name"
          value={name}
          onChange={(e) => {
            setUrlSafeName(e.target.value.toLowerCase().replace(/ /g, "-"));
            setName(e.target.value);
          }}
          className="p-2 border rounded"
          required
        />

        {/* Element Dropdown */}
        <select value={element} onChange={(e) => setElement(e.target.value)} className="p-2 border rounded" required>
          <option value="Fire">Fire</option>
          <option value="Earth">Earth</option>
          <option value="Wind">Wind</option>
          <option value="Water">Water</option>
          <option value="Space">Space</option>
          <option value="Time">Time</option>
          <option value="Mirage">Mirage</option>
        </select>

        {/* Attack Type Dropdown */}
        <select value={attackType} onChange={(e) => setAttackType(e.target.value)} className="p-2 border rounded" required>
          <option value="Power">Power</option>
          <option value="Magic">Magic</option>
          <option value="Speed">Speed</option>
        </select>

        {/* Max Cap Dropdown */}
        <select value={maxCap} onChange={(e) => setMaxCap(e.target.value)} className="p-2 border rounded" required>
          <option value="SUL">SUL</option>
          <option value="UL+">UL+</option>
        </select>

        {/* Job Dropdown */}
        <select value={job} onChange={(e) => setJob(e.target.value)} className="p-2 border rounded" required>
          <option value="Warrior">Warrior</option>
          <option value="Tank">Tank</option>
          <option value="Ranger">Ranger</option>
          <option value="Caster">Caster</option>
          <option value="Support">Support</option>
        </select>

        {/* Role Dropdown */}
        <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border rounded" required>
          <option value="Range Effect">Range Effect</option>
          <option value="Continuous Damage">Continuous Damage</option>
          <option value="Powerful Damage">Powerful Damage</option>
          <option value="Life Leech">Life Leech</option>
          <option value="Assassin">Assassin</option>
          <option value="Buffer">Buffer</option>
          <option value="Debuffer">Debuffer</option>
          <option value="Healer">Healer</option>
          <option value="Action Inhibition">Action Inhibition</option>
        </select>

        {/* Character Stats */}
        <div>
          <h3 className="text-lg font-semibold">Character Stats</h3>
          {Object.keys(stats).map((stat) => (
            <div key={stat} className="flex items-center justify-between">
              <label className="text-sm">{stat}</label>
              <input
                type="number"
                value={stats[stat as keyof typeof stats]}
                onChange={(e) =>
                  setStats((prevStats) => ({
                    ...prevStats,
                    [stat]: parseInt(e.target.value) || 0
                  }))
                }
                className="p-1 border rounded w-20"
              />
            </div>
          ))}
        </div>

        {/* Character Skills */}
        <div>
          <h3 className="text-lg font-semibold">Character Skills</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={() => {
                if (skillInput.trim() && !skills.includes(skillInput.trim())) {
                  setSkills([...skills, skillInput.trim()]);
                  setSkillInput("");
                }
              }}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex justify-between items-center text-sm text-gray-700">
                <span>- {skill}</span>
                <button
                  type="button"
                  onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {loading ? "Adding..." : "Add Character"}
        </button>
      </form>
    </div>
  );
}

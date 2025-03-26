"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCharacterPage() {
  const [name, setName] = useState("");
  const [urlSafeName, setUrlSafeName] = useState("");
  const [element, setElement] = useState("Fire");
  const [attackType, setAttackType] = useState("Power");
  const [job, setJob] = useState("Warrior");
  const [role, setRole] = useState("Range Effect");
  const [maxCap, setMaxCap] = useState("SUL");
  const [skins, setSkins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [stats, setStats] = useState({
    Power: 0, ATK: 0, HP: 0, DEF: 0, CRIT: 0, HIT: 0, FLEE: 0, SPD: 0,
    REG: 0, MR: 0, PR: 0, LL: 0, CDR: 0, CDA: 0, MP: 0, PP: 0, CBR: 0,
    IS: 0, HEAL: 0, TY: 0, RH: 0
  });

  const [skillsData, setSkillsData] = useState([
    {
      name: "",
      cooldown: 0,
      effectLvl1: "",
      effectLvl2: "",
      effectLvl3: "",
      effectLvl4: ""
    },
    {
      name: "",
      cooldown: 0,
      effectLvl1: "",
      effectLvl2: "",
      effectLvl3: "",
      effectLvl4: ""
    },
    {
      name: "",
      cooldown: 0,
      effectLvl1: "",
      effectLvl2: "",
      effectLvl3: "",
      effectLvl4: ""
    }
  ]);

  const updateSkillData = (index: number, field: string, value: string | number) => {
    const newSkillsData = [...skillsData];
    newSkillsData[index] = {
      ...newSkillsData[index],
      [field]: value
    };
    setSkillsData(newSkillsData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name, 
        element, 
        urlSafeName, 
        attackType, 
        job, 
        role, 
        maxCap, 
        skins,
        stats, 
        skillsData 
      }),
    });

    if (res.ok) {
      router.push("/characters");
    } else {
      const errorData = await res.json();
      setError(errorData.error || "Failed to add character");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Add New Character</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Character Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name">Character Name</label>
            <input
              type="text"
              placeholder="Character Name"
              value={name}
              onChange={(e) => {
                setUrlSafeName(e.target.value.toLowerCase().replace(/ /g, "-"));
                setName(e.target.value);
              }}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label>Element</label>
            <select value={element} onChange={(e) => setElement(e.target.value)} className="p-2 border rounded w-full">
              {["Fire", "Earth", "Wind", "Water", "Space", "Time", "Mirage"].map((el) => (
                <option key={el} value={el}>{el}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Attack Type</label>
            <select value={attackType} onChange={(e) => setAttackType(e.target.value)} className="p-2 border rounded w-full">
              {["Power", "Magic", "Speed"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Max Cap</label>
            <select value={maxCap} onChange={(e) => setMaxCap(e.target.value)} className="p-2 border rounded w-full">
              {["SUL", "UL+"].map((cap) => (
                <option key={cap} value={cap}>{cap}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Job</label>
            <select value={job} onChange={(e) => setJob(e.target.value)} className="p-2 border rounded w-full">
              {["Warrior", "Tank", "Ranger", "Caster", "Support"].map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border rounded w-full">
              {["Range Effect", "Continuous Damage", "Powerful Damage", "Life Leech", "Assassin", "Buffer", "Debuffer", "Healer", "Action Inhibition"].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="numberOfSkins">Number of Skins</label>
            <input
              type="number"
              id="numberOfSkins"
              placeholder="Number of Skins"
              value={skins}
              onChange={(e) => setSkins(parseInt(e.target.value) || 0)}
              className="p-2 border rounded w-full"
              min="0"
            />
          </div>
        </div>

        {/* Character Stats */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Character Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(stats).map((stat) => (
              <div key={stat} className="flex items-center gap-2">
                <label className="text-sm min-w-16">{stat}</label>
                <input
                  type="number"
                  value={stats[stat as keyof typeof stats]}
                  onChange={(e) =>
                    setStats((prevStats) => ({
                      ...prevStats,
                      [stat]: parseInt(e.target.value) || 0
                    }))
                  }
                  className="p-1 border rounded w-16"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Character Skills */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4">Character Skills</h3>
          
          {skillsData.map((skill, skillIndex) => (
            <div key={skillIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Skill {skillIndex + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex flex-col">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={(e) => updateSkillData(skillIndex, "name", e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Cooldown</label>
                  <input
                    type="number"
                    placeholder="Cooldown"
                    value={skill.cooldown}
                    onChange={(e) => updateSkillData(skillIndex, "cooldown", parseInt(e.target.value) || 0)}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <h5 className="text-sm font-medium mt-2">Skill Effects</h5>
                {[1, 2, 3, 4].map((lvl) => (
                  <div key={lvl} className="flex flex-col">
                    <label className="text-sm">Effect Level {lvl}</label>
                    <input
                      type="text"
                      placeholder={`Effect at Level ${lvl}`}
                      value={skill[`effectLvl${lvl}` as keyof typeof skill]}
                      onChange={(e) => updateSkillData(skillIndex, `effectLvl${lvl}`, e.target.value)}
                      className="p-2 border rounded w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
          {loading ? "Adding..." : "Add Character"}
        </button>
      </form>
    </div>
  );
}

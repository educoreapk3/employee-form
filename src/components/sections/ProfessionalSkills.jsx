import { useState } from "react";

export default function ProfessionalSkills({ form }) {
  const [draft, setDraft] = useState("");
  const skills = form.watch("skills") || [];

  const addSkill = () => {
    const skill = draft.trim();
    if (!skill) return;
    if (!skills.some(value => value.toLowerCase() === skill.toLowerCase())) {
      form.setValue("skills", [...skills, skill], { shouldDirty: true });
    }
    setDraft("");
  };

  return (
    <section className="space-y-3">
      <h3 className="text-base">Professional Skills</h3>
      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <label htmlFor="professional-skill" className="text-base">Add Skills</label>
          <input
            id="professional-skill"
            value={draft}
            onChange={event => setDraft(event.target.value)}
            onKeyDown={event => {
              if (event.key === "Enter") { event.preventDefault(); addSkill(); }
            }}
            placeholder="Enter the Details"
            className="border border-[#00000066] rounded-md p-3 text-base placeholder:text-gray-400"
          />
        </div>
        <button type="button" onClick={addSkill} className="px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white">Add Skill</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={skill} className="inline-flex items-center gap-2 px-2 py-1 border border-pink-500 rounded-md text-pink-500 text-sm">
            {skill}
            <button type="button" aria-label={`Remove ${skill}`} className="text-lg leading-none" onClick={() => form.setValue("skills", skills.filter((_, skillIndex) => skillIndex !== index), { shouldDirty: true })}>
              ×
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../form/Input";
import Select from "../form/Select";
import Textarea from "../form/Textarea";

const positions = ["Onsite", "Hybrid", "Remote"].map(value => ({ label: value, value }));
const jobTypes = ["Full Time", "Part Time", "Contract", "Temporary", "Internship"].map(value => ({ label: value, value }));
const emptyExperience = () => ({ role: "", institute: "", country: "", from: "", to: "", current: false, subject: "", grades: "", position: "Onsite", jobType: "Full Time", description: "" });

export default function EmploymentHistory({ form, countries }) {
  const { control, register, watch, setValue } = form;
  const { fields, append, update, remove } = useFieldArray({ control, name: "experiences" });
  const [editing, setEditing] = useState(null);
  const current = watch("tempExperience.current");

  const reset = () => {
    setEditing(null);
    setValue("tempExperience", emptyExperience());
  };
  const save = () => {
    const item = { ...emptyExperience(), ...watch("tempExperience") };
    if (!item.role.trim() || !item.institute.trim() || !item.country || !item.from || (!item.current && !item.to)) {
      toast.error("Enter job title, institute, country and employment dates");
      return;
    }
    if (!item.current && item.from > item.to) {
      toast.error("From date must be before or equal to To date");
      return;
    }
    if (item.current) item.to = "";
    if (editing === null) append(item);
    else update(editing, item);
    reset();
  };

  return (
    <section className="space-y-4">
      <h3 className="text-base">Enter your experience details</h3>
      {fields.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-xl bg-[#FAFAFA] p-4 flex gap-4 justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <p className="font-medium">{item.institute}</p>
              <p className="text-pink-500">{item.role}</p>
            </div>
            <p className="text-sm mt-1">{item.jobType} · {item.from} – {item.current ? "Present" : item.to}</p>
            <p className="text-sm text-gray-500 mt-1">{countries.find(country => String(country.value) === String(item.country))?.label || item.country} · {item.position}</p>
            {(item.subject || item.grades) && <p className="text-sm text-gray-500 mt-1">{[item.subject, item.grades].filter(Boolean).join(" · ")}</p>}
            <p className="text-sm text-gray-500 mt-1 whitespace-pre-wrap break-words">{item.description}</p>
          </div>
          <div className="flex gap-3 shrink-0 items-start">
            <button type="button" aria-label="Edit experience" className="text-amber-500" onClick={() => { setEditing(index); setValue("tempExperience", { ...item }); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m16 3 5 5M3 21l5-1L21 7a2 2 0 0 0-5-5L3 15z" /></svg>
            </button>
            <button type="button" aria-label="Delete experience" className="text-red-600" onClick={() => { remove(index); if (editing === index) reset(); else if (editing !== null && index < editing) setEditing(editing - 1); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" /></svg>
            </button>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Job Title/Role" name="tempExperience.role" placeholder="Enter the Details" register={register} />
        <Input label="Name of Institute" name="tempExperience.institute" placeholder="Enter the Details" register={register} />
        <Select label="Country" name="tempExperience.country" options={countries} register={register} />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_auto] gap-3">
          <Input type="date" label="From" name="tempExperience.from" register={register} />
          <Input type="date" label="To" name="tempExperience.to" register={register} disabled={Boolean(current)} />
          <label className="flex items-center gap-2 text-sm sm:col-span-2 xl:col-span-1 xl:pt-7">
            <input type="checkbox" {...register("tempExperience.current")} onChange={event => { setValue("tempExperience.current", event.target.checked); if (event.target.checked) setValue("tempExperience.to", ""); }} />
            I am currently working here
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <Input label="Subject" name="tempExperience.subject" placeholder="Enter Details" register={register} />
        <Input label="Grades" name="tempExperience.grades" placeholder="Enter Details" register={register} />
        <Select label="Position" name="tempExperience.position" options={positions} register={register} />
        <Select label="Job type" name="tempExperience.jobType" options={jobTypes} register={register} />
      </div>
      <Textarea label="Short Description" name="tempExperience.description" placeholder="Enter the Details" register={register} />
      <div className="flex justify-end gap-3">
        {editing !== null && <button type="button" onClick={reset} className="px-4 py-2 border rounded-md">Cancel</button>}
        <button type="button" onClick={save} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">{editing === null ? "Add Experience" : "Update Experience"}</button>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "../form/Select";
import Input from "../form/Input";
import FileUpload from "../form/FileUpload";
import TrashImg from "../../assets/trash.png";
import EmploymentHistory from "./EmploymentHistory";
import ProfessionalSkills from "./ProfessionalSkills";

const UploadItem = ({ item, showDate = true, onDelete, onEdit, countries }) => {
  const file = item.file;
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!(file instanceof File)) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  const isPdf = file?.type === "application/pdf" || (item.attachment && item.attachment.includes('.pdf'));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-lg p-4 border">
      <div className="flex items-center gap-4">
        {isPdf ? (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded text-xl">
            📄
          </div>
        ) : (item.attachment || preview) ? (
          <img
            src={preview || item.attachment}
            alt="upload"
            className="w-12 h-12 object-cover rounded"
          />
        ) : <span className="text-sm text-gray-500">No attachment</span>}

        <div>
          <p className="font-medium text-sm sm:text-base">
            {item.type || countries?.find((c) => c.value == item.country)?.label || item.country}
          </p>
          {showDate && (
            <>
              <p className="text-sm sm:text-base">{item.university}</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {item.from || item.date}{item.to ? ` – ${item.to}` : ""}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
      {onEdit && <button type="button" onClick={onEdit} aria-label="Edit degree" className="text-amber-500 p-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m16 3 5 5M3 21l5-1L21 7a2 2 0 0 0-5-5L3 15z" /></svg>
      </button>}
      <button
        type="button"
        onClick={onDelete}
        aria-label={showDate ? "Delete degree" : "Delete DBS record"}
        className="self-end sm:self-auto"
      >
        <img src={TrashImg} alt="delete" className="w-5 h-5" />
      </button>
      </div>
    </div>
  );
};



const ProfessionalCredentials = ({ form, countries }) => {
  const { control, register, setValue, watch } = form;
  const [editingDegree, setEditingDegree] = useState(null);

  const { append: addDegree, remove: removeDegree, update: updateDegree } = useFieldArray({
    control,
    name: "degrees",
  });

  const { append: addDBS, remove: removeDBS } = useFieldArray({
    control,
    name: "dbs",
  });

  const degrees = watch("degrees");
  const dbs = watch("dbs");

  const addDegreeHandler = () => {
    if (editingDegree === null && degrees?.length >= 5) {
      toast.error("Maximum 5 degrees allowed");
      return;
    }

    const temp = watch("tempDegree");
    if (!temp?.type?.trim() || !temp?.university?.trim() || !temp?.from || !temp?.to || (!temp?.file && !temp?.attachment)) {
      toast.error("Enter degree, university, dates and an attachment");
      return;
    }
    if (temp.from > temp.to) {
      toast.error("From date must be before or equal to To date");
      return;
    }

    if (editingDegree === null) addDegree({ ...temp, date: temp.to, hrapp_ed_id: 0 });
    else updateDegree(editingDegree, { ...temp, date: temp.to });
    setEditingDegree(null);
    setValue("tempDegree", { type: "", university: "", from: "", to: "", file: null, attachment: null });
  };

  const addDBSHandler = () => {
    if (dbs?.length >= 5) {
      toast.error("Maximum 5 DBS records allowed");
      return;
    }

    const temp = watch("tempDBS");
    if (!temp?.country || !temp?.file) {
      toast.error("Select a country and upload a DBS document");
      return;
    }

    addDBS({ ...temp, hrapp_dbs_id: 0 });
    setValue("tempDBS.country", "");
    setValue("tempDBS.file", null, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
        Education & Professional Credentials
      </h2>
      <p className="text-base">Please Add Your Degrees &amp; Diplomas:</p>

      {/* ===== Degrees List ===== */}
      {degrees?.length > 0 && (
        <div className="space-y-3">
          {degrees.map((item, index) => (
            <UploadItem
              key={item.id || `degree-${index}`}
              item={item}
              onEdit={() => {
                setEditingDegree(index);
                setValue("tempDegree", { ...item, from: item.from || "", to: item.to || item.date || "" });
              }}
              onDelete={() => {
                removeDegree(index);
                if (editingDegree === index) {
                  setEditingDegree(null);
                  setValue("tempDegree", {});
                } else if (editingDegree !== null && index < editingDegree) setEditingDegree(editingDegree - 1);
              }}
            />
          ))}
        </div>
      )}

      {/* ===== Add Degree ===== */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Degree Type"
            name="tempDegree.type"
            placeholder="Enter the Details"
            register={register}
          />

          <Input
            label="University/School"
            name="tempDegree.university"
            placeholder="Enter the Details"
            register={register}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="date" label="From" name="tempDegree.from" register={register} />
          <Input type="date" label="To" name="tempDegree.to" register={register} />
        </div>

        <FileUpload
          label="Upload Degree"
          name="tempDegree.file"
          register={register}
          setValue={setValue}
          watch={(name) => watch(name) || watch("tempDegree.attachment")}
        />

        <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={addDegreeHandler}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white`}
        >
          {editingDegree === null ? "Add Degree" : "Update Degree"}
        </button>
        {editingDegree !== null && <button type="button" className="px-4 py-2 border rounded-lg ml-3" onClick={() => { setEditingDegree(null); setValue("tempDegree", {}); }}>Cancel</button>}
        </div>
      </div>

      <EmploymentHistory form={form} countries={countries} />
      <ProfessionalSkills form={form} />
      <h3 className="text-base">Police Clearance / DBS</h3>

      {/* ===== DBS List ===== */}
      {dbs?.length > 0 && (
        <div className="space-y-3">
          {dbs.map((item, index) => (
            <UploadItem
              key={index}
              item={item}
              showDate={false}
              onDelete={() => removeDBS(index)}
              countries={countries}
            />
          ))}
        </div>
      )}

      {/* ===== Add DBS ===== */}
      <div className="space-y-4">

        <Select
          label="Select Country"
          name="tempDBS.country"
          register={register}
          options={countries}
          placeholder="Select Country"
        />

        <FileUpload
          label="Upload DBS"
          name="tempDBS.file"
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <div className="flex justify-end">
        <button
          type="button"
          onClick={addDBSHandler}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white`}
        >
          Add DBS
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCredentials;


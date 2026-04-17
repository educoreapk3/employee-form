import { useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "../form/Select";
import Input from "../form/Input";
import FileUpload from "../form/FileUpload";
import TrashImg from "../../assets/trash.png";

const UploadItem = ({ item, showDate = true, onDelete, countries }) => {
  const file = item.file;
  const isPdf = file?.type === "application/pdf" || (item.attachment && item.attachment.includes('.pdf'));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-lg p-4 border">
      <div className="flex items-center gap-4">
        {isPdf ? (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded text-xl">
            📄
          </div>
        ) : (
          <img
            src={item.attachment ? item.attachment : URL.createObjectURL(file)}
            alt="upload"
            className="w-12 h-12 object-cover rounded"
          />
        )}

        <div>
          <p className="font-medium text-sm sm:text-base">
            {item.type || countries?.find((c) => c.value == item.country)?.label || item.country}
          </p>
          {showDate && (
            <p className="text-xs sm:text-sm text-gray-500">
              {item.date}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="self-end sm:self-auto"
      >
        <img src={TrashImg} alt="delete" className="w-5 h-5" />
      </button>
    </div>
  );
};



const ProfessionalCredentials = ({ form, countries }) => {
  const { control, register, setValue, watch } = form;

  const { append: addDegree, remove: removeDegree } = useFieldArray({
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
    if (degrees?.length >= 5) {
      toast.error("Maximum 5 degrees allowed");
      return;
    }

    const temp = watch("tempDegree");
    if (!temp?.type || !temp?.date || !temp?.file) return;

    addDegree({ ...temp, hrapp_ed_id: 0 });
    setValue("tempDegree.type", "");
    setValue("tempDegree.date", "");
    setValue("tempDegree.file", null, { shouldValidate: true });
  };

  const addDBSHandler = () => {
    if (dbs?.length >= 5) {
      toast.error("Maximum 5 DBS records allowed");
      return;
    }

    const temp = watch("tempDBS");
    if (!temp?.country || !temp?.file) return;

    addDBS({ ...temp, hrapp_dbs_id: 0 });
    setValue("tempDBS.country", "");
    setValue("tempDBS.file", null, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
        Education & Professional Credentials
      </h2>

      {/* ===== Degrees List ===== */}
      {degrees?.length > 0 && (
        <div className="space-y-3">
          {degrees.map((item, index) => (
            <UploadItem
              key={item.id || `degree-${index}`}
              item={item}
              onDelete={() => removeDegree(index)}
            />
          ))}
        </div>
      )}

      {/* ===== Add Degree ===== */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Degree Type"
            name="tempDegree.type"
            register={register}
          />

          <Input
            type="date"
            label="Date"
            name="tempDegree.date"
            register={register}
          />
        </div>

        <FileUpload
          label="Upload Degree"
          name="tempDegree.file"
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <button
          type="button"
          onClick={addDegreeHandler}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white`}
        >
          Add Degree
        </button>
      </div>

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
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">

        <Select
          label="Country"
          name="tempDBS.country"
          register={register}
          options={countries}
        />

        <FileUpload
          label="Upload DBS"
          name="tempDBS.file"
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <button
          type="button"
          onClick={addDBSHandler}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white`}
        >
          Add DBS
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCredentials;


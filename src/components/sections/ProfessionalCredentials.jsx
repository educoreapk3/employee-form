import { useFieldArray } from "react-hook-form";
import Select from "../form/Select";
import Input from "../form/Input";
import FileUpload from "../form/FileUpload";
import TrashImg from "../../assets/trash.png";

const UploadItem = ({ key, item, showDate = true, onDelete }) => {
  console.log(item)
  const file = item.file;
  const isPdf = file?.type === "application/pdf";

  return (
    <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-lg p-4 border">
      <div className="flex items-center gap-4">
        {isPdf ? (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded text-xl">
            📄
          </div>
        ) : (
          <img
            src={URL.createObjectURL(file)}
            alt="upload"
            className="w-12 h-12 object-cover rounded"
          />
        )}

        <div>
          <p className="font-medium text-sm sm:text-base">
            {item.type || item.country}
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
    const temp = watch("tempDegree");
    if (!temp?.type || !temp?.date || !temp?.file) return;

    addDegree(temp);
    setValue("tempDegree.type", "");
    setValue("tempDegree.date", "");
    setValue("tempDegree.file", null);
  };

  const addDBSHandler = () => {
    const temp = watch("tempDBS");
    if (!temp?.country || !temp?.file) return;

    addDBS(temp);
    setValue("tempDBS.country", "");
    setValue("tempDBS.file", null);
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
              key={item.file?.name + index}
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
        />

        <button
          type="button"
          onClick={addDegreeHandler}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
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
        />

        <button
          type="button"
          onClick={addDBSHandler}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add DBS
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCredentials;


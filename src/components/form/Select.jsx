const Select = ({
  label,
  name,
  register,
  error,
  options = [],
  placeholder = "Select",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-normal text-black">
        {label}
      </label>

      <select
        {...register(name)}
        className="
          border border-[#00000066]
          rounded-md p-3 text-base font-normal
          text-gray-700
        "
      >
        <option value="">{placeholder}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-xs text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Select;

const Input = ({
  label,
  register,
  name,
  error,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-normal text-black">
        {label}
      </label>


      <input
        type={type}
        min={type === "number" ? 0 : undefined}
        placeholder={placeholder}
        {...register(name, {
          valueAsNumber: type === "number",
          min: type === "number"
            ? { value: 0, message: "Value cannot be negative" }
            : undefined,
        })}
        onKeyDown={(e) => {
          if (type === "number" && e.key === "-") {
            e.preventDefault();
          }
        }}
        className="border border-[#00000066] rounded-md p-3 text-base font-normal placeholder:text-gray-400"
      />

      {error && (
        <span className="text-xs text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Input;

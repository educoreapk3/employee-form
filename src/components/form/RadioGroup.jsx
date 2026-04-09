const RadioGroup = ({
  label,
  name,
  options = [],
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-normal text-black mb-2">
        {label}
      </label>

      <div className="flex gap-4 overflow-hidden">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex-1 cursor-pointer max-w-52"
          >
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="peer hidden"
            />

            <span
              className=" rounded-2xl
                block px-4 py-3 text-sm font-normal
                text-[#0B121F]
                border border-[#0000001F]
                peer-checked:bg-[#E8458A]
                peer-checked:text-white
                transition
              "
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <span className="text-xs text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default RadioGroup;

const Textarea = ({ label, placeholder,  register, name }) => {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <label className="text-base font-normal text-black">{label}</label>
      <textarea
        rows={5}
        placeholder={placeholder}
        {...register(name)}
        className="border border-[#00000066] rounded-md p-3 text-base font-normal px-3 py-2 placeholder:text-gray-400"
      />
    </div>
  );
};

export default Textarea;

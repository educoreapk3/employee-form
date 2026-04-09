const StepItem = ({ label, active }) => {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`w-3 h-3 rounded-full ${
          active ? "bg-green-500" : "bg-gray-300"
        }`}
      />
      <span className={`${active ? "font-semibold" : ""}`}>
        {label}
      </span>
    </div>
  );
};

export default StepItem;

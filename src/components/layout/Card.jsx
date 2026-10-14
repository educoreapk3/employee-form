const Card = ({ children }) => {
  return (
    <div className="application-card bg-white rounded-tr-2xl rounded-tl-2xl p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 no-scrollbar">
      {children}
    </div>
  );
};


export default Card;

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-tr-2xl rounded-tl-2xl shadow p-8 overflow-y-auto flex-1 no-scrollbar">
      {children}
    </div>
  );
};


export default Card;

import LogoImg from "../../assets/logo.png";

// const PageWrapper = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-white p-4 pt-0">
//       <div className="flex items-center justify-between px-4 py-6">
//         <div className="flex items-center gap-1">
//           <img src={LogoImg} alt="Educore Logo" />
//           <p className="text-3xl font-normal text-black">Educore</p>
//         </div>
//         <p className="text-black font-normal text-base italic opacity-60">
//           Join our team of dedicated Educators
//         </p>
//       </div>
//       <div className="bg-[#F2F2F2] p-4 rounded-2xl">{children}</div>
//     </div>
//   );
// };

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-white p-4 pt-0">
      {/* Header */}
      <div className="
        flex flex-col gap-3
        sm:flex-row sm:items-center sm:justify-between
        px-2 sm:px-4 py-4 sm:py-6
      ">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={LogoImg} alt="Educore Logo" className="h-8 sm:h-10" />
          <p className="text-xl sm:text-3xl font-normal text-black">
            Educore
          </p>
        </div>

        {/* Tagline */}
        <p className="
          text-sm sm:text-base
          text-black italic opacity-60
          text-left sm:text-right
        ">
          Join our team of dedicated Educators
        </p>
      </div>

      {/* Content */}
      <div className="bg-[#F2F2F2] p-3 sm:p-4 rounded-2xl">
        {children}
      </div>
    </div>
  );
};


export default PageWrapper;

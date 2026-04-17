import { steps } from "../../utils/constants";
import { TickSvg } from "../../static/SvgImages";

const isFieldFilled = (value) => {
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (value instanceof File) return true;
  if (typeof value === "number") return true;
  if (typeof value === "string") return value.trim() !== "";

  return true;
};

const getStepStatus = (step, formData, errors, touchedFields) => {
  const filledCount = step.fields.filter((f) =>
    isFieldFilled(formData?.[f])
  ).length;

  const hasError = step.fields.some((f) => errors?.[f]);

  const isTouched = step.fields.some((f) => touchedFields?.[f]);

  if (filledCount === 0 && !isTouched) return "upcoming";
  if (hasError) return "error";
  if (filledCount === step.fields.length) return "completed";

  return "active";
};

const StepSidebar = ({ formData, errors, touchedFields }) => {

  const completedSteps = steps.filter((step) => {
    const status = getStepStatus(step, formData, errors, touchedFields);
    return status === "completed" || status === "active";
  }).length;

  const progressHeight = (completedSteps / steps.length) * 100;

  // console.log(completedSteps, progressHeight)

  return (
    <div className="rounded-xl p-6 hidden lg:block">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute right-2.5 top-4 h-full w-1 bg-gray-300" />
        <div
          className="absolute right-2.5 top-4 w-1 bg-pink-500 transition-all duration-300"
          style={{ height: `${progressHeight}%` }}
        />

        <div className="space-y-8">
          {steps.map((step) => {
            const status = getStepStatus(step, formData, errors, touchedFields);
            // console.log(step.id, status)

            return (
              <div key={step.id} className="relative flex items-center justify-end gap-4">
                {/* Label */}
                <div
                  className={`p-4 rounded-2xl text-base text-[#0B121F] flex justify-center items-center gap-2
                    ${(status === "active" || status === "completed")
                      ? "bg-white shadow font-semibold border-l-4 border-pink-500"
                      : status === "error" ?
                        "bg-white shadow font-semibold border-l-4 border-[#B10000]" : "bg-white shadow font-semibold"
                    }
                  `}
                >
                  {status === "completed" && (<span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#44BE48] text-white opacity-60"><TickSvg /></span>)}
                  {status === "error" && <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-sm font-bold opacity-60 bg-[#B10000]">!</span>}{step.label}
                </div>
                {/* Circle */}
                <div
                  className={`z-10 w-6 h-6 rounded-full flex items-center justify-center
                    ${(status === "active" || status === "completed")
                      ? "bg-[#E8458A]"
                      : "bg-gray-300"
                    }
                  `}
                >
                  {(status === "active" || status === "completed" || status === "error" || status === "upcoming") && <span className="w-3 h-3 flex items-center justify-center bg-white rounded-full"></span>}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepSidebar;

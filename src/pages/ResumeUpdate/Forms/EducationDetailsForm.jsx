import React from "react";
import Input from "../../../components/Inputs/Input";
import { Plus, Trash2 } from "lucide-react";

const EducationDetailsForm = ({
  educationInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Riwayat Pendidikan
      </h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {educationInfo.map((education, index) => (
          <div
            key={index}
            className="border border-slate-200 dark:border-white/10 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Derajat"
                placeholder="Sarjana Ilmu Komputer"
                type="text"
                value={education.degree || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "degree", target.value)
                }
              />

              <Input
                label="Lembaga"
                placeholder="XYZ University"
                type="text"
                value={education.institution || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "institution", target.value)
                }
              />

              <Input
                label="Tanggal Mulai"
                type="month"
                className="[&::-webkit-calendar-picker-indicator]:invert"
                value={education.startDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "startDate", target.value)
                }
              />

              <Input
                label="Tanggal Akhir"
                type="month"
                className="[&::-webkit-calendar-picker-indicator]:invert"
                value={education.endDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "endDate", target.value)
                }
              />
            </div>

            {educationInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm text-red-400 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-900/30 text-purple-300 text-sm font-medium hover:bg-purple-900/50 cursor-pointer"
          onClick={() =>
            addArrayItem({
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          <Plus /> Tambahkan Riwayat Pendidikan
        </button>
      </div>
    </div>
  );
};

export default EducationDetailsForm;

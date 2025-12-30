import React from "react";
import Input from "../../../components/Inputs/Input";
import { Plus, Trash2 } from "lucide-react";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const AdditionalInfoFrom = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Informasi Tambahan
      </h2>

      {/* Languages Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Bahasa
        </h3>
        <div className="flex flex-col gap-4">
          {languages?.map((lang, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-white/10 p-4 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Input
                  label="Bahasa"
                  placeholder="Misal, English"
                  value={lang.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem("languages", index, "name", target.value)
                  }
                />

                <div>
                  <label className="text-xs text-slate-700 font-semibold dark:text-slate-300 mb-7 block">
                    Presentase
                  </label>
                  <RatingInput
                    value={lang.progress || 0}
                    onChange={(value) =>
                      updateArrayItem("languages", index, "progress", value)
                    }
                    total={5}
                    activeColor="#0ea5e9"
                    inactiveColor="#e0f2fe"
                  />
                </div>
              </div>

              {languages.length > 1 && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-sm text-red-400 hover:underline cursor-pointer"
                  onClick={() => removeArrayItem("languages", index)}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-900/30 text-purple-300 text-sm font-medium hover:bg-purple-900/50 cursor-pointer"
            onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
          >
            <Plus /> Tambahkan Bahasa
          </button>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mt-8 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Minat/Bakat
        </h3>
        <div className="flex flex-col">
          {interests?.map((interest, index) => (
            <div key={index} className="relative rounded-lg">
              <Input
                placeholder="Misal, Membaca"
                value={interest || ""}
                onChange={({ target }) =>
                  updateArrayItem("interests", index, null, target.value)
                }
              />

              {interests.length > 1 && (
                <button
                  type="button"
                  className="absolute top-6.5 right-3 text-sm text-red-400 hover:underline cursor-pointer"
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-900/30 text-purple-300 text-sm font-medium hover:bg-purple-900/50 cursor-pointer"
            onClick={() => addArrayItem("interests", "")}
          >
            <Plus /> Tambahkan Minat/Bakat
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoFrom;

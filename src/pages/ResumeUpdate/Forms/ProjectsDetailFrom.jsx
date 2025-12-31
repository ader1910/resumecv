import React from "react";
import Input from "../../../components/Inputs/Input";
import { Plus, Trash2 } from "lucide-react";

const ProjectsDetailFrom = ({
  projectInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Pengalaman Project Yang Pernah Dibuat
      </h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectInfo.map((project, index) => (
          <div
            key={index}
            className="border border-slate-200 dark:border-white/10 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Nama Project"
                  placeholder="Portfolio Website"
                  type="text"
                  value={project.title || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "title", target.value)
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs text-slate-700 font-semibold dark:text-slate-300">
                  Keterangan
                </label>
                <textarea
                  placeholder="Deskripsi mengenai project yang dibuat"
                  className="form-input w-full mt-1"
                  rows={3}
                  value={project.description || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "description", target.value)
                  }
                />
              </div>

              <Input
                label="Tautan Github"
                placeholder="https://github.com/username/project"
                type="url"
                value={project.github || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "github", target.value)
                }
              />

              <Input
                label="URL Demo Langsung"
                placeholder="https://yourproject.live"
                type="url"
                value={project.liveDemo || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "liveDemo", target.value)
                }
              />
            </div>

            {projectInfo.length > 1 && (
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
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <Plus /> Tambahkan Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsDetailFrom;
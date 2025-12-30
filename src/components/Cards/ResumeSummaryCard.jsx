import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {

  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("#ffffff");
        });
    }
  }, [imgUrl]);

  return <div
      className="h-[300px] flex flex-col items-center justify-between bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-900/20"
      style={{backgroundColor: bgColor}}
      onClick={onSelect}
    >
      <div className="w-full flex-1 p-2">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt=""
            className="w-full h-full object-cover rounded shadow-sm"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-slate-700/50 rounded flex items-center justify-center">
            <span className="text-gray-400 dark:text-slate-500 text-sm">No Preview</span>
          </div>
        )}
      </div>

      <div className="w-full bg-white dark:bg-slate-800 px-4 py-3 flex-shrink-0 border-t border-gray-100 dark:border-white/5">
        <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap text-slate-900 dark:text-white">{title}</h5>
        <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
};

export default ResumeSummaryCard;

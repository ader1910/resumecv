import React, { useState } from "react";
import { Check, Pencil } from "lucide-react";

const TitleInput = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);

  return <div className="flex items-center gap-3">
      {showInput ? (
        <>
          <input
            type="text"
            placeholder="Resume title"
            className="text-sm md:text-[17px] bg-transparent outline-none text-white font-semibold border-b border-white/20 pb-1"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <button className="cursor-pointer">
            <Check
              className="text-[16px] text-purple-400"
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-sm md:text-[17px] font-semibold text-white">{title}</h2>
          <button className="cursor-pointer">
            <Pencil
              className="text-sm text-purple-400"
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </button>
        </>
      )}
    </div>
};

export default TitleInput;

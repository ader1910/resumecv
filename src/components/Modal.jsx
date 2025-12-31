import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
  showSecondaryActionBtn,
  secondaryActionBtnIcon = null,
  secondaryActionBtnText,
  onSecondaryActionClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/60 backdrop-blur-sm">
      {/* Modal Content */}
      <div
        className={`relative flex flex-col bg-slate-900 border border-white/10 shadow-2xl rounded-2xl overflow-hidden max-w-[95vw] max-h-[95vh]
        `}
      >
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h3 className="md:text-xl font-bold text-white tracking-tight">{title}</h3>

            <div className="flex items-center gap-3 mr-12">
              {showSecondaryActionBtn && (
                <button
                  className="btn-small-light"
                  onClick={() => onSecondaryActionClick()}
                >
                  {secondaryActionBtnIcon}
                  {secondaryActionBtnText}
                </button>
              )}
              
              {showActionBtn && (
                <button
                  className="btn-primary !w-auto !py-2 !px-6 !my-0"
                  onClick={() => onActionClick()}
                >
                  <span className="flex items-center gap-2">
                    {actionBtnIcon}
                    {actionBtnText}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          className="text-slate-400 bg-transparent hover:bg-white/10 hover:text-white rounded-full text-sm w-10 h-10 flex justify-center items-center absolute top-3 right-3 transition-all duration-200 z-10"
          onClick={onClose}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

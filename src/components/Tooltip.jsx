import React from 'react';

const Tooltip = ({ text, children }) => {
    return (
        <div className="group relative flex flex-col items-center">
            {/* The Target Element (Icon/Button) */}
            {children}

            {/* The Tooltip Box */}
            <div className="absolute bottom-full mb-2 flex flex-col items-center 
                      invisible opacity-0 group-hover:visible group-hover:opacity-100 
                      transition-all duration-300 delay-150 ease-out translate-y-2 group-hover:translate-y-0">

                <span className="relative z-10 p-2 text-xs leading-none text-white font-medium whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                    {text}
                </span>

                {/* The Triangle Arrow */}
                <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-800"></div>
            </div>
        </div>
    );
};

export default Tooltip;
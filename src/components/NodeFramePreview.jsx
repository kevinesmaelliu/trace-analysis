import { useId } from "react";

/**
 * Frame preview tooltip shown on timeline node hover. Centered on the node, within the same row.
 * When visible, clickable to select and scroll to the corresponding log card.
 * @param {Object} props
 * @param {string} [props.label]
 * @param {boolean} props.isVisible
 * @param {Function} [props.onClick] - called when the preview is clicked
 */
export default function NodeFramePreview({
  label = "Frame Preview",
  isVisible,
  onClick,
}) {
  const filterId = useId().replace(/:/g, "_");

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick && isVisible ? 0 : undefined}
      className={`absolute transition-all duration-200 ease-out ${isVisible && onClick ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}`}
      style={{
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.95})`,
        opacity: isVisible ? 1 : 0,
      }}
      onClick={onClick || undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if ((e.key === "Enter" || e.key === " ") && isVisible) {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
    >
      <div className="relative">
        <svg
          width="90"
          height="64"
          viewBox="0 0 90 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width="90"
              height="64"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
          <g filter={`url(#${filterId})`}>
            <rect
              x="8"
              y="4"
              width="74"
              height="52"
              rx="8"
              fill="white"
              stroke="#E1E1E1"
              strokeWidth="1"
            />
          </g>
        </svg>

        {/* Content inside the preview box */}
        <div className="absolute top-[8px] left-[12px] right-[12px]">
          <p className="font-['Neue_Montreal:Medium',sans-serif] text-[9px] text-[#666666] leading-[normal] not-italic text-center mb-1">
            {label}
          </p>

          {/* Placeholder thumbnail */}
          <div className="w-full h-[28px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[3px] flex items-center justify-center mt-1">
            <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 16 16">
              <path d="M2 2L14 8L2 14V2Z" fill="#999999" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Scrubber overlay for the timeline. Position 0–1, draggable and clickable.
 * @param {Object} props
 * @param {number} props.position - 0 to 1
 * @param {(position: number) => void} props.onPositionChange
 * @param {React.RefObject<HTMLDivElement>} props.containerRef
 */
export default function Scrubber({ position, onPositionChange, containerRef }) {
  const handleMouseDown = (e) => {
    e.preventDefault();

    const handleMouseMove = (moveEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const newPosition = Math.max(0, Math.min(1, x / rect.width));
      onPositionChange(newPosition);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleContainerClick = (e) => {
    if (!containerRef.current) return;
    if (e.target !== e.currentTarget) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPosition = Math.max(0, Math.min(1, x / rect.width));
    onPositionChange(newPosition);
  };

  return (
    <>
      {/* Clickable overlay */}
      <div
        className="absolute inset-0 cursor-pointer z-10"
        onClick={handleContainerClick}
        style={{ pointerEvents: "all" }}
      />

      {/* Scrubber */}
      <div
        className="absolute top-0 z-20 cursor-ew-resize"
        style={{
          left: `calc(${position * 100}% - 13.5px)`,
          pointerEvents: "all",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="relative w-[27px]" style={{ height: "calc(100% + 10px)" }}>
          <svg
            className="block w-full h-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 27 224"
          >
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="27"
                id="filter0_d_scrubber"
                width="27"
                x="0"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2_94" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2_94" mode="normal" result="shape" />
              </filter>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="201"
                id="filter1_d_scrubber"
                width="9"
                x="8.5"
                y="23"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2_94" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2_94" mode="normal" result="shape" />
              </filter>
            </defs>
            <g id="Frame 234">
              <g filter="url(#filter0_d_scrubber)" id="Ellipse 4">
                <circle cx="13.5" cy="13.5" fill="black" r="9.5" />
                <circle cx="13.5" cy="13.5" r="9" stroke="white" />
              </g>
              <g filter="url(#filter1_d_scrubber)" id="Line 4">
                <line stroke="black" x1="13" x2="13" y1="216" y2="23" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import NodeFramePreview from "./NodeFramePreview";

/**
 * Timeline node for video row (top) or agent row (bottom). Video variant shows frame preview on hover;
 * agent variant shows an icon in a filled circle. Each top-row node should have a corresponding
 * agent node at the same position in the bottom row.
 * @param {Object} props
 * @param {number} props.position - 0 to 1
 * @param {string} [props.color]
 * @param {string} [props.label]
 * @param {"video"|"agent"} [props.variant]
 * @param {React.ReactNode} [props.icon] - shown in filled circle for agent variant
 * @param {string} [props.displayTime]
 * @param {boolean} [props.isSelected]
 * @param {Function} [props.onPreviewClick]
 */
export default function TimelineNode({
  position,
  color = "#000000",
  label,
  variant = "video",
  icon,
  displayTime,
  isSelected,
  onPreviewClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Agent variant uses grey color
  const nodeColor = variant === "agent" ? "#999999" : color;
  // Agent variant is positioned in the second row (102px down)
  const topOffset = variant === "agent" ? 102 : 0;

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    onPreviewClick?.(displayTime ?? label);
  };

  return (
    <div
      className="absolute z-30 cursor-pointer"
      style={{
        top: `${topOffset}px`,
        left: `${position * 100}%`,
        height: "102px",
        width: "12px",
        transform: "translateX(-6px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full flex items-stretch justify-center">
        {/* The vertical line */}
        <div
          className="h-full transition-all duration-200"
          style={{
            backgroundColor: nodeColor,
            opacity: isHovered || (variant === "video" && isSelected) ? 1 : 0.7,
            width: isHovered || (variant === "video" && isSelected) ? "4px" : "1px",
            boxShadow:
              isHovered || (variant === "video" && isSelected)
                ? `0 0 12px 2px ${nodeColor}80, 0 0 20px 4px ${nodeColor}40`
                : "none",
            borderRadius: "2px",
          }}
        />

        {/* Frame Preview on Hover – only for video variant */}
        {variant === "video" && (
          <NodeFramePreview
            label={label}
            isVisible={isHovered}
            onClick={handlePreviewClick}
          />
        )}

        {/* Icon with filled circle background – always visible for agent variant */}
        {variant === "agent" && icon && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-[#6e6e6e]">
                {icon}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

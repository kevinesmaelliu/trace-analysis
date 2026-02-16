import { useState, useRef, useEffect } from "react";
import { Video, MousePointerClick, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Scrubber from "./Scrubber";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.icon
 * @param {boolean} [props.isOdd]
 */
function TimelineItem({ icon, isOdd }) {
  return (
    <div
      className={`${isOdd ? "bg-[#fefefe]" : "bg-white"} relative shrink-0 w-full flex-1 min-h-0`}
      data-name="lucide/video"
    >
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-4 relative w-full">
          <div className="content-stretch flex flex-col h-12 items-start justify-center pr-4 relative shrink-0">
            <div
              aria-hidden="true"
              className="absolute border-[#e9e9e9] border-r border-solid inset-0 pointer-events-none"
            />
            {icon}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function VideoIcon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <Video className="block size-full" size={14} strokeWidth={1.5} />
    </div>
  );
}

function CursorIcon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <MousePointerClick className="block size-full" size={14} strokeWidth={1.5} />
    </div>
  );
}

/**
 * @param {Object} props
 * @param {number} [props.duration=300]
 * @param {string} [props.activeStep]
 * @param {Function} [props.setActiveStep]
 */
export default function VideoTimeline({
  duration = 300,
  activeStep,
  setActiveStep
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(5);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const intervalRef = useRef(null);
  const timelineStripRef = useRef(null);

  const speeds = [0.5, 0.75, 1.0, 1.5, 2.0];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 0.1 * playbackSpeed;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    setCurrentTime((prev) => Math.max(0, prev - 5));
  };

  const handleSkipForward = () => {
    setCurrentTime((prev) => Math.min(duration, prev + 5));
  };

  const handleSpeedChange = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(3.0, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.5, prev - 0.25));
  };

  const scrubberPosition = duration > 0 ? Math.max(0, Math.min(1, currentTime / duration)) : 0;
  const handleScrubberPositionChange = (position) => {
    setCurrentTime(position * duration);
  };

  return (
    <div className="bg-white relative rounded-lg overflow-clip size-full" data-name="Timeline">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full h-full">
        {/* Timeline Items */}
        <div
          ref={timelineStripRef}
          className="bg-[#f9f9f9] content-stretch flex flex-col items-start overflow-x-auto overflow-y-hidden relative shrink-0 w-full flex-1"
          style={{
            transform: `scaleX(${zoomLevel})`,
            transformOrigin: "left center",
          }}
        >
          <TimelineItem icon={<VideoIcon />} />
          <TimelineItem icon={<CursorIcon />} isOdd />
          <Scrubber
            position={scrubberPosition}
            onPositionChange={handleScrubberPositionChange}
            containerRef={timelineStripRef}
          />
        </div>

        {/* Controls */}
        <div className="relative shrink-0 w-full border-t border-[#e3e3e3]">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-4 py-2 relative w-full">
              {/* Zoom Controls */}
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <button
                  onClick={handleZoomOut}
                  className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label="Zoom out"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.33333 8H12.6667"
                      stroke="#6E6E6E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <p className="font-['PP_Fraktion_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6e6e6e] text-[12px]">
                  ZOOM
                </p>
                <button
                  onClick={handleZoomIn}
                  className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label="Zoom in"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 3.33333V12.6667M3.33333 8H12.6667"
                      stroke="#6E6E6E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Playback Controls */}
              <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
                <p className="font-['Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#757575] text-[12px]">
                  {formatTime(currentTime)}
                </p>

                <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0">
                  {/* Skip Back */}
                  <button
                    onClick={handleSkipBack}
                    className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70 transition-opacity"
                    aria-label="Skip back 5 seconds"
                  >
                    <SkipBack className="block size-full text-[#6E6E6E]" size={16} strokeWidth={2} />
                  </button>

                  {/* Play/Pause: square button (h-7 w-7) so icon centers cleanly; fixed icon size avoids stretch */}
                  <button
                    onClick={handlePlayPause}
                    className="h-7 w-7 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center rounded-full bg-black shrink-0"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="text-white shrink-0" size={14} strokeWidth={2.5} fill="white" />
                    ) : (
                      <Play className="text-white shrink-0" size={14} strokeWidth={2.5} fill="white" />
                    )}
                  </button>

                  {/* Skip Forward */}
                  <button
                    onClick={handleSkipForward}
                    className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70 transition-opacity"
                    aria-label="Skip forward 5 seconds"
                  >
                    <SkipForward className="block size-full text-[#6E6E6E]" size={16} strokeWidth={2} />
                  </button>
                </div>

                <p className="font-['Neue_Montreal:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#757575] text-[12px]">
                  {formatTime(duration)}
                </p>
              </div>

              {/* Speed Control */}
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <p className="font-['PP_Fraktion_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6e6e6e] text-[12px]">
                  SPEED
                </p>
                <button
                  onClick={handleSpeedChange}
                  className="bg-[#f3f3f3] content-stretch flex items-center justify-center p-[10px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#e8e8e8] transition-colors"
                >
                  <div
                    aria-hidden="true"
                    className="absolute border border-[rgba(241,241,241,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]"
                  />
                  <p className="font-['Neue_Montreal:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-black">
                    {playbackSpeed.toFixed(1)}x
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[rgba(241,241,241,0.5)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_2px_10px_1px_rgba(157,157,157,0.05)]"
      />
    </div>
  );
}

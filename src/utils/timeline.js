/** Timeline duration in seconds (0:00 to 5:00). Shared by Timeline and TracePanel. */
export const TIMELINE_DURATION_SEC = 300;

/**
 * Format seconds as "M:SS" for display.
 * @param {number} seconds
 * @returns {string}
 */
export function formatTraceTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Get display timestamps for n traces, spread evenly over TIMELINE_DURATION_SEC.
 * @param {number} count
 * @returns {string[]}
 */
export function getDisplayTimestamps(count) {
  if (count <= 0) return [];
  if (count === 1) return [formatTraceTime(0)];
  return Array.from({ length: count }, (_, i) =>
    formatTraceTime((i / (count - 1)) * TIMELINE_DURATION_SEC)
  );
}

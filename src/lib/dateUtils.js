/**
 * Safely format a date string or timestamp without throwing RangeError on invalid inputs
 */
export function formatDate(dateString, options = { month: 'short', day: 'numeric', year: 'numeric' }, fallback = 'Recently Added') {
  if (!dateString) return fallback;
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      // If dateString is already a formatted string like "May 16, 2025" or "08/08/2026", return it directly
      return String(dateString);
    }
    return d.toLocaleDateString('en-US', options);
  } catch (e) {
    return fallback;
  }
}

/**
 * Localized Date Utilities
 * Uses the native Intl API to provide high-fidelity, locale-aware formatting
 */

export function formatLocalizedDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) throw new Error('Invalid date');
    
    const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
    return new Intl.DateTimeFormat(locale || 'en-US', options).format(d);
  } catch (e) {
    return String(date);
  }
}

/**
 * Returns a relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) throw new Error('Invalid date');
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
    const rtf = new Intl.RelativeTimeFormat(locale || 'en-US', { numeric: 'auto' });
    
    if (diffInSeconds < 60) return rtf.format(-Math.floor(Math.max(0, diffInSeconds)), 'second');
    if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  } catch (e) {
    return '';
  }
}

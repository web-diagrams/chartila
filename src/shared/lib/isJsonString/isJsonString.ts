/**
 * Checks if a string is a valid JSON string
 * @param text - String to validate
 * @returns True if the string is valid JSON, false otherwise
 */
export function isJsonString(text: string): boolean {
  try {
    const parsed = JSON.parse(text)
    return typeof parsed === 'object' && parsed !== null
  } catch {
    return false
  }
}

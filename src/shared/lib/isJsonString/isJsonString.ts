/**
 * Проверяет, является ли строка корректной JSON-строкой
 * @param text строка для проверки
 */
export function isJsonString(text: string): boolean {
  try {
    const parsed = JSON.parse(text)
    return typeof parsed === 'object' && parsed !== null
  } catch {
    return false
  }
}
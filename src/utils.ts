type Mods = Record<string, boolean | string>;

/**
 * Utility function for conditionally joining CSS class names
 * @param cls - Base CSS class name
 * @param mods - Object with conditional class names as keys and boolean/string conditions as values
 * @param additional - Array of additional class names to include
 * @returns Combined class name string
 */
export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}

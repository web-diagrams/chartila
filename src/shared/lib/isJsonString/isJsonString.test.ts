import { isJsonString } from './isJsonString';

describe('isJsonString utility function', () => {
  test('should return true for valid JSON object string', () => {
    expect(isJsonString('{"name": "test", "value": 123}')).toBe(true);
  });

  test('should return true for valid JSON array string', () => {
    expect(isJsonString('[1, 2, 3, "test"]')).toBe(true);
  });

  test('should return true for empty JSON object', () => {
    expect(isJsonString('{}')).toBe(true);
  });

  test('should return true for empty JSON array', () => {
    expect(isJsonString('[]')).toBe(true);
  });

  test('should return true for nested JSON objects', () => {
    expect(isJsonString('{"user": {"name": "John", "age": 30}}')).toBe(true);
  });

  test('should return false for invalid JSON syntax', () => {
    expect(isJsonString('{"name": "test"')).toBe(false);
  });

  test('should return false for plain string', () => {
    expect(isJsonString('hello world')).toBe(false);
  });

  test('should return false for number string', () => {
    expect(isJsonString('123')).toBe(false);
  });

  test('should return false for boolean string', () => {
    expect(isJsonString('true')).toBe(false);
  });

  test('should return false for null string', () => {
    expect(isJsonString('null')).toBe(false);
  });

  test('should return false for undefined string', () => {
    expect(isJsonString('undefined')).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(isJsonString('')).toBe(false);
  });

  test('should return false for string with only whitespace', () => {
    expect(isJsonString('   ')).toBe(false);
  });

  test('should return false for malformed JSON with trailing comma', () => {
    expect(isJsonString('{"name": "test",}')).toBe(false);
  });

  test('should return false for JSON with single quotes', () => {
    expect(isJsonString("{'name': 'test'}")).toBe(false);
  });

  test('should return false for JSON with unquoted keys', () => {
    expect(isJsonString('{name: "test"}')).toBe(false);
  });

  test('should handle JSON with special characters', () => {
    expect(isJsonString('{"message": "Hello\\nWorld\\t!"}')).toBe(true);
  });

  test('should handle JSON with unicode characters', () => {
    expect(isJsonString('{"emoji": "🚀", "text": "café"}')).toBe(true);
  });

  test('should return false for function string', () => {
    expect(isJsonString('function() { return true; }')).toBe(false);
  });
});

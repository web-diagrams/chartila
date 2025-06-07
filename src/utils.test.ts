import { classNames } from './utils';

describe('classNames utility function', () => {
  test('should return base class when no mods or additional classes provided', () => {
    const result = classNames('base-class');
    expect(result).toBe('base-class');
  });

  test('should combine base class with additional classes', () => {
    const result = classNames('base-class', {}, ['additional-1', 'additional-2']);
    expect(result).toBe('base-class additional-1 additional-2');
  });

  test('should include conditional classes when condition is true', () => {
    const result = classNames('base-class', { 'active': true, 'disabled': false });
    expect(result).toBe('base-class active');
  });

  test('should exclude conditional classes when condition is false', () => {
    const result = classNames('base-class', { 'active': false, 'disabled': false });
    expect(result).toBe('base-class');
  });

  test('should handle string values in mods object', () => {
    const result = classNames('base-class', { 'theme': 'dark', 'size': 'large', 'empty': '' });
    expect(result).toBe('base-class theme size');
  });

  test('should filter out falsy additional classes', () => {
    const result = classNames('base-class', {}, ['valid-class', '', 'another-valid']);
    expect(result).toBe('base-class valid-class another-valid');
  });

  test('should handle complex combination of all parameters', () => {
    const result = classNames(
      'base-class',
      { 'active': true, 'disabled': false, 'theme': 'dark' },
      ['extra-1', '', 'extra-2']
    );
    expect(result).toBe('base-class extra-1 extra-2 active theme');
  });

  test('should handle empty mods object', () => {
    const result = classNames('base-class', {}, ['additional']);
    expect(result).toBe('base-class additional');
  });

  test('should handle empty additional array', () => {
    const result = classNames('base-class', { 'active': true }, []);
    expect(result).toBe('base-class active');
  });

  test('should handle all empty parameters except base class', () => {
    const result = classNames('base-class', {}, []);
    expect(result).toBe('base-class');
  });

  test('should handle boolean values in mods', () => {
    const result = classNames('base-class', { 'count': true, 'zero': false });
    expect(result).toBe('base-class count');
  });
});

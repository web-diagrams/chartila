// Jest setup file for additional configuration
import 'jest-environment-jsdom';

// Mock for navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve(''))
  }
});

// Mock for URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');
global.URL.revokeObjectURL = jest.fn();

// Mock for document.createElement
const originalCreateElement = document.createElement;
document.createElement = jest.fn().mockImplementation((tagName) => {
  if (tagName === 'a') {
    return {
      href: '',
      download: '',
      click: jest.fn(),
      setAttribute: jest.fn()
    };
  }
  if (tagName === 'span') {
    return {
      textContent: '',
      style: {},
      offsetWidth: 100,
      remove: jest.fn()
    };
  }
  return originalCreateElement.call(document, tagName);
});

// Mock for document.body.appendChild and removeChild
document.body.appendChild = jest.fn();
document.body.removeChild = jest.fn();

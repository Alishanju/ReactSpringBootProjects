import '@testing-library/jest-dom';

// Polyfill for jsdom
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
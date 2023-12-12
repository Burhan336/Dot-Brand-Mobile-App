// __mocks__/AsyncStorage.js

const AsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  // Add any other AsyncStorage methods your code uses with jest.fn()
};

export default AsyncStorage;

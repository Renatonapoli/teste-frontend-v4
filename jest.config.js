module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-leaflet|leaflet)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
export default {
  clearMocks: true,
   collectCoverage: true,
   transform: {
     '.+\\.ts$': 'ts-jest'
   },
   collectCoverageFrom: [
     './src/**/*.ts',
     '!./src/main/**',
     '!./src/@*/**',
     '!./src/**/*.interface.ts',
     '!./src/.*/*.interface.ts',
     '!./src/**/*.type.ts',
     '!./src/**/*.repository.ts'
   ],
   coverageDirectory: "coverage",
   coveragePathIgnorePatterns: [
     "\\\\node_modules\\\\"
   ],
   coverageProvider: "v8",
   testEnvironment: "jest-environment-node",
   testMatch: [
     "**/__tests__/**/*.[jt]s?(x)",
     "**/?(*.)+(spec|test).[tj]s?(x)"
   ],
 };
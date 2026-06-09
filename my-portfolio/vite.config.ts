import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  test:{
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/Tests/setupTests.ts',
    alias: {
      '\\.(png|jpg|jpeg|gif|svg)$': './src/__mocks__/fileMock.ts'
    }
  }
})

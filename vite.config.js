import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const defaultPORT = 4000;
export default defineConfig({
  plugins: [react()],
  server: {
    host: [`192.168.1.108:${defaultPORT}`, 'http://localhost'],
    port: defaultPORT,
  },
});
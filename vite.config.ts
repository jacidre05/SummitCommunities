import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const basePath = isProduction ? '/SummitCommunities/' : '/';

  return {
    base: basePath,
    plugins: [react()],
    server: {
      host: '0.0.0.0',  
      port: 5173,
      strictPort: true,
      allowedHosts: [
        'localhost',                        // local dev
        '127.0.0.1',                        // WSL/ngrok local
        'nonloyal-subcriminally-jamika.ngrok-free.dev', // your ngrok URL
        // add more hosts or IPs as needed
      ],
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const basePath = isProduction ? '/SummitCommunities/' : '/';

  return {
    base: basePath,
    plugins: [react()],
  };
});

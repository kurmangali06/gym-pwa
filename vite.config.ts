import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const plugins = [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ];
  return {
    plugins,
    resolve: {
      alias: {
        shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
        modules: fileURLToPath(new URL('./src/modules', import.meta.url)),
        app: fileURLToPath(new URL('./src/app', import.meta.url)),
        i18n: fileURLToPath(new URL('./src/i18n', import.meta.url)),
        api: fileURLToPath(new URL('./src/api', import.meta.url)),
      },
    },
  };
});

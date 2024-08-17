import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { VantImports, VantResolver } from '@vant/auto-import-resolver';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', VantImports()],
      dts: 'src/auto-imports.d.ts',
      resolvers: [VantResolver()],
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
        VantResolver(),
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      includeAssets:
                 ['fonts/*.ttf', 'images/*.png', 'css/*.css'],
      manifest: {
        short_name: 'gym Note PWA',
        name: 'записная книга для тренировки',
        start_url: '/',
        display: 'standalone',
        theme_color: '#333333',
        background_color: '#000000',
        orientation: 'natural',
        icons: [
          {
            src: '/images/gym.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/gym.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/images/gym.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        prefer_related_applications: false,
      },
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

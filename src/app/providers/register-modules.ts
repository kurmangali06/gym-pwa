import type { DefaultModule } from 'shared/lib/types/app/app';
import type { Router } from 'vue-router';

interface AppModule {
  router?: (router: Router) => void
}

const modules = import.meta.glob<DefaultModule<AppModule>>('modules/**/index.ts', {
  eager: true,
});

export function registerModules(router: Router) {
  const registerModule = (module: AppModule) => {
    if (module.router)
      module.router(router);
  };

  Object.keys(modules).sort((a, b) => a.split('/').length - b.split('/').length).forEach((moduleKey) => {
    const module = modules[moduleKey];

    if (module.default && module.default.router)
      registerModule(module.default);
  });
}

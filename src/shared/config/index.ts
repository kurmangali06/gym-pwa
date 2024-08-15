const APP_PROD_BASE_URL = getEnvVar('VITE_APP_PROD_BASE_URL');
export const isDevEnv = getEnvVar('DEV');
export const isProdEnv = getEnvVar('PROD');

export const BASE_URL = isProdEnv ? APP_PROD_BASE_URL : APP_PROD_BASE_URL;

function getEnvVar(key: string) {
  const envVar = import.meta.env[key];
  if (envVar === undefined)
    throw new Error(`Env variable ${key} is required`);

  return envVar;
}

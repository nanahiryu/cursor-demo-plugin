import { getObjectKeys } from "@/pages/shared/functions/utils";
import { pluginVersion } from "@/params/param";

export const setPluginConfig = (param: PluginConfigParam) => {
  const config = {
    param,
    version: pluginVersion.toString(),
  };

  return new Promise((resolve) => {
    const newConfig: Partial<PluginConfigUnParsed> = {};
    for (const key of getObjectKeys(config)) {
      newConfig[key] = JSON.stringify(config[key]);
    }
    kintone.plugin.app.setConfig(newConfig, () => {
      console.info("success save plugin config", config);
      resolve(0);
    });
  });
};

export const getProxyConfig = (proxyUrl: string, proxyMethod: Method): Partial<ProxyConfig> => {
  const proxyConfig = kintone.plugin.app.getProxyConfig(proxyUrl, proxyMethod);
  if (proxyConfig === null) return {};

  const [apiToken1, apiToken2] = proxyConfig.headers["X-Cybozu-API-Token"].split(",");

  return { apiToken1, apiToken2 };
};

export const setProxyConfig = (proxyUrl: string, proxyMethod: Method, body: ProxyConfig) => {
  const headers = {
    "X-Cybozu-API-Token": `${body.apiToken1},${body.apiToken2}`,
  };
  const data = {};

  return new Promise((resolve) => {
    kintone.plugin.app.setProxyConfig(proxyUrl, proxyMethod, headers, data, () => {
      console.info("success load proxy config", headers, data);
      resolve("");
    });
  });
};

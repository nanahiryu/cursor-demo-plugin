import { getObjectKeys } from "@/pages/shared/functions/utils";
import { pluginVersion } from "@/params/param";
import { PluginConfigParam, PluginConfigUnParsed } from "@/types/type";

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

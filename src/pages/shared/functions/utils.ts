import { Result } from "neverthrow";

import { EmptyObject, PluginConfig, PluginConfigParam, PluginConfigUnParsed } from "@/types/type";

export const safeJsonParse: <T>(text: string) => Result<T, string> = Result.fromThrowable(
  (text: string) => JSON.parse(text),
  (error) => {
    console.error(error);
    if (error instanceof Error) {
      return error.message;
    }
    return "JSON parse error";
    // i18n導入後に利用する
    // return t("ooo");
  },
);

export const getObjectKeys = <T extends { [key: string]: unknown }>(obj: T): Array<keyof T> => {
  return Object.keys(obj);
};

const isEmptyPluginConfig = (config: PluginConfigUnParsed | PluginConfig | EmptyObject): config is EmptyObject => {
  return Object.keys(config).length === 0;
};

export const getPluginConfig = (pluginId: string, initPluginConfigParam: PluginConfigParam, pluginVersion: string) => {
  const configUnParsed = kintone.plugin.app.getConfig(pluginId) as PluginConfigUnParsed | EmptyObject;

  // プラグインインストール直後
  if (isEmptyPluginConfig(configUnParsed)) {
    return {
      param: initPluginConfigParam,
      version: pluginVersion,
    };
  }

  const config = getObjectKeys(configUnParsed).reduce((prevConfig, currentKey) => {
    if (currentKey === "version") {
      const newConfig = {
        ...prevConfig,
        [currentKey]: configUnParsed[currentKey],
      };
      return newConfig;
    }

    if (currentKey === "param") {
      const parsedSafeJsonParse = safeJsonParse<PluginConfig[typeof currentKey]>(configUnParsed[currentKey]);
      if (parsedSafeJsonParse.isErr()) return prevConfig;

      const newConfig = {
        ...prevConfig,
        [currentKey]: {
          // プラグインのバージョンアップでparamの項目が増えた場合の対応
          ...initPluginConfigParam,
          ...parsedSafeJsonParse.value,
        },
      };

      return newConfig;
    }

    return prevConfig;
  }, {} as Partial<PluginConfig>);

  return config as PluginConfig;
};

export const savePluginConfig = async (param: PluginConfigParam, version: string) => {
  const config = {
    param,
    version,
  };

  const newConfig: Partial<PluginConfigUnParsed> = {};
  for (const key of getObjectKeys(config)) {
    newConfig[key] = JSON.stringify(config[key]);
  }
  kintone.plugin.app.setConfig(newConfig);
};

import manifest from "../../plugin/manifest.json";

export const pluginId = kintone.$PLUGIN_ID;

export const pluginVersion = manifest.version;

// プラグイン設定の初期値
export const initPluginConfigParam: PluginConfigParam = {
  fieldCode1: "",
  fieldCode2: "",
  apiToken1: "",
  apiToken2: "",
};

// kintone.plugin.app.setProxyConfig()で利用するパラメーター
export const proxyMethod: "GET" | "POST" | "PUT" | "DELETE" = "POST";
export const proxyUrl = `https://${location.hostname}/k/v1/record.json`;

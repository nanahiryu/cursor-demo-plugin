import manifest from "../../plugin/manifest.json";

import { PluginConfigParam } from "@/types/type";

export const pluginId = kintone.$PLUGIN_ID;

export const pluginVersion = manifest.version;

// プラグイン設定の初期値
export const initPluginConfigParam: PluginConfigParam = {
  highColor: "#ff0000",
  lowColor: "#00ff00",
};

// kintone.plugin.app.setProxyConfig()で利用するパラメーター
export const proxyMethod: "GET" | "POST" | "PUT" | "DELETE" = "POST";
export const proxyUrl = `https://${location.hostname}/k/v1/record.json`;

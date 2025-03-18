export type EmptyObject = Record<string, never>;

export type PluginConfig = {
  param: PluginConfigParam;
  version: string;
};

export type PluginConfigParam = {
  highColor: string;
  lowColor: string;
};

export type PluginConfigUnParsed = Record<keyof PluginConfig, string>;

export type Method = "GET" | "POST" | "PUT" | "DELETE";

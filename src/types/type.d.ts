type EmptyObject = Record<string, never>;

type PluginConfig = {
  param: PluginConfigParam;
  version: string;
};

type PluginConfigParam = {
  fieldCode1: string;
  fieldCode2: string;
  apiToken1: string;
  apiToken2: string;
};

type PluginConfigUnParsed = Record<keyof PluginConfig, string>;

type Method = "GET" | "POST" | "PUT" | "DELETE";

type ProxyConfig = Pick<PluginConfigParam, "apiToken1" | "apiToken2">;

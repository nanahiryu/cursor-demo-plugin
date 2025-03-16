import { getProxyConfig, setPluginConfig, setProxyConfig } from "@/pages/config/functions/utils";
import { getPluginConfig } from "@/pages/shared/functions/utils";
import { initPluginConfigParam, pluginId, pluginVersion, proxyMethod, proxyUrl } from "@/params/param";

(async () => {
  const pluginConfig = getPluginConfig(pluginId, initPluginConfigParam, pluginVersion);

  const fieldCodeElement1 = document.querySelector<HTMLInputElement>("#fieldCode1");
  if (fieldCodeElement1) {
    fieldCodeElement1.value = pluginConfig.param?.fieldCode1 ?? "";
  }

  const fieldCodeElement2 = document.querySelector<HTMLInputElement>("#fieldCode2");
  if (fieldCodeElement2) {
    fieldCodeElement2.value = pluginConfig.param?.fieldCode2 ?? "";
  }

  const proxyConfig = getProxyConfig(proxyUrl, proxyMethod);

  const apiTokenElement1 = document.querySelector<HTMLInputElement>("#apiToken1");
  if (apiTokenElement1) {
    apiTokenElement1.value = proxyConfig.apiToken1 ?? "";
  }

  const apiTokenElement2 = document.querySelector<HTMLInputElement>("#apiToken2");
  if (apiTokenElement2) {
    apiTokenElement2.value = proxyConfig.apiToken2 ?? "";
  }

  const button = document.querySelector<HTMLButtonElement>("#save");
  button?.addEventListener("click", async () => {
    const fieldCode1 = document.querySelector<HTMLInputElement>("#fieldCode1")?.value ?? "";
    const fieldCode2 = document.querySelector<HTMLInputElement>("#fieldCode2")?.value ?? "";
    await setPluginConfig({
      fieldCode1,
      fieldCode2,

      // 認証情報はプラグイン設定には保存しない
      apiToken1: "",
      apiToken2: "",
    });

    const apiToken1 = document.querySelector<HTMLInputElement>("#apiToken1")?.value ?? "";
    const apiToken2 = document.querySelector<HTMLInputElement>("#apiToken2")?.value ?? "";
    await setProxyConfig(proxyUrl, proxyMethod, {
      apiToken1,
      apiToken2,
    });
  });
})();

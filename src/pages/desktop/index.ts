import { getPluginConfig } from "@/pages/shared/functions/utils";
import { initPluginConfigParam, pluginId, pluginVersion, proxyMethod, proxyUrl } from "@/params/param";

(async () => {
  const config = getPluginConfig(pluginId, initPluginConfigParam, pluginVersion);

  kintone.events.on(["app.record.index.show"], (event) => {
    console.info("success load config", config);

    const space = kintone.app.getHeaderMenuSpaceElement();

    const button = document.createElement("button");
    button.textContent = "ボタン";
    button.addEventListener("click", async () => {
      const res = await kintone.plugin.app.proxy(
        pluginId,
        proxyUrl,
        proxyMethod,
        { "Content-Type": "application/json" },
        { app: kintone.app.getId(), record: {} },
      );
      console.log({ res });
    });

    space?.appendChild(button);

    return event;
  });
})();

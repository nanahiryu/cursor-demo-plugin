import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { getPluginConfig } from "@/pages/shared/functions/utils";
import { initPluginConfigParam, pluginId, pluginVersion } from "@/params/param";

(async () => {
  const config = getPluginConfig(pluginId, initPluginConfigParam, pluginVersion);

  kintone.events.on(["app.record.index.show"], (event) => {
    console.info("success load config", config);

    const space = kintone.app.getHeaderMenuSpaceElement();
    if (!space) return event;

    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    space.appendChild(div);

    return event;
  });
})();

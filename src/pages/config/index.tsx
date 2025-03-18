import { createRoot } from "react-dom/client";

import { getPluginConfig } from "../shared/functions/utils";

import App from "./App";

import { Provider } from "@/components/ui/provider";
import { initPluginConfigParam, pluginId, pluginVersion } from "@/params/param";

(async () => {
  const configRoot = document.getElementById("plugin-config");
  if (!configRoot) return;

  const config = getPluginConfig(pluginId, initPluginConfigParam, pluginVersion);

  const root = createRoot(configRoot);
  root.render(
    <Provider>
      <App config={config} />
    </Provider>,
  );
})();

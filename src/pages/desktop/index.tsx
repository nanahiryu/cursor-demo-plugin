import { getPluginConfig } from "@/pages/shared/functions/utils";
import { initPluginConfigParam, pluginId, pluginVersion } from "@/params/param";

(async () => {
  const config = getPluginConfig(pluginId, initPluginConfigParam, pluginVersion);

  kintone.events.on(["app.record.index.show"], (event) => {
    const elements = kintone.app.getFieldElements("working_year");

    if (!elements) return event;
    elements.forEach((element) => {
      const strWorkingYear = element.textContent;
      if (!strWorkingYear) return;
      const workingYear = parseInt(strWorkingYear, 10);

      if (workingYear > 5) {
        element.style.backgroundColor = config.param.highColor;
      } else {
        element.style.backgroundColor = config.param.lowColor;
      }
    });

    return event;
  });
})();

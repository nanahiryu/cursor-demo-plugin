const fs = require("fs");

const packFromManifest = require("@kintone/plugin-packer/from-manifest");

const generatePlugin = (manifestJSONPath, privateKey) => {
  return packFromManifest(manifestJSONPath, privateKey).then(
    (output) => output.privateKey,
  );
};
generatePlugin("./plugin-playwright/manifest.json").then((privateKey) => {
  fs.writeFileSync("./key/playwright-private.ppk", privateKey);
});

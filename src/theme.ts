import { createSystem, defineConfig } from "@chakra-ui/react";

// 基本的な設定
const config = defineConfig({
  cssVarsPrefix: "my-app",
});

// preflightをfalseに設定してグローバルスタイル（リセットスタイル）を無効化
export const system = createSystem(config, { preflight: false });

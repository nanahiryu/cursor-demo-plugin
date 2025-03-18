import { Box, ColorPicker, HStack, Heading, Portal, Text, parseColor } from "@chakra-ui/react";
import React, { useState } from "react";

import { savePluginConfig } from "../shared/functions/utils";

import { PrimaryButton } from "@/components/ui/button";
import { PluginConfigParam } from "@/types/type";

interface AppProps {
  config: {
    param: PluginConfigParam;
    version: string;
  };
}

const App: React.FC<AppProps> = ({ config }) => {
  const [highColor, setHighColor] = useState(parseColor(config.param.highColor));
  const [lowColor, setLowColor] = useState(parseColor(config.param.lowColor));

  const onSubmit = async () => {
    config.param.highColor = highColor.toString("hex");
    config.param.lowColor = lowColor.toString("hex");
    await savePluginConfig(config.param, config.version);
  };

  return (
    <Box p={8} bg="white" minH="100vh">
      <Box display="flex" flexDirection="column" gap={8}>
        <Heading size="lg">勤続年数による背景色設定</Heading>

        <Box>
          <Text fontSize="xl" mb={4}>
            勤続年数5年以上
          </Text>
          <ColorPicker.Root value={highColor} onValueChange={(e) => setHighColor(e.value)} maxW="200px">
            <ColorPicker.HiddenInput />
            <ColorPicker.Control>
              <ColorPicker.Input />
              <ColorPicker.Trigger />
            </ColorPicker.Control>
            <Portal>
              <ColorPicker.Positioner>
                <ColorPicker.Content>
                  <ColorPicker.Area />
                  <HStack>
                    <ColorPicker.EyeDropper size="xs" variant="outline" />
                    <ColorPicker.Sliders />
                  </HStack>
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </Portal>
          </ColorPicker.Root>
          <Box
            mt={2}
            w="100px"
            h="20px"
            bg={highColor.toString("hex")}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="sm"
          />
        </Box>

        <Box>
          <Text fontSize="xl" mb={4}>
            勤続年数5年未満
          </Text>
          <ColorPicker.Root value={lowColor} onValueChange={(e) => setLowColor(e.value)} maxW="200px">
            <ColorPicker.HiddenInput />
            <ColorPicker.Control>
              <ColorPicker.Input />
              <ColorPicker.Trigger />
            </ColorPicker.Control>
            <Portal>
              <ColorPicker.Positioner>
                <ColorPicker.Content>
                  <ColorPicker.Area />
                  <HStack>
                    <ColorPicker.EyeDropper size="xs" variant="outline" />
                    <ColorPicker.Sliders />
                  </HStack>
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </Portal>
          </ColorPicker.Root>
          <Box
            mt={2}
            w="100px"
            h="20px"
            bg={lowColor.toString("hex")}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="sm"
          />
        </Box>
      </Box>
      <HStack mt={8} justifyContent="flex-end">
        <PrimaryButton onClick={onSubmit}>保存</PrimaryButton>
      </HStack>
    </Box>
  );
};

export default App;

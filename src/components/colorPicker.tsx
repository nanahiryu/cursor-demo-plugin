import { Box, ColorPicker, HStack, Portal, parseColor } from "@chakra-ui/react";
import React from "react";

interface CustomColorPickerProps {
  color: ReturnType<typeof parseColor>;
  onColorChange: (color: ReturnType<typeof parseColor>) => void;
  showPreview?: boolean;
}

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ color, onColorChange, showPreview = true }) => {
  return (
    <>
      <ColorPicker.Root value={color} onValueChange={(e) => onColorChange(e.value)} maxW="200px">
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
      {showPreview && (
        <Box
          mt={2}
          w="100px"
          h="20px"
          bg={color.toString("hex")}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="sm"
        />
      )}
    </>
  );
};

export default CustomColorPicker;

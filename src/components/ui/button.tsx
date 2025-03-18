import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export const PrimaryButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button colorScheme="blue" size="md" fontWeight="bold" _hover={{ opacity: 0.8 }} {...props}>
      {children}
    </Button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button colorScheme="gray" size="md" fontWeight="bold" _hover={{ opacity: 0.8 }} {...props}>
      {children}
    </Button>
  );
};

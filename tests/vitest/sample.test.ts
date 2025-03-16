import { expect, test } from "vitest";

import { getObjectKeys } from "@/pages/shared/functions/utils";

test("getObjectKeys", () => {
  // Arrange
  const testObj = { a: 1, b: 2, c: 3 };

  // Act
  const keyList = getObjectKeys(testObj);

  // Assert
  expect(keyList).toEqual(["a", "b", "c"]);
});

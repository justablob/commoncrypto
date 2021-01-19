import { describe, it, expect } from "@jest/globals";

import cc from "../src";

describe("timing_safe_equal", () => {

  it("equal", () => {
    expect(cc.timing_safe_equal(Buffer.alloc(32, 0x76), Buffer.alloc(32, 0x76))).toBe(true);
  });

  it("not equal data", () => {
    expect(cc.timing_safe_equal(Buffer.alloc(32, 0x76), Buffer.alloc(32, 0x67))).not.toBe(true);
  });

  it("not equal length", () => {
    expect(cc.timing_safe_equal(Buffer.alloc(32, 0x76), Buffer.alloc(36, 0x76))).not.toBe(true);
  });

});
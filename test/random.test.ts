import { describe, it, expect } from "@jest/globals";

import cc from "../src";

describe("random", () => {

  it("with length parameter", () => {
    expect(cc.random(32)).toHaveLength(32);
  });

  it("with buffer parameter", () => {
    expect(cc.random(Buffer.alloc(32))).toHaveLength(32);
  });

  it("with buffer and range parameters", () => {
    let rand = cc.random(Buffer.alloc(64), 16, 32);
    expect(rand).toHaveLength(64);
    expect(rand.slice(0, 16).compare(Buffer.alloc(16))).toBe(0);
    expect(rand.slice(48).compare(Buffer.alloc(16))).toBe(0);
  });

});
import { describe, it, expect } from "@jest/globals";

import cc from "../src";

describe("light_hash", () => {

  it("plain", () => {
    let data = Buffer.alloc(64);
    let expected = "ae09db7cd54f42b490ef09b6bc541af688e4959bb8c53f359a6f56e38ab454a3";
    expect(cc.light_hash(data).toString("hex")).toBe(expected);
  });

  it("keyed", () => {
    let data = Buffer.alloc(64);
    let key = Buffer.alloc(16, 0xff);
    let expected = "d4c88ee89b94cf08dcb89353a63fa082dec3c25908f4646aaed006c3cfe53d89";
    expect(cc.light_keyed_hash(key, data).toString("hex")).toBe(expected);
  });

  it("key derive", () => {
    let data = Buffer.alloc(64);
    let key = Buffer.alloc(16, 0xff);
    let length = 45;
    let info = "hello";
    let expected = "545ca8b4f0e45cef5fe0ea679317468c7ea739ac2ebb8c5c175efb3807acfbf2bb8a80c35d487f3de7aad78072";
    expect(cc.light_derive_key(key, data, length, info).toString("hex")).toBe(expected);
  });

});
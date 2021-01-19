import { describe, it, expect } from "@jest/globals";

import cc from "../src";

describe("hash", () => {

  it("plain", () => {
    let data = Buffer.alloc(64);
    let expected = "8715b7b58c747a49e371ba0b02b7de8f35da26ff2c8a60b80715d0272021266283af3eedb537683dd74cb1708601a80c9970376f1226d16afc242765eccd592a";
    expect(cc.hash(data).toString("hex")).toBe(expected);
  });

  it("keyed", () => {
    let data = Buffer.alloc(64);
    let key = Buffer.alloc(16, 0xff);
    let expected = "24f43c0fd53d173334f5c695dc3c2e1df26f2ab9c8634f0a3abecc8f7e127caae65232631ba2e6ada66eb82a18802e0c2b224f08842c0f2c4cfb303218fef6a7";
    expect(cc.keyed_hash(key, data).toString("hex")).toBe(expected);
  });

  it("key derive", () => {
    let data = Buffer.alloc(64);
    let key = Buffer.alloc(16, 0xff);
    let length = 89;
    let info = "hello";
    let expected = "49cee1a40749e266100f64dbf77987386bae62fb8f26aaf53acc931c29d91689b12d602317126ca315e4a1d7ffc53c4bbb9c52a25440c8c0625a362d0292cdf86cb8ec5b1e958ab9447c4b4170d767afb1a77cee63376f77cc";
    expect(cc.derive_key(key, data, length, info).toString("hex")).toBe(expected);
  });

});
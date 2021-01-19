import { describe, it, expect } from "@jest/globals";

import cc from "../src";

describe("symmetric", () => {

  it("encrypt", () => {
    let data = Buffer.alloc(64, 0x44);
    let key = Buffer.alloc(32, 0x22);
    let iv = Buffer.alloc(16, 0x99);

    let expected = "86cfac682a261c78e13088fb632dea7425a72da971646714bb78a229c9730c0a518529aa1999ae8ff0d966cfba33047291df640f1fca4b66117c6058226a7079";
    let ciphertext = cc.symmetric_encrypt(key, iv, data).toString("hex");

    expect(ciphertext).toBe(expected);
  });

  it("encrypt prefixed", () => {
    let data = Buffer.alloc(64, 0x44);
    let key = Buffer.alloc(32, 0x22);

    let ciphertext = cc.symmetric_encrypt_prefixed(key, data).toString("hex");

    expect(ciphertext).toHaveLength(160);
  });

  it("decrypt", () => {
    let ciphertext = "86cfac682a261c78e13088fb632dea7425a72da971646714bb78a229c9730c0a518529aa1999ae8ff0d966cfba33047291df640f1fca4b66117c6058226a7079";

    let expected = Buffer.alloc(64, 0x44).toString("hex");
    let key = Buffer.alloc(32, 0x22);
    let iv = Buffer.alloc(16, 0x99);

    let data = cc.symmetric_decrypt(key, iv, Buffer.from(ciphertext, "hex")).toString("hex");

    expect(data).toBe(expected);
  });

  it("decrypt prefixed", () => {
    let ciphertext = "9999999999999999999999999999999986cfac682a261c78e13088fb632dea7425a72da971646714bb78a229c9730c0a518529aa1999ae8ff0d966cfba33047291df640f1fca4b66117c6058226a7079";

    let expected = Buffer.alloc(64, 0x44).toString("hex");
    let key = Buffer.alloc(32, 0x22);

    let data = cc.symmetric_decrypt_prefixed(key, Buffer.from(ciphertext, "hex")).toString("hex");

    expect(data).toBe(expected);
  });

});
import { describe, it, expect } from "@jest/globals";

import cc from "../src";

describe("symmetric", () => {

  it("encrypt & decrypt", () => {
    let data = Buffer.alloc(64, 0x44);
    let key = Buffer.alloc(32, 0x22);
    let iv = Buffer.alloc(12, 0x99);

    let ciphertext = cc.authenticated_symmetric_encrypt(key, iv, data);

    let deciphertext = cc.authenticated_symmetric_decrypt(key, iv, ciphertext);

    expect(data.compare(deciphertext)).toBe(0);
  });

  it("encrypt & decrypt prefixed", () => {
    let data = Buffer.alloc(64, 0x44);
    let key = Buffer.alloc(32, 0x22);

    let ciphertext = cc.authenticated_symmetric_encrypt_prefixed(key, data);

    let deciphertext = cc.authenticated_symmetric_decrypt_prefixed(key, ciphertext);

    expect(data.compare(deciphertext)).toBe(0);
  });

  it("encrypt & decrypt + aad", () => {
    let data = Buffer.alloc(64, 0x44);
    let key = Buffer.alloc(32, 0x22);
    let iv = Buffer.alloc(12, 0x99);
    let aad = Buffer.alloc(64, 0xea);

    let ciphertext = cc.authenticated_symmetric_encrypt(key, iv, data, aad);

    let deciphertext = cc.authenticated_symmetric_decrypt(key, iv, ciphertext, aad);

    expect(data.compare(deciphertext)).toBe(0);
  });

  it("encrypt & decrypt + aad prefixed", () => {
    let data = Buffer.alloc(64, 0x44);
    let key = Buffer.alloc(32, 0x22);
    let aad = Buffer.alloc(64, 0xea);

    let ciphertext = cc.authenticated_symmetric_encrypt_prefixed(key, data, aad);

    let deciphertext = cc.authenticated_symmetric_decrypt_prefixed(key, ciphertext, aad);

    expect(data.compare(deciphertext)).toBe(0);
  });

});
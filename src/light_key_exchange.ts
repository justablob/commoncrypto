import * as crypto from "crypto";
import crk from "crypto-raw-key";

import * as _param from "./_param";

function light_key_exchange_import_key(type: "public" | "private", buf: Buffer): crypto.KeyObject {
  return crk.importKey(_param.LIGHT_KEY_EXCHANGE_ALGORITHM, type, buf);
}

function light_key_exchange_export_key(keyObject: crypto.KeyObject): Buffer {
  return crk.exportKey(keyObject);
}

function light_key_exchange_import_keypair(publicKey: Buffer, privateKey: Buffer): [crypto.KeyObject, crypto.KeyObject] {
  let publicKeyObject = crk.importKey(_param.LIGHT_KEY_EXCHANGE_ALGORITHM, "public", publicKey);
  let privateKeyObject = crk.importKey(_param.LIGHT_KEY_EXCHANGE_ALGORITHM, "private", privateKey);

  return [publicKeyObject, privateKeyObject];
}

function light_key_exchange_export_keypair(publicKeyObject: crypto.KeyObject, privateKeyObject: crypto.KeyObject): [Buffer, Buffer] {
  let publicKey = crk.exportKey(publicKeyObject);
  let privateKey = crk.exportKey(privateKeyObject);

  return [publicKey, privateKey];
}

function light_key_exchange_generate_keypair(): [crypto.KeyObject, crypto.KeyObject] {
  let keypair = crypto.generateKeyPairSync(_param.LIGHT_KEY_EXCHANGE_ALGORITHM);

  return [keypair.publicKey, keypair.privateKey];
}

function light_key_exchange_get_public_key(privateKey: crypto.KeyObject): crypto.KeyObject {
  if (privateKey.type !== "private") return null;
  let publicKey = crypto.createPublicKey(privateKey);

  return publicKey;
}

function light_key_exchange_derive_shared_secret(keyA: crypto.KeyObject, keyB: crypto.KeyObject): Buffer {
  if (keyA.type === "public") {
    if (keyB.type !== "private") return null;
    return crypto.diffieHellman({ publicKey: keyA, privateKey: keyB });
  } else if (keyB.type === "public") {
    if (keyA.type !== "private") return null;
    return crypto.diffieHellman({ publicKey: keyB, privateKey: keyA });
  } else return null;
}

export {
  light_key_exchange_import_key,
  light_key_exchange_export_key,
  light_key_exchange_import_keypair,
  light_key_exchange_export_keypair,
  light_key_exchange_generate_keypair,
  light_key_exchange_get_public_key,
  light_key_exchange_derive_shared_secret,
}
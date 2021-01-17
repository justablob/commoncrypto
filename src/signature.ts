import * as crypto from "crypto";
import crk from "crypto-raw-key";

import * as _param from "./_param";

function signature_import_key(type: "public" | "private", buf: Buffer): crypto.KeyObject {
  return crk.importKey(_param.SIGNATURE_ALGORITHM, type, buf);
}

function signature_export_key(keyObject: crypto.KeyObject): Buffer {
  return crk.exportKey(keyObject);
}

function signature_import_keypair(publicKey: Buffer, privateKey: Buffer): [crypto.KeyObject, crypto.KeyObject] {
  let publicKeyObject = crk.importKey(_param.SIGNATURE_ALGORITHM, "public", publicKey);
  let privateKeyObject = crk.importKey(_param.SIGNATURE_ALGORITHM, "private", privateKey);

  return [publicKeyObject, privateKeyObject];
}

function signature_export_keypair(publicKeyObject: crypto.KeyObject, privateKeyObject: crypto.KeyObject): [Buffer, Buffer] {
  let publicKey = crk.exportKey(publicKeyObject);
  let privateKey = crk.exportKey(privateKeyObject);

  return [publicKey, privateKey];
}

function signature_generate_keypair(): [crypto.KeyObject, crypto.KeyObject] {
  let keypair = crypto.generateKeyPairSync(_param.SIGNATURE_ALGORITHM);

  return [keypair.publicKey, keypair.privateKey];
}

function signature_get_public_key(privateKey: crypto.KeyObject): crypto.KeyObject {
  if (privateKey.type !== "private") return null;
  let publicKey = crypto.createPublicKey(privateKey);

  return publicKey;
}

function signature_sign(privateKey: crypto.KeyObject, data: Buffer): Buffer {
  if (privateKey.type !== "private") return null;
  return crypto.sign(undefined, data, privateKey);
}

function signature_verify(key: crypto.KeyObject, data: Buffer, signature: Buffer): boolean {
  let publicKey = key.type === "private" ? signature_get_public_key(key) : key;
  return crypto.verify(undefined, data, publicKey, signature);
}

export {
  signature_import_key,
  signature_export_key,
  signature_import_keypair,
  signature_export_keypair,
  signature_generate_keypair,
  signature_get_public_key,
  signature_sign,
  signature_verify,
}
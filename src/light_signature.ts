import * as crypto from "crypto";
import crk from "crypto-raw-key";

import * as _param from "./_param";

function light_signature_import_key(type: "public" | "private", buf: Buffer): crypto.KeyObject {
  return crk.importKey(_param.LIGHT_SIGNATURE_ALGORITHM, type, buf);
}

function light_signature_export_key(keyObject: crypto.KeyObject): Buffer {
  return crk.exportKey(keyObject);
}

function light_signature_import_keypair(publicKey: Buffer, privateKey: Buffer): [crypto.KeyObject, crypto.KeyObject] {
  let publicKeyObject = crk.importKey(_param.LIGHT_SIGNATURE_ALGORITHM, "public", publicKey);
  let privateKeyObject = crk.importKey(_param.LIGHT_SIGNATURE_ALGORITHM, "private", privateKey);

  return [publicKeyObject, privateKeyObject];
}

function light_signature_export_keypair(publicKeyObject: crypto.KeyObject, privateKeyObject: crypto.KeyObject): [Buffer, Buffer] {
  let publicKey = crk.exportKey(publicKeyObject);
  let privateKey = crk.exportKey(privateKeyObject);

  return [publicKey, privateKey];
}

function light_signature_generate_keypair(): [crypto.KeyObject, crypto.KeyObject] {
  let keypair = crypto.generateKeyPairSync(_param.LIGHT_SIGNATURE_ALGORITHM);

  return [keypair.publicKey, keypair.privateKey];
}

function light_signature_get_public_key(privateKey: crypto.KeyObject): crypto.KeyObject {
  if (privateKey.type !== "private") return null;
  let publicKey = crypto.createPublicKey(privateKey);

  return publicKey;
}

function light_signature_sign(privateKey: crypto.KeyObject, data: Buffer): Buffer {
  if (privateKey.type !== "private") return null;
  return crypto.sign(undefined, data, privateKey);
}

function light_signature_verify(key: crypto.KeyObject, data: Buffer, signature: Buffer): boolean {
  let publicKey = key.type === "private" ? light_signature_get_public_key(key) : key;
  return crypto.verify(undefined, data, publicKey, signature);
}

export {
  light_signature_import_key,
  light_signature_export_key,
  light_signature_import_keypair,
  light_signature_export_keypair,
  light_signature_generate_keypair,
  light_signature_get_public_key,
  light_signature_sign,
  light_signature_verify,
}
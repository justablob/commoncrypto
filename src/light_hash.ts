import * as crypto from "crypto";
import * as hkdf from "futoin-hkdf";

import * as _util from "./_util";
import * as _param from "./_param";

function light_hash(data: Buffer): Buffer {
  return crypto.createHash(_param.LIGHT_HASH_ALGORITHM).update(data).digest();
}

function light_keyed_hash(key: Buffer, data: Buffer): Buffer {
  return crypto.createHmac(_param.LIGHT_HASH_ALGORITHM, key).update(data).digest();
}

function light_derive_key(key: Buffer, data: Buffer, length: number = _param.LIGHT_HASH_ALGORITHM_OUTPUT_LENGTH, info: Buffer | string = "") {
  if (typeof (crypto as any).hkdfSync === "function") {
    return Buffer.from((crypto as any).hkdfSync(_param.LIGHT_HASH_ALGORITHM, key, data, info, length));
  } else {
    return hkdf(data, length, { hash: _param.LIGHT_HASH_ALGORITHM, info: info, salt: key });
  }
}

export {
  light_hash,
  light_keyed_hash,
  light_derive_key,
}
import * as crypto from "crypto";
import * as hkdf from "futoin-hkdf";

import * as _util from "./_util";
import * as _param from "./_param";

function hash(data: Buffer): Buffer {
  return crypto.createHash(_param.HASH_ALGORITHM).update(data).digest();
}

function keyed_hash(key: Buffer, data: Buffer): Buffer {
  return crypto.createHmac(_param.HASH_ALGORITHM, key).update(data).digest();
}

function derive_key(key: Buffer, data: Buffer, length: number = _param.HASH_ALGORITHM_OUTPUT_LENGTH, info: Buffer | string = "") {
  if (typeof (crypto as any).hkdfSync === "function") {
    return Buffer.from((crypto as any).hkdfSync(_param.HASH_ALGORITHM, key, data, info, length));
  } else {
    return hkdf(data, length, { hash: _param.HASH_ALGORITHM, info: info, salt: key });
  }
}

export {
  hash,
  keyed_hash,
  derive_key,
}
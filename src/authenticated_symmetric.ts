import * as crypto from "crypto";

import random from "./random";
import * as _param from "./_param";

function authenticated_symmetric_encrypt(key: Buffer, iv: Buffer, data: Buffer, aad?: Buffer): Buffer {
  if (key.length !== _param.AUTHENTICATED_SYMMETRIC_ALGORITHM_KEY_LENGTH) throw "incorrect authenticated_symmetric_encrypt() parameter: key";
  if (iv.length !== _param.AUTHENTICATED_SYMMETRIC_ALGORITHM_IV_LENGTH) throw "incorrect authenticated_symmetric_encrypt() parameter: iv";

  let cipher = crypto.createCipheriv(_param.AUTHENTICATED_SYMMETRIC_ALGORITHM, key, iv, { authTagLength: _param.AUTHENTICATED_SYMMETRIC_ALGOTITHM_TAG_LENGTH });
  if (aad) cipher.setAAD(aad, {} as any);

  let ciphertext = cipher.update(data);
  cipher.final();
  let authTag = cipher.getAuthTag();

  return Buffer.concat([ciphertext, authTag], ciphertext.length + authTag.length)
}

function authenticated_symmetric_decrypt(key: Buffer, iv: Buffer, ciphertext: Buffer, aad?: Buffer): Buffer {
  if (key.length !== _param.AUTHENTICATED_SYMMETRIC_ALGORITHM_KEY_LENGTH) throw "incorrect authenticated_symmetric_decrypt() parameter: key";
  if (iv.length !== _param.AUTHENTICATED_SYMMETRIC_ALGORITHM_IV_LENGTH) throw "incorrect authenticated_symmetric_decrypt() parameter: iv";

  let decipher = crypto.createDecipheriv(_param.AUTHENTICATED_SYMMETRIC_ALGORITHM, key, iv, { authTagLength: _param.AUTHENTICATED_SYMMETRIC_ALGOTITHM_TAG_LENGTH });
  if (aad) decipher.setAAD(aad, {} as any);

  let data_ciphertext = ciphertext.slice(0, -_param.AUTHENTICATED_SYMMETRIC_ALGOTITHM_TAG_LENGTH);
  let tag_ciphertext = ciphertext.slice(_param.AUTHENTICATED_SYMMETRIC_ALGOTITHM_TAG_LENGTH);

  decipher.setAuthTag(tag_ciphertext);
  let output = decipher.update(data_ciphertext);

  try {
    decipher.final();
    return output;
  } catch (err) {
    return null;
  }
}

function authenticated_symmetric_encrypt_prefixed(key: Buffer, data: Buffer, aad?: Buffer): Buffer {
  let iv = random(_param.AUTHENTICATED_SYMMETRIC_ALGORITHM_IV_LENGTH);

  let output = authenticated_symmetric_encrypt(key, iv, data, aad);

  return Buffer.concat([iv, output], iv.length + data.length);
}

function authenticated_symmetric_decrypt_prefixed(key: Buffer, ciphertext: Buffer, aad?: Buffer): Buffer {
  let iv = ciphertext.slice(0, 16);
  let ciphertext_data = ciphertext.slice(16);

  let output = authenticated_symmetric_decrypt(key, iv, ciphertext_data, aad);

  return output;
}

export {
  authenticated_symmetric_encrypt,
  authenticated_symmetric_decrypt,
  authenticated_symmetric_encrypt_prefixed,
  authenticated_symmetric_decrypt_prefixed,
}
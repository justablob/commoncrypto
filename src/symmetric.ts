import * as crypto from "crypto";

import random from "./random";
import * as _param from "./_param";

function symmetric_encrypt(key: Buffer, iv: Buffer, data: Buffer): Buffer {
  if (key.length !== _param.SYMMETRIC_ALGORITHM_KEY_LENGTH) throw "incorrect symmetric_encrypt() parameter: key";
  if (iv.length !== _param.SYMMETRIC_ALGORITHM_IV_LENGTH) throw "incorrect symmetric_encrypt() parameter: iv";

  let cipher = crypto.createCipheriv(_param.SYMMETRIC_ALGORITHM, key, iv);

  return cipher.update(data);
}

function symmetric_decrypt(key: Buffer, iv: Buffer, ciphertext: Buffer): Buffer {
  if (key.length !== _param.SYMMETRIC_ALGORITHM_KEY_LENGTH) throw "incorrect symmetric_decrypt() parameter: key";
  if (iv.length !== _param.SYMMETRIC_ALGORITHM_IV_LENGTH) throw "incorrect symmetric_decrypt() parameter: iv";

  let decipher = crypto.createDecipheriv(_param.SYMMETRIC_ALGORITHM, key, iv);

  return decipher.update(ciphertext);
}

function symmetric_encrypt_prefixed(key: Buffer, data: Buffer): Buffer {
  let iv = random(_param.SYMMETRIC_ALGORITHM_IV_LENGTH);

  let output = symmetric_encrypt(key, iv, data);

  return Buffer.concat([iv, output], iv.length + output.length);
}

function symmetric_decrypt_prefixed(key: Buffer, ciphertext: Buffer): Buffer {
  let iv = ciphertext.slice(0, _param.SYMMETRIC_ALGORITHM_IV_LENGTH);
  let ciphertext_data = ciphertext.slice(_param.SYMMETRIC_ALGORITHM_IV_LENGTH);

  let output = symmetric_decrypt(key, iv, ciphertext_data);

  return output;
}

export {
  symmetric_encrypt,
  symmetric_decrypt,
  symmetric_encrypt_prefixed,
  symmetric_decrypt_prefixed,
}
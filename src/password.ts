import * as crypto from "crypto";

import random from "./random";
import timing_safe_equal from "./timing_safe_equal";
import * as _param from "./_param";

function password_hash(password: string): Promise<Buffer> {
  return new Promise((res, rej) => {
    if (_param.PASSWORD_ALGORITHM === "scrypt") {
      let iv = random(_param.PASSWORD_SALT_LENGTH);

      crypto.scrypt(password, iv, _param.PASSWORD_OUTPUT_LENGTH, {
        N: _param.PASSWORD_PARAM_N,
        r: _param.PASSWORD_PARAM_R,
        p: _param.PASSWORD_PARAM_P,
      }, (err, output) => {
        if (err) rej(err);
        res(Buffer.concat([iv, output], _param.PASSWORD_SALT_LENGTH + _param.PASSWORD_OUTPUT_LENGTH));
      });
    }
  });
}

function password_verify(password: string, hash: Buffer): Promise<boolean> {
  return new Promise((res, rej) => {
    if (hash.length !== _param.PASSWORD_SALT_LENGTH + _param.PASSWORD_OUTPUT_LENGTH) rej();

    if (_param.PASSWORD_ALGORITHM === "scrypt") {
      let iv = hash.slice(0, _param.PASSWORD_SALT_LENGTH);
      let pHash = hash.slice(_param.PASSWORD_SALT_LENGTH);

      crypto.scrypt(password, iv, _param.PASSWORD_OUTPUT_LENGTH, {
        N: _param.PASSWORD_PARAM_N,
        r: _param.PASSWORD_PARAM_R,
        p: _param.PASSWORD_PARAM_P,
      }, (err, output) => {
        if (err) rej(err);
        res(timing_safe_equal(output, pHash));
      });
    }
  });
}

function password_sync_hash(password: string): Buffer {
  if (_param.PASSWORD_ALGORITHM === "scrypt") {
    let iv = random(_param.PASSWORD_SALT_LENGTH);

    let output = crypto.scryptSync(password, iv, _param.PASSWORD_OUTPUT_LENGTH, {
      N: _param.PASSWORD_PARAM_N,
      r: _param.PASSWORD_PARAM_R,
      p: _param.PASSWORD_PARAM_P,
    });

    return Buffer.concat([iv, output], _param.PASSWORD_SALT_LENGTH + _param.PASSWORD_OUTPUT_LENGTH);
  }
}

function password_sync_verify(password: string, hash: Buffer): boolean {
    if (hash.length !== _param.PASSWORD_SALT_LENGTH + _param.PASSWORD_OUTPUT_LENGTH) return false;

    if (_param.PASSWORD_ALGORITHM === "scrypt") {
      let iv = hash.slice(0, _param.PASSWORD_SALT_LENGTH);
      let pHash = hash.slice(_param.PASSWORD_SALT_LENGTH);

      let output = crypto.scryptSync(password, iv, _param.PASSWORD_OUTPUT_LENGTH, {
        N: _param.PASSWORD_PARAM_N,
        r: _param.PASSWORD_PARAM_R,
        p: _param.PASSWORD_PARAM_P,
      });

      return timing_safe_equal(output, pHash);
    }
}
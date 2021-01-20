//////////////////////////////////////////
//                                      //
//             commoncrypto             //
//                                      //
//////////////////////////////////////////

import { KeyObject } from "crypto";

import random from "./random";
import timing_safe_equal from "./timing_safe_equal";

import * as _param from "./_param";

import * as hash from "./hash";
import * as symmetric from "./symmetric";
import * as signature from "./signature";
import * as light_hash from "./light_hash";
import * as key_exchange from "./key_exchange";
import * as light_signature from "./light_signature";
import * as light_key_exchange from "./light_key_exchange";
import * as authenticated_symmetric from "./authenticated_symmetric";

const version = "1.0";

export {
  KeyObject,

  version,
  _param,

  random,
  timing_safe_equal,

  hash,
  symmetric,
  signature,
  light_hash,
  key_exchange,
  light_signature,
  light_key_exchange,
  authenticated_symmetric,
}

export default {
  KeyObject,

  version,
  _param,

  random,
  timing_safe_equal,

  ...hash,
  ...symmetric,
  ...signature,
  ...light_hash,
  ...key_exchange,
  ...light_signature,
  ...light_key_exchange,
  ...authenticated_symmetric,
}
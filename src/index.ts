//////////////////////////////////////////
//                                      //
//             commoncrypto             //
//                                      //
//////////////////////////////////////////

import random from "./random";
import timing_safe_equal from "./timing_safe_equal";

import * as hash from "./hash";
import * as symmetric from "./symmetric";
import * as signature from "./signature";
import * as key_exchange from "./key_exchange";
import * as authenticated_symmetric from "./authenticated_symmetric";

const version = "1.0";

export {
  version,

  random,
  timing_safe_equal,

  hash,
  symmetric,
  signature,
  key_exchange,
  authenticated_symmetric,
}

export default {
  version,

  random,
  timing_safe_equal,

  ...hash,
  ...symmetric,
  ...signature,
  ...key_exchange,
  ...authenticated_symmetric
}
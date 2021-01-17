import * as crypto from "crypto";

function random(length: number): Buffer
function random(buffer: Buffer, offset?: number, size?: number): Buffer
function random(data: number | Buffer, offset?: number, size?: number): Buffer {
  if (Buffer.isBuffer(data)) {
    return crypto.randomFillSync(data, offset, size);
  } else {
    return crypto.randomBytes(length);
  }
}

export default random;
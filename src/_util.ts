function readUtf8 (string: string): Buffer {
  return Buffer.from(string, "utf8");
}

export {
  readUtf8,
}
function timing_safe_equal <T extends string | Buffer> (a: T, b: T): boolean {
  let longer = Math.max(a.length, b.length);
  let match = true;

  for (let i = 0; i < longer; i++) {
    if (a[i] !== b[i]) {
      match = false;
    }
  }

  return match;
}

export default timing_safe_equal;
function splitPath(path) {
  const regex = /^(.+)\/([^\/]+)$/gm;
  let m;
  while ((m = regex.exec(path)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    return m;
  }
}

export { splitPath };

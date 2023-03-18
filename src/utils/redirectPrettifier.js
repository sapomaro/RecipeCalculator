export function redirectPrettifier() {
  if (window.location.hostname.match(/github\.io$/i)) {
    const matches = window.location.href.match(/^([^#]+)(build\/#redirect)$/);
    if (matches) {
      window.history.replaceState({}, '', matches[1]);
    }
  }
}

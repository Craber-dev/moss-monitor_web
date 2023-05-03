export function safetyHref(url: string) {
  const newWin = window.open(url);
  if (newWin?.opener) {
    newWin.opener = null;
  }
}

export function RefreshLocalStorage() {
  for (const key in localStorage) {
    if (key.startsWith("currentQuestionIndex")) {
      localStorage.setItem(key, String(0));
    }
  }
}

export const Titles = (categories: string) => {
  switch (categories) {
    case "general":
      return "General🌎";
    case "relationship-intimacy":
      return "Relationship intimacy👩‍❤️‍👨";
    case "unknown-future":
      return "Unknown Future🔮";
    case "dive-in-the-past":
      return "Dive in the Past🏎️";
    case "friends-council":
      return "Friends Council😎";
    default:
      return "Friends Council 18+🤤";
  }
};

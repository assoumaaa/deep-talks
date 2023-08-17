export const Titles = (categories: string) => {
  switch (categories) {
    case "general":
      return "General🌎";
    case "relationship_intimacy":
      return "Relationship intimacy👩‍❤️‍👨";
    case "unknown_future":
      return "Unknown Future🔮";
    case "dive_in_the_past":
      return "Dive in the Past🏎️";
    case "friends_council":
      return "Friends Council😎";
    default:
      return "Friends Council 18+🤤";
  }
};

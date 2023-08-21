export const Titles = (categories: string) => {
  switch (categories) {
    case "general":
      return "Random🌎";
    case "relationship_intimacy":
      return "Relationship intimacy👩‍❤️‍👨";
    case "unknown_future":
      return "Mysteries of Tommorow🔮";
    case "dive_in_the_past":
      return "Dive in the Past🏎️";
    case "friends_council":
      return "Friendship Odyssey😎";
    default:
      return "Flirty Exchange 18+🤤";
  }
};

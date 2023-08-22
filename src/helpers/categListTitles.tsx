const CategoriesList = [
  { name: "Random", href: "categories/general" },
  {
    name: "Relationship Bonds",
    href: "categories/relationship_intimacy",
  },
  {
    name: "Mysteries of Tommorow",
    href: "categories/unknown_future",
  },
  {
    name: "Dive in the Past",
    href: "categories/dive_in_the_past",
  },
  {
    name: "Friendship Odyssey",
    href: "categories/friends_council",
  },
  {
    name: "Flirty Exchange 18+",
    href: "categories/friends_council_18plus",
  },
];

export const GetTitleFromHref = (targetHref: string) => {
  return CategoriesList.find(({ href }) => href === targetHref);
};

export const CategoriesArray = () => {
  return CategoriesList;
};

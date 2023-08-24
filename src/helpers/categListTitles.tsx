const CategoriesList = [
  { name: "Random", href: "categories/general", img: "/random.png" },
  {
    name: "Relationship Bonds",
    href: "categories/relationship_intimacy",
    img: "/relationship_bonds.png",
  },
  {
    name: "Mysteries of Tommorow",
    href: "categories/unknown_future",
    img: "/mysteries_of_tomorrow.png",
  },
  {
    name: "Dive in the Past",
    href: "categories/dive_in_the_past",
    img: "/dive_in_the_past.png",
  },
  {
    name: "Friendship Odyssey",
    href: "categories/friends_council",
    img: "/friendship_odyssey.png",
  },
  {
    name: "Flirty Exchange 18+",
    href: "categories/friends_council_18plus",
    img: "/flirty_exchange_18plus.png",
  },
];

export const GetTitleFromHref = (targetHref: string) => {
  return CategoriesList.find(({ href }) => href === targetHref);
};

export const CategoriesArray = () => {
  return CategoriesList;
};

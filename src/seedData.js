import uuid from "react-native-uuid";

const lorem =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt non dolor delectus aspernatur molestias placeat. Nihil illum quasi totam pariatur qui incidunt delectus amet autem porro aperiam? Dolore, placeat iste.";
export const seedData = [
  {text: "Pet Summer", complete: false, priority: 0},
  {text: "Pet Josie", complete: false, priority: 0},
  {text: "Pet Moose", complete: true, priority: 0},
  {text: "Rue the day", complete: true, priority: 2},
  {text: "Be best", complete: false, priority: 1},
  {text: "Ponder puns ", complete: false, priority: 1},
  {text: lorem, complete: false, priority: 2},
].map(todo => {
  const id = uuid.v4();
  const dateCreated = new Date();
  return {...todo, id, dateCreated};
});

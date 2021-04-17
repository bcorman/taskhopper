export type Todo = {
  dateCreated: Date;
  text: string;
  complete: boolean;
  priority: number;
  id: string;
};

export type Todos = {
  [k: string]: Todo;
};

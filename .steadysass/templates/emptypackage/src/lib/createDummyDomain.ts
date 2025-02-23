export type CreateDummyDomainArgs = {
  name: string;
};

export const createDummyDomain = ({ name }: CreateDummyDomainArgs) => {
  return name;
};

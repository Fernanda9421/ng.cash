import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

export const customConfig:Config = {
  dictionaries: [names],
};

export const randomName = () => uniqueNamesGenerator(customConfig);

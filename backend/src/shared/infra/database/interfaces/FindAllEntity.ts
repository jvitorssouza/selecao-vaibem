import { DeepPartial } from 'typeorm';

export interface IFindAllEntity<T> {
  page?: number;
  limit?: number;
  filter?: DeepPartial<T>;
}

import { Value } from './value';

export class Range {
  id: string;
  uri: string;
  label: string;
  timesUsed : number;
  differentValues : number;
  curie: string;
  relation: boolean;
  values: Value[];

  constructor(values: Object = {}) {
    Object.assign(<any>this, values);
  }
}

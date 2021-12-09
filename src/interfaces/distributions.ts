export interface Distribution {
  name?: string;
  path?: string;
  total_number?: number;
}

export interface Distributions extends Array<Distribution> {}

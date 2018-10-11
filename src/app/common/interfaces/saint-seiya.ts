export interface ArmorVersion {
  id: number;
  name: string;
  image: string;
  self: string;
}

export interface Strength {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Armor {
  id: number;
  name: string;
  category: Category;
  versions: ArmorVersion[];
  strengths: Strength[];
}

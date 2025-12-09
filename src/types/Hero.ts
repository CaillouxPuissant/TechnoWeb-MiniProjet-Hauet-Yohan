export interface Hero {
  _id: string;
  nom: string;
  alias?: string;
  univers: string;
  pouvoirs: string[];
  description?: string;
  image?: string;
  origine?: string;
  premiereApparition?: string;
  createdAt: Date;
}
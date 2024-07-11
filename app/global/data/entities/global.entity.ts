export interface IDName {
  id: string;
  nama: string;
}

export interface IDNameTimestamp extends IDName {
  created_at: string | null;
  updated_at: string | null;
}

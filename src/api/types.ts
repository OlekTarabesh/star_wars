export interface Character {
  id: number | string;
  name: string;
  films?: number[];
  starships?: number[];
  position?: {
    x: number;
    y: number;
  };
  type?: string;
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Film {
  id: string | number;
  title: string;
}

export interface FilmsResponse {
  count: number;
  results: Film[];
}

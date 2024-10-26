export interface Character {
  id: number | string;
  name: string;
  films?: number[];
  starships?: number[];
  filmNode: boolean;
  position?: {
    x: number;
    y: number;
  };
  type?: string;
  title?: string;
  edge: {
    animated: boolean;
    id: string;
    source: string;
    target: string;
  };
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Film {
  id: number;
  title: string;
  characters: number[];
  starships: number[];
  edge?: {
    id: string;
    source: string;
    target: string;
  };
}

export interface FilmsResponse {
  count: number;
  results: Film[];
}

export interface StashipTypes {
  films: number[];
  id: number;
  name: string;
}
export interface StarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: StashipTypes[];
}

import { axiosInstance } from "../axios";
import {
  CharactersResponse,
  FilmsResponse,
  StarshipsResponse,
  StashipTypes,
} from "../types";

export const getCharacters = async (
  page: number
): Promise<CharactersResponse | void> => {
  try {
    const response = await axiosInstance.get<CharactersResponse>(`/people`, {
      params: {
        page: page,
      },
    });
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getFilms = async (
  filmIds: number[]
): Promise<FilmsResponse | void> => {
  try {
    const response = await axiosInstance.get<FilmsResponse>("/films", {
      params: {
        id: filmIds,
      },
    });
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getStarships = async (
  shipIds: number[]
): Promise<StarshipsResponse | StashipTypes[] | void> => {
  try {
    const requests = shipIds.map((id) =>
      axiosInstance.get<StashipTypes>(`/starships/${id}/`)
    );

    const responses = await Promise.all(requests);
    const starshipsData = responses.map((response) => response?.data);

    return starshipsData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

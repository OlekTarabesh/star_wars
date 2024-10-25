import { axiosInstance } from "../axios";
import { CharactersResponse, FilmsResponse } from "../types";

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

export const getFilms = async (): Promise<FilmsResponse | void> => {
  try {
    const response = await axiosInstance.get<FilmsResponse>("/films");
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

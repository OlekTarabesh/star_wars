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

export const getFilms = async (): Promise<FilmsResponse | void> => {
  try {
    const response = await axiosInstance.get<FilmsResponse>("/films");
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getStarships = async (): Promise<
  StarshipsResponse | StashipTypes[] | void
> => {
  let allStarships: StashipTypes[] = [];
  let page = 1;
  let hasMoreData = true;

  try {
    while (hasMoreData) {
      // Fetch one page of data
      const response = await axiosInstance.get<StarshipsResponse>(
        "/starships",
        {
          params: { page },
        }
      );

      // Add the current page's results to the total array
      const data = response.data;
      allStarships = allStarships.concat(data.results);

      // If there is no next page, stop the loop
      hasMoreData = !!data.next;
      page += 1; // Move to the next page
    }

    return allStarships as StashipTypes[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

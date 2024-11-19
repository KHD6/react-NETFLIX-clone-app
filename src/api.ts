const API_KEY = "2de1f29a5e0d1cec6eda632c055dba7c";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGUxZjI5YTVlMGQxY2VjNmVkYTYzMmMwNTVkYmE3YyIsIm5iZiI6MTczMTk0ODAyNC45MjY2MzkzLCJzdWIiOiI2NzNiNTBjMzgzYjY2NmE0ZTlhMmRhMDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xdYWjef4BTLjhFX4FyiQD-yDZguuLiN-sdSBj0UpAMI",
    },
  };
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=ko-KR&page=1&region=kr`,
    options
  ).then((res) => res.json());
}

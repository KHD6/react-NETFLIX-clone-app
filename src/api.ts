const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMoviesNow() {
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

export function getMoviesUpcoming() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGUxZjI5YTVlMGQxY2VjNmVkYTYzMmMwNTVkYmE3YyIsIm5iZiI6MTczMjA4NDg4Mi4yNTQ4MzQsInN1YiI6IjY3M2I1MGMzODNiNjY2YTRlOWEyZGEwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MJWxeO2XXrLnBWXMiVxWehJxroMHntCtZ64ng2cS5OU",
    },
  };

  return fetch(
    `${BASE_PATH}/movie/upcoming?language=ko-KR&page=1`,
    options
  ).then((res) => res.json());
}

export function getMoviesTopRated() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGUxZjI5YTVlMGQxY2VjNmVkYTYzMmMwNTVkYmE3YyIsIm5iZiI6MTczMjA4NDg4Mi4yNTQ4MzQsInN1YiI6IjY3M2I1MGMzODNiNjY2YTRlOWEyZGEwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MJWxeO2XXrLnBWXMiVxWehJxroMHntCtZ64ng2cS5OU",
    },
  };

  return fetch(
    `${BASE_PATH}/movie/top_rated?language=ko-KR&page=1`,
    options
  ).then((res) => res.json());
}

interface genres {
  id: string;
  name: string;
}

export interface IGetMoviesDetails {
  backdrop_path: string;
  poster_path: string;
  genres: genres[];
  id: string;
  original_language: string;
  original_title: string;
  title: string;
  tagline: string;
  overview: string;
  vote_average: number;
  runtime: string;
  release_date: string;
}

export function getMoviesDetails(id: number) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGUxZjI5YTVlMGQxY2VjNmVkYTYzMmMwNTVkYmE3YyIsIm5iZiI6MTczMjcwMjgzMC4xMjI2MzkyLCJzdWIiOiI2NzNiNTBjMzgzYjY2NmE0ZTlhMmRhMDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Z8xLPlJKKTLtrJqRULsSLIapWcET3gyVaBGFScHZaIk",
    },
  };

  return fetch(`${BASE_PATH}/movie/${id}?language=ko-KR`, options).then((res) =>
    res.json()
  );
}

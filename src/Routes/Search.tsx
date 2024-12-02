import { Navigate, useLocation, useMatch, useNavigate } from "react-router-dom";
import {
  getMoviesDetails,
  getMultiSearch,
  getTvDetails,
  IGetMoviesDetails,
  IGetSearch,
} from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  Banner,
  BigCover,
  BigMovie,
  BigTitle,
  DetailBox,
  DetailsBtn,
  ExitBtn,
  Info,
  Loader,
  NoDataText,
  Overlay,
  Overview,
  OverviewGenres,
  OverviewOriginalTitle,
  OverviewStars,
  OverviewTagline,
  OverviewTime,
  OverviewTitle,
  Overviewtxt,
  PlayBtn,
  PopUp,
  Poster,
  PosterBox,
  Star,
  Title,
} from "./Home.styles";
import { Inner, makeImagePath } from "../utilities";
import { ListBox, SearchBox, SearchList, SearchTitle } from "./Search.styles";
import { AnimatePresence } from "framer-motion";

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.2,
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.2,
      type: "tween",
    },
  },
};

function Search() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");
  const movieId = params.get("id");
  const bigSearchMatch = useMatch(
    `/react-NETFLIX-clone-app/search?keyword=:keyword&:movieId`
  );
  const isMatch = keyword !== null && movieId !== null;

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const { data: multiSearchData, isLoading: multiSearchLoading } =
    useQuery<IGetSearch>(
      ["detailsData", "multiSearch", keyword],
      () => getMultiSearch(keyword!),
      {
        enabled: keyword !== null,
      }
    );
  const { data: movieDetailsData, isLoading: movieDetailsLoading } =
    useQuery<IGetMoviesDetails>(
      ["detailsData", selectedMovieId],
      () => getMoviesDetails(selectedMovieId!),
      {
        enabled: selectedMovieId !== null,
      }
    );
  const { data: TvDetailsData, isLoading: TvDetailsLoading } =
    useQuery<IGetMoviesDetails>(
      ["detailsData", selectedMovieId],
      () => getTvDetails(selectedMovieId!),
      {
        enabled: selectedMovieId !== null,
      }
    );
  const indexNumber: number = 0;

  const navigate = useNavigate();

  const [choiceMovie, setChoiceMovie] = useState("");
  const [choiceType, setChoiceType] = useState("");

  const onSearchBoxClicked = (
    movieId: number,
    keyword: any,
    mediaType: string
  ) => {
    navigate(
      `/react-NETFLIX-clone-app/search?keyword=${keyword}&id=${movieId}`
    );
    setChoiceMovie(keyword);
    setChoiceType(mediaType);
    setSelectedMovieId(movieId);
  };
  const searchClicked =
    bigSearchMatch?.params.movieId &&
    multiSearchData?.results.find(
      (Data) => Data.id + "" === bigSearchMatch.params.movieId
    );
  const onOverlayClick = () => {
    navigate(`/react-NETFLIX-clone-app/search?keyword=${keyword}`);
    setChoiceMovie("");
    setSelectedMovieId(null);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const starRating = rating / 2;
    const fullStars = Math.floor(starRating);
    const halfStar = starRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="star full">
          ★
        </Star>
      );
    }

    if (halfStar) {
      stars.push(
        <Star key="half" className="star half">
          ★
        </Star>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="star empty">
          ★
        </Star>
      );
    }

    return stars;
  };

  console.log(choiceType);

  const modalPopUp = (
    choiceMovie: string,
    choiceType: string,
    match: any,
    clickMovie: any
  ) => {
    return (
      <PopUp>
        <Overlay
          onClick={onOverlayClick}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <BigMovie layoutId={choiceMovie + match?.params.movieId}>
          <ExitBtn onClick={onOverlayClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M13.93,12L21.666,2.443c.521-.644,.422-1.588-.223-2.109-.645-.522-1.588-.421-2.109,.223l-7.334,9.06L4.666,.557c-1.241-1.519-3.56,.357-2.332,1.887l7.736,9.557L2.334,21.557c-.521,.644-.422,1.588,.223,2.109,.64,.519,1.586,.424,2.109-.223l7.334-9.06,7.334,9.06c.524,.647,1.47,.742,2.109,.223,.645-.521,.744-1.466,.223-2.109l-7.736-9.557Z"
              />
            </svg>
          </ExitBtn>
          {choiceType === "movie" ? (
            movieDetailsLoading ? (
              <Loader>Loading...</Loader>
            ) : (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                      movieDetailsData?.backdrop_path + "",
                      "w500"
                    )})`,
                  }}
                />
                <PosterBox>
                  <Poster
                    style={{
                      backgroundImage: `url(${makeImagePath(
                        movieDetailsData?.poster_path + "",
                        "w500"
                      )})`,
                    }}
                  />
                  <PlayBtn className="playBtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Filled"
                      viewBox="0 0 24 24"
                      width="512"
                      height="512"
                    >
                      <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"
                      />
                    </svg>
                    <span>재생</span>
                  </PlayBtn>
                </PosterBox>
                <DetailBox>
                  <Inner className="inner">
                    <OverviewTitle>{movieDetailsData?.title}</OverviewTitle>
                    <OverviewOriginalTitle>
                      <span>( 원어 : {movieDetailsData?.original_title})</span>
                      <span>{movieDetailsData?.original_language}</span>
                    </OverviewOriginalTitle>
                    <OverviewTime>
                      <span>{movieDetailsData?.release_date}</span>{" "}
                      <span>{movieDetailsData?.runtime} 분</span>
                    </OverviewTime>
                    <OverviewStars className="star-rating">
                      {renderStars(movieDetailsData?.vote_average ?? 0)}(
                      {movieDetailsData?.vote_average.toFixed(1) ?? 0.0})
                    </OverviewStars>
                    <OverviewGenres>
                      {movieDetailsData?.genres.map((genre) => (
                        <li key={genre.id}>「{genre.name}」</li>
                      ))}
                    </OverviewGenres>
                    <OverviewTagline>
                      {movieDetailsData?.tagline}
                    </OverviewTagline>
                    <Overviewtxt>{movieDetailsData?.overview}</Overviewtxt>
                  </Inner>
                </DetailBox>
              </>
            )
          ) : choiceType === "tv" ? (
            TvDetailsLoading ? (
              <Loader>Loading...</Loader>
            ) : (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                      TvDetailsData?.backdrop_path + "",
                      "w500"
                    )})`,
                  }}
                />
                <PosterBox>
                  <Poster
                    style={{
                      backgroundImage: `url(${makeImagePath(
                        TvDetailsData?.poster_path + "",
                        "w500"
                      )})`,
                    }}
                  />
                  <PlayBtn className="playBtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Filled"
                      viewBox="0 0 24 24"
                      width="512"
                      height="512"
                    >
                      <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"
                      />
                    </svg>
                    <span>재생</span>
                  </PlayBtn>
                </PosterBox>
                <DetailBox>
                  <Inner className="inner">
                    <OverviewTitle>{TvDetailsData?.name}</OverviewTitle>
                    <OverviewOriginalTitle>
                      <span>( 원어 : {TvDetailsData?.original_title})</span>
                      <span>{TvDetailsData?.original_language}</span>
                    </OverviewOriginalTitle>
                    <OverviewTime>
                      <span>{TvDetailsData?.release_date}</span>{" "}
                      <span>{TvDetailsData?.runtime} 분</span>
                    </OverviewTime>
                    <OverviewStars className="star-rating">
                      {renderStars(TvDetailsData?.vote_average ?? 0)}(
                      {TvDetailsData?.vote_average.toFixed(1) ?? 0.0})
                    </OverviewStars>
                    <OverviewGenres>
                      {TvDetailsData?.genres.map((genre) => (
                        <li key={genre.id}>「{genre.name}」</li>
                      ))}
                    </OverviewGenres>
                    <OverviewTagline>
                      {TvDetailsData?.tagline}
                    </OverviewTagline>
                    <Overviewtxt>{TvDetailsData?.overview}</Overviewtxt>
                  </Inner>
                </DetailBox>
              </>
            )
          ) : null}
        </BigMovie>
      </PopUp>
    );
  };

  return (
    <div>
      {multiSearchLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              multiSearchData?.results[indexNumber].backdrop_path || ""
            )}
          >
            <Inner>
              <Title>{multiSearchData?.results[indexNumber].name}</Title>
              <Overview>
                {multiSearchData?.results[indexNumber].overview}
              </Overview>
              <div style={{ display: "flex" }}>
                <PlayBtn>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Filled"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                  >
                    <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"
                    />
                  </svg>
                  <span>재생</span>
                </PlayBtn>
                <DetailsBtn
                  onClick={() => {
                    if (multiSearchData?.results[0]?.id) {
                      onSearchBoxClicked(
                        multiSearchData.results[indexNumber].id,
                        keyword,
                        multiSearchData.results[indexNumber].media_type
                      );
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    viewBox="0 0 24 24"
                    data-name="Layer 1"
                  >
                    <path d="m15 20h-10a5.006 5.006 0 0 1 -5-5v-10a5.006 5.006 0 0 1 5-5h10a5.006 5.006 0 0 1 5 5v10a5.006 5.006 0 0 1 -5 5zm-10-18a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-10a3 3 0 0 0 -3-3zm19 17v-13a1 1 0 0 0 -2 0v13a3 3 0 0 1 -3 3h-13a1 1 0 0 0 0 2h13a5.006 5.006 0 0 0 5-5z" />
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m15 20h-10a5.006 5.006 0 0 1 -5-5v-10a5.006 5.006 0 0 1 5-5h10a5.006 5.006 0 0 1 5 5v10a5.006 5.006 0 0 1 -5 5zm-10-18a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-10a3 3 0 0 0 -3-3zm19 17v-13a1 1 0 0 0 -2 0v13a3 3 0 0 1 -3 3h-13a1 1 0 0 0 0 2h13a5.006 5.006 0 0 0 5-5z"
                    />
                  </svg>
                  <span>상세정보</span>
                </DetailsBtn>
              </div>
            </Inner>
          </Banner>
          <Inner>
            <SearchBox>
              <SearchTitle>Search</SearchTitle>
              <ListBox>
                {multiSearchData?.results.map((movie: any) => (
                  <SearchList
                    layoutId={movie.id}
                    key={movie.id}
                    whileHover="hover"
                    initial="normal"
                    variants={BoxVariants}
                    onClick={() =>
                      onSearchBoxClicked(movie.id, keyword, movie.media_type)
                    }
                    bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    {movie.backdrop_path === null ? (
                      <NoDataText>이미지 없음</NoDataText>
                    ) : null}
                    <Info variants={infoVariants}>
                      <BigTitle>
                        {movie.title
                          ? movie.title
                          : movie.name
                          ? movie.name
                          : null}
                      </BigTitle>
                    </Info>
                  </SearchList>
                ))}
              </ListBox>
            </SearchBox>
          </Inner>
          <AnimatePresence>
            {isMatch
              ? modalPopUp(
                  choiceMovie,
                  choiceType,
                  bigSearchMatch,
                  searchClicked
                )
              : null}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default Search;

import { useQuery } from "react-query";
import {
  getMoviesDetails,
  getMoviesNow,
  getMoviesTopRated,
  getMoviesUpcoming,
  IGetMoviesDetails,
  IGetMoviesResult,
} from "../api";
import {
  Banner,
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  Box,
  ContentBox,
  DetailBox,
  DetailsBtn,
  ExitBtn,
  Info,
  Loader,
  NextBtn,
  Overlay,
  Overview,
  PlayBtn,
  PopUp,
  Poster,
  PosterBox,
  PrevBtn,
  Row,
  Slider,
  SliderBox,
  SliderTitle,
  Star,
  Title,
  Wrapper,
} from "./Home.styles";
import { Inner, makeImagePath } from "../utilities";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useScroll } from "framer-motion";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

const rowVariants = {
  hidden: (custom: { custom: number; isBack: boolean }) => ({
    x: custom.isBack ? -custom.custom - 5 : custom.custom + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (custom: { custom: number; isBack: boolean }) => ({
    x: custom.isBack ? custom.custom + 5 : -custom.custom - 5,
  }),
};

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

function Home() {
  const [offset, setOffset] = useState(2);
  const width = window.innerWidth;
  useEffect(() => {
    const updateOffset = () => {
      if (width >= 1024) {
        setOffset(5);
      } else if (width >= 768) {
        setOffset(4);
      } else {
        setOffset(2);
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);
  const navigate = useNavigate();
  const bigNowMovieMatch = useMatch(
    "/react-NETFLIX-clone-app/movies/nowplaying/:movieId"
  );
  const bigUpcomingMovieMatch = useMatch(
    "/react-NETFLIX-clone-app/movies/upcoming/:movieId"
  );
  const bigTopRatedMovieMatch = useMatch(
    "/react-NETFLIX-clone-app/movies/toprated/:movieId"
  );
  const [leaving, setLeaving] = useState(false);
  const windowWidth = useWindowWidth();
  const [isBack, setIsBack] = useState(false);
  const [choiceMovie, setChoiceMovie] = useState("");

  const getIndexByCurrentMinute = () => {
    const currentMinutes = new Date().getMinutes();
    const indexNumber = currentMinutes % 20;
    return indexNumber;
  };
  const indexNumber = getIndexByCurrentMinute();

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const { data: detailsData, isLoading: detailsLoading } =
    useQuery<IGetMoviesDetails>(
      ["detailsData", selectedMovieId],
      () => getMoviesDetails(selectedMovieId!),
      {
        enabled: selectedMovieId !== null,
      }
    );

  const [nowIndex, setNowIndex] = useState(0);
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMoviesNow);

  const [comingIndex, setComingIndex] = useState(0);
  const { data: upcomingData, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upComing"], getMoviesUpcoming);

  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getMoviesTopRated);

  const incraseIndex = (
    indexSetter: React.Dispatch<React.SetStateAction<number>>,
    data: IGetMoviesResult | undefined,
    direction: "next" | "prev"
  ) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();

      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      indexSetter((prev) => {
        if (direction === "next") {
          return prev === maxIndex ? 0 : prev + 1;
        } else {
          return prev === 0 ? maxIndex : prev - 1;
        }
      });
    }
  };

  const nowPrevBtn = async () => {
    await setIsBack(true);
    incraseIndex(setNowIndex, nowPlayingData, "prev");
  };

  const nowNextBtn = async () => {
    await setIsBack(false);
    incraseIndex(setNowIndex, nowPlayingData, "next");
  };

  const comingPrevBtn = async () => {
    await setIsBack(true);
    incraseIndex(setComingIndex, upcomingData, "prev");
  };

  const comingNextBtn = async () => {
    await setIsBack(false);
    incraseIndex(setComingIndex, upcomingData, "next");
  };

  const topRatedPrevBtn = async () => {
    await setIsBack(true);
    incraseIndex(setTopRatedIndex, topRatedData, "prev");
  };

  const topRatedNextBtn = async () => {
    await setIsBack(false);
    incraseIndex(setTopRatedIndex, topRatedData, "next");
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onNowPlayingBoxClicked = (movieId: number) => {
    navigate(`/react-NETFLIX-clone-app/movies/nowplaying/${movieId}`);
    setChoiceMovie("now");
    setSelectedMovieId(movieId);
  };

  const onupcomingBoxClicked = (movieId: number) => {
    navigate(`/react-NETFLIX-clone-app/movies/upcoming/${movieId}`);
    setChoiceMovie("upcoming");
    setSelectedMovieId(movieId);
  };

  const onTopRatedBoxClicked = (movieId: number) => {
    navigate(`/react-NETFLIX-clone-app/movies/toprated/${movieId}`);
    setChoiceMovie("toprated");
    setSelectedMovieId(movieId);
  };

  const onOverlayClick = () => {
    navigate("/react-NETFLIX-clone-app/");
    setChoiceMovie("");
    setSelectedMovieId(null);
  };

  const nowClickedMovie =
    bigNowMovieMatch?.params.movieId &&
    nowPlayingData?.results.find(
      (nowPlayingData) =>
        nowPlayingData.id + "" === bigNowMovieMatch.params.movieId
    );

  const upcomingClickedMovie =
    bigUpcomingMovieMatch?.params.movieId &&
    upcomingData?.results.find(
      (upcomingData) =>
        upcomingData.id + "" === bigUpcomingMovieMatch.params.movieId
    );

  const topRatedClickedMovie =
    bigTopRatedMovieMatch?.params.movieId &&
    topRatedData?.results.find(
      (nowPlayingData) =>
        nowPlayingData.id + "" === bigTopRatedMovieMatch.params.movieId
    );

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

  const slide = (
    title: string,
    layoutId: string,
    index: any,
    data: any,
    clicked: any,
    prev: any,
    next: any
  ) => (
    <Slider>
      <SliderTitle>{title}</SliderTitle>
      <SliderBox>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            custom={{ custom: windowWidth, isBack }}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie: any) => (
                <Box
                  layoutId={layoutId + movie.id}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={BoxVariants}
                  onClick={() => clicked(movie.id)}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <BigTitle>{movie.title}</BigTitle>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <PrevBtn onClick={prev} />
        <NextBtn onClick={next} />
      </SliderBox>
    </Slider>
  );

  const modalPopUp = (choiceMovie: string, match: any, clickMovie: any) => {
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
          {detailsLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            <>
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                    detailsData?.backdrop_path + "",
                    "w500"
                  )})`,
                }}
              />
              <PosterBox>
                <Poster
                  style={{
                    backgroundImage: `url(${makeImagePath(
                      detailsData?.poster_path + "",
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
                <BigOverview>{detailsData?.title}</BigOverview>
                <div>{detailsData?.original_title}</div>
                <div>{detailsData?.original_language}</div>
                <div>{detailsData?.tagline}</div>
                <BigOverview>{detailsData?.overview}</BigOverview>
                {detailsData?.genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
                <div>{detailsData?.runtime}분</div>
                <div>{detailsData?.release_date}</div>
                <div className="star-rating">
                  {renderStars(detailsData?.vote_average ?? 0)}(
                  {detailsData?.vote_average.toFixed(1) ?? 0.0})
                </div>
              </DetailBox>
            </>
          )}
        </BigMovie>
      </PopUp>
    );
  };

  return (
    <Wrapper>
      {nowPlayingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              nowPlayingData?.results[indexNumber].backdrop_path || ""
            )}
          >
            <Inner>
              <Title>{nowPlayingData?.results[indexNumber].title}</Title>
              <Overview>
                {nowPlayingData?.results[indexNumber].overview}
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
                    if (nowPlayingData?.results[indexNumber]?.id) {
                      onNowPlayingBoxClicked(
                        nowPlayingData.results[indexNumber].id
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
            <ContentBox>
              {slide(
                "현재 상영중",
                "now",
                nowIndex,
                nowPlayingData,
                onNowPlayingBoxClicked,
                nowPrevBtn,
                nowNextBtn
              )}
              {slide(
                "개봉예정",
                "upcoming",
                comingIndex,
                upcomingData,
                onupcomingBoxClicked,
                comingPrevBtn,
                comingNextBtn
              )}
              {slide(
                "높은 인기",
                "toprated",
                topRatedIndex,
                topRatedData,
                onTopRatedBoxClicked,
                topRatedPrevBtn,
                topRatedNextBtn
              )}
            </ContentBox>
          </Inner>
          <AnimatePresence>
            {bigNowMovieMatch
              ? modalPopUp(choiceMovie, bigNowMovieMatch, nowClickedMovie)
              : bigUpcomingMovieMatch
              ? modalPopUp(
                  choiceMovie,
                  bigUpcomingMovieMatch,
                  upcomingClickedMovie
                )
              : bigTopRatedMovieMatch
              ? modalPopUp(
                  choiceMovie,
                  bigTopRatedMovieMatch,
                  topRatedClickedMovie
                )
              : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

import { useQuery } from "react-query";
import {
  getMoviesDetails,
  getTvAiringToday,
  getTvDetails,
  getTvTopRated,
  IGetMoviesDetails,
  IGetMoviesResult,
} from "../api";
import {
  Banner,
  BigCover,
  BigMovie,
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

function Tv() {
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
  const bigAiringTodayMatch = useMatch(
    "/react-NETFLIX-clone-app/tv/AiringToday/:movieId" //수정예정
  );
  const bigTopRatedMovieMatch = useMatch(
    "/react-NETFLIX-clone-app/tv/toprated/:movieId" //수정예정
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
      () => getTvDetails(selectedMovieId!),
      {
        enabled: selectedMovieId !== null,
      }
    );

  const [nowIndex, setNowIndex] = useState(0);
  const { data: airingTodayData, isLoading: airingTodayLoading } =
    useQuery<IGetMoviesResult>(["tv", "airingToday"], getTvAiringToday);

  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["tv", "topRated"], getTvTopRated);

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
    incraseIndex(setNowIndex, airingTodayData, "prev");
  };

  const nowNextBtn = async () => {
    await setIsBack(false);
    incraseIndex(setNowIndex, airingTodayData, "next");
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

  const onairingTodayBoxClicked = (movieId: number) => {
    navigate(`/react-NETFLIX-clone-app/tv/AiringToday/${movieId}`); //수정예정
    setChoiceMovie("now");
    setSelectedMovieId(movieId);
  };

  const ononTheAirBoxClicked = (movieId: number) => {
    navigate(`/react-NETFLIX-clone-app/tv/onTheAir/${movieId}`); //수정예정
    setChoiceMovie("onTheAir");
    setSelectedMovieId(movieId);
  };

  const onTopRatedBoxClicked = (movieId: number) => {
    navigate(`/react-NETFLIX-clone-app/tv/toprated/${movieId}`); //수정예정
    setChoiceMovie("toprated");
    setSelectedMovieId(movieId);
  };

  const onOverlayClick = () => {
    navigate("/react-NETFLIX-clone-app/tv");
    setChoiceMovie("");
    setSelectedMovieId(null);
  };

  const nowClickedMovie =
    bigAiringTodayMatch?.params.movieId &&
    airingTodayData?.results.find(
      (airingTodayData) =>
        airingTodayData.id + "" === bigAiringTodayMatch.params.movieId
    );

  const topRatedClickedMovie =
    bigTopRatedMovieMatch?.params.movieId &&
    topRatedData?.results.find(
      (airingTodayData) =>
        airingTodayData.id + "" === bigTopRatedMovieMatch.params.movieId
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
                    <BigTitle>{movie.name}</BigTitle>
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
                <Inner className="inner">
                  <OverviewTitle>{detailsData?.name}</OverviewTitle>
                  <OverviewOriginalTitle>
                    <span>( 원어 : {detailsData?.original_name})</span>
                    <span>{detailsData?.original_language}</span>
                  </OverviewOriginalTitle>
                  <OverviewTime>
                    <span>{detailsData?.first_air_date}</span>{" "}
                  </OverviewTime>
                  <OverviewStars className="star-rating">
                    {renderStars(detailsData?.vote_average ?? 0)}(
                    {detailsData?.vote_average.toFixed(1) ?? 0.0})
                  </OverviewStars>
                  <OverviewGenres>
                    {detailsData?.genres.map((genre) => (
                      <li key={genre.id}>「{genre.name}」</li>
                    ))}
                  </OverviewGenres>
                  <OverviewTagline>{detailsData?.tagline}</OverviewTagline>
                  <Overviewtxt>{detailsData?.overview}</Overviewtxt>
                </Inner>
              </DetailBox>
            </>
          )}
        </BigMovie>
      </PopUp>
    );
  };

  return (
    <Wrapper>
      {airingTodayLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              topRatedData?.results[indexNumber].backdrop_path || ""
            )}
          >
            <Inner>
              <Title>{topRatedData?.results[indexNumber].name}</Title>
              <Overview>{topRatedData?.results[indexNumber].overview}</Overview>
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
                    if (topRatedData?.results[indexNumber]?.id) {
                      onairingTodayBoxClicked(
                        topRatedData.results[indexNumber].id
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
                "Top Rated",
                "toprated",
                topRatedIndex,
                topRatedData,
                onTopRatedBoxClicked,
                topRatedPrevBtn,
                topRatedNextBtn
              )}
              {slide(
                "AiringToday",
                "doday",
                nowIndex,
                airingTodayData,
                onairingTodayBoxClicked,
                nowPrevBtn,
                nowNextBtn
              )}
            </ContentBox>
          </Inner>
          <AnimatePresence>
            {bigAiringTodayMatch
              ? modalPopUp(
                  choiceMovie,
                  bigTopRatedMovieMatch,
                  topRatedClickedMovie
                )
              : bigTopRatedMovieMatch
              ? modalPopUp(choiceMovie, bigAiringTodayMatch, nowClickedMovie)
              : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;

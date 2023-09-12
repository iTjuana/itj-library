import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import styles from "src/styles/carousel.module.css";

const settings = {
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export interface CarouselProps {
  books: {
    title: string;
    image: string;
  }[];
  size?: "small" | "medium" | "large";
  dots?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
}

export const SimpleCarousel: React.FunctionComponent<CarouselProps> = (
  props
) => {
  const { books, size, dots, speed, slidesToShow, slidesToScroll, infinite } =
    props;

  const width = size === "small" ? 200 : size === "medium" ? 300 : 350;
  const height = size === "small" ? 200 : size === "medium" ? 300 : 350;

  if (!books?.length) {
    return <></>;
  }

  return (
    <div className={styles.Container}>
      <Slider
        {...settings}
        dots={dots}
        speed={speed}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        infinite={infinite}
      >
        {books?.map((book) => (
          <div
            className="!flex flex-col items-center justify-center"
            key={book?.title}
          >
            <Link href={book?.title ?? "/"}>
              <Image
                src={book.image ?? "/cover-unavailable.jpg"}
                width={width}
                height={height}
                alt="cover"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

SimpleCarousel.defaultProps = {
  size: "medium",
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
};

import Slider from "react-slick";
import { Book, SimpleBook } from "./book";
import Link from "next/link";
import Image from "next/image";

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
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
  books: (Book | null)[];
}

export const SimpleCarousel: React.FunctionComponent<CarouselProps> = (
  props
) => {
  const { books } = props;

  if (!books?.length) {
    return <></>;
  }

  return (
    <div>
      <Slider {...settings}>
        {books?.map((book) => (
          <div
            className="!flex flex-col items-center justify-center"
            key={book?.title}
          >
            <Link href={book?.title ?? "/"}>
              <Image
                src={book.image ?? "/cover-unavailable.jpg"}
                width={300}
                height={300}
                alt="cover"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

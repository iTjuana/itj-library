import React, { useState, useEffect } from "react";
import styles from "~/styles/carousel.module.css";

type Props = {
  removeArrows?: boolean;
  removeIndexGuide?: boolean;
  removeControls?: boolean;
  interval?: number;
  children: React.ReactElement[];
  show: number;
  infiniteLoop?: boolean;
};

const Carousel: React.FunctionComponent<Props> = (props) => {
  const { children, show, infiniteLoop } = props;

  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
  const [length, setLength] = useState<number>(children.length);

  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && children.length > show
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const next = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  const renderExtraPrev = () => {
    const output = [];

    for (let index = 0; index < show; index++) {
      output.push(children[length - 1 - index]);
    }

    output.reverse();

    return output;
  };

  const renderExtraNext = () => {
    const output = [];

    for (let index = 0; index < show; index++) {
      output.push(children[index]);
    }

    return output;
  };

  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > show);
  }, [children, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating && (currentIndex === show || currentIndex === length)) {
      setTransitionEnabled(true);
    }
  }, [currentIndex, isRepeating, show, length]);

  return (
    <div className={styles.CarouselContainer}>
      <div className={styles.CarouselWrapper}>
        {(isRepeating || currentIndex > 0) && (
          <button onClick={prev} className={styles.LeftArrow}>
            &lt;
          </button>
        )}
        <div className={styles.CarouselContentWrapper}>
          <div
            className={`${styles.CarouselContent || ""} ${
              styles[`Show_${show}`] || ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              transition: !transitionEnabled ? "none" : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {length > show && isRepeating && renderExtraPrev()}
            {children}
            {length > show && isRepeating && renderExtraNext()}
          </div>
        </div>

        {(isRepeating || currentIndex < length - show) && (
          <button onClick={next} className={styles.RightArrow}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;

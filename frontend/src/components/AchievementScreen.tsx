import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const AchievementScreen = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} />
    </>
  );
};

export default AchievementScreen;

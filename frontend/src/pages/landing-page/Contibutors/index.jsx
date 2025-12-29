import { CONTRIBUTERS } from "@/constants/contributors";
import Contributor from "./Contributor";

const Contributors = () => {
  return (
    <>
      {CONTRIBUTERS.map((contritor, i) => (
        <Contributor
          key={`contritor-${i + 1}`}
          className={i % 2 ? "dark" : ""}
          logo={contritor.logo}
          description={contritor.description}
        />
      ))}
    </>
  );
};

export default Contributors;

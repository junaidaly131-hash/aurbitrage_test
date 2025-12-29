import {
  ChatBox,
  Description,
  FlexBox,
  Media,
  Navigation,
  Overlay,
  Profile,
  Tag,
  Title,
  Wrapper,
} from "./styles";

const LoadingState = () => {
  return (
    <Wrapper>
      <FlexBox>
        <Profile />
        <div>
          <Title />
          <Tag />
        </div>
      </FlexBox>
      <Media />
      <Description />
      <Navigation />
      <ChatBox />

      <Overlay />
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Wrapper>
  );
};

export default LoadingState;

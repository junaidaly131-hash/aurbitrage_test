const GoBackIcon = ({ color = "white", size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.8001 22.6673L9.4668 9.33398M9.4668 9.33398V21.334M9.4668 9.33398H21.4668"
        stroke={color}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GoBackIcon;

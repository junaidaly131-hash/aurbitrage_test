// components/RenderIf.jsx
export default function RenderIf({ isTrue, children }) {
  return isTrue ? children : null;
}

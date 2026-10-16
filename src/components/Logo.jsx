import logoMark from "../assets/logo-full.png";

export default function Logo({ light = false }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`}>
      <img
        className="logo__mark"
        src={logoMark}
        alt=""
        width="58"
        height="45"
      />

      <span className="logo__divider" aria-hidden="true" />

      <span className="logo__text">
        <span>Sanusi Jafar</span>
        <span>Foundation</span>
      </span>
    </span>
  );
}

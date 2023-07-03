import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      style={buttonCSS(isHovering)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => navigate(-1)}
    >
      ⇦ BACK
    </div>
  );
};

export default BackButton;

const buttonCSS = (isHovering) => ({
  color: isHovering ? "#e5e5e5" : "inherit",
  cursor: "pointer",
  margin: "40px 0 20px 40px",
  alignSelf: "start",
  fontWeight: 600,
});

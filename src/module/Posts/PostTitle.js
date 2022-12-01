import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyle = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  cursor: pointer;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
      @media screen and (max-width: 1023.98px) {
        font-size: 16px;
      }
    `};
`;

const PostTitle = ({ children, className = "", size = "normal", to = "" }) => {
  const navigate = useNavigate();
  return (
    <PostTitleStyle
      size={size}
      className={className}
      onClick={() => navigate(`/${to}`)}
    >
      {children}
    </PostTitleStyle>
  );
};

export default PostTitle;

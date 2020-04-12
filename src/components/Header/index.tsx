import React, { useState } from "react";
import { css } from "@emotion/core";
import { Theme } from "@theme/styled";
import { rem } from "polished";
import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import { ReactComponent as Hamburger } from "~/assets/images/icon-hamburger.svg";
import { Button } from "../Button";
import { spacer } from "../../utils/styles";
import { ReactComponent as CloseIcon } from "~/assets/images/icon-close.svg";

// #region styles
const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoStyles = css`
  display: block;
  width: 128px;
  height: 32px;
`;

const getNavStyles = (theme: Theme) => (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -99;
  background-color: rgba(0, 0, 0, 0.5);

  ${isOpen &&
    css`
      z-index: 99;
    `}

  ul {
    position: absolute;
    margin: 0;
    right: 0;
    transform: translateX(255px);
    transition: transform 100ms ease-in;
    background-color: ${theme.color.secondary.light};
    height: 0;
    z-index: 100;
    list-style: none;
    font-size: ${rem("18px")};
    line-height: ${rem("28px")};
    color: ${theme.color.text.light};

    ${isOpen &&
      css`
        width: 255px;
        height: 100%;
        padding: ${rem("112px")} ${rem("48px")} 0;

        transform: translateX(0);
      `}

    > li {
      margin-bottom: ${spacer(3)};

      &:last-child {
        margin-top: ${rem("36px")};
      }
    }
  }

  .close-button {
    width: ${spacer(2)};
    height: ${spacer(2)};
    position: absolute;
    z-index: 101;
    right: ${spacer(3)};
    top: ${spacer(7)};
    cursor: pointer;
  }
`;

// #endregion

const CloseButton: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
  onClick,
  onKeyUp,
}) => (
  <span
    role="button"
    tabIndex={0}
    className="close-button"
    onClick={onClick}
    onKeyUp={onKeyUp}
  >
    <CloseIcon />
  </span>
);

const Navigation = () => {
  const [isOpen, setNavState] = useState(false);
  const openNav = () => setNavState(true);
  const closeNav = () => setNavState(false);

  return (
    <div>
      <Hamburger
        onClick={openNav}
        css={css`
          display: block;
          width: 20px;
          height: 17px;
          cursor: pointer;
        `}
      />
      <nav css={(theme: Theme) => getNavStyles(theme)(isOpen)}>
        <CloseButton
          onClick={closeNav}
          onKeyUp={(e) =>
            (e.charCode === 13 || e.charCode === 27) && closeNav()
          }
        />
        <ul>
          <li>home</li>
          <li>about</li>
          <li>
            <Button>contact us</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Header = () => {
  return (
    <header css={headerStyles}>
      <Logo css={logoStyles} />

      <Navigation />
    </header>
  );
};

export default Header;

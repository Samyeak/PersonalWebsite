import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 250px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 500%;
      height: 500%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const animate = () => {
    anime({
      // autoplay: true,
      easing: 'easeInOutQuart',
      targets: '#circle',
      rotate: [
        { value: 360, duration: 1000 }
      ],
      // delay: anime.stagger(500, {grid: [6, 5], from: 'center'}),
    });

    anime({
      autoplay: true,
      easing: 'easeInOutCubic',
      targets: '#moons',
      rotate: [
        { value: -90, duration: 1000 },
        { value: 0, duration: 1500, easing: 'easeOutElastic' },
      ],
      // delay: anime.stagger(500, {grid: [6, 5], from: 'center'}),
    });

    anime({
      targets: '#EnglishWord',
      easing: 'easeInSine',
      scale: [
        { value: 0, duration: 1000 }
      ],
    });
    anime({
      targets: '#NewariWord',
      complete: () => finishLoading(),
      easing: 'easeOutBack',
      delay: 1000,
      scale: [
        { value: 0, duration: 0 },
        { value: 1, duration: 1500, fill: '#FF4B4B' }
      ],
      // delay: anime.stagger(400, {grid: [5, 5], from: 'center'}),
    });
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;

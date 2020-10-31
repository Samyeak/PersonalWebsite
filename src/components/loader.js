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
    max-width: 150px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 300%;
      height: 300%;
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
      targets: ['.svg-attributes-demo polygon', 'feTurbulence', 'feDisplacementMap'],
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      scale: 1,
      baseFrequency: 0,
      loop: true,
      duration: 1000,
      direction: 'alternate',
      easing: 'easeInOutExpo'
    });

    anime({
      loop: false,
      complete: () => finishLoading(),
      targets: '#NewariWord',
      easing: 'easeInOutExpo',
      // delay: 1000,
      scale: [
        { value: 0, duration: 0 },
        { value: 1, duration: 1000 },
        { value: 0, duration: 1000 },
      ],
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

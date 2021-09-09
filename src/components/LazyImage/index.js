import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function LazyImage({ src, alt }) {
  const observerRef = useRef();
  const imageRef = useRef();
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setIntersected(true);
        observerRef.current.disconnect();
      }
    });

    if (imageRef.current) {
      observerRef.current.observe(imageRef.current);
    }
    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  return <img ref={imageRef} src={intersected ? src : ''} alt={alt} />;
}

LazyImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default LazyImage;

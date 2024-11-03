import React, { useRef, useState, useEffect } from 'react';

const GrabScrollComponent = () => {
  const scrollGrabScrollRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingGrabScroll, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDownGrabScroll = (e: React.MouseEvent) => {
    if (!scrollGrabScrollRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollGrabScrollRef.current.offsetLeft);
    setStartY(e.pageY - scrollGrabScrollRef.current.offsetTop);
    setScrollLeft(scrollGrabScrollRef.current.scrollLeft);
    setScrollTop(scrollGrabScrollRef.current.scrollTop);

    scrollGrabScrollRef.current.classList.add('grabbing');
  };

  const handleMouseUpGrabScroll = () => {
    setIsDragging(false);
    scrollGrabScrollRef.current?.classList.remove('grabbing');
  };

  const handleMouseMoveGrabScroll = (e: React.MouseEvent) => {
    if (!isDraggingGrabScroll || !scrollGrabScrollRef.current) return;

    const x = e.pageX - scrollGrabScrollRef.current.offsetLeft;
    const y = e.pageY - scrollGrabScrollRef.current.offsetTop;
    const walkX = (x - startX) * 1.5; // Ajustez le multiplicateur pour la vitesse de défilement horizontale
    const walkY = (y - startY) * 1.5; // Ajustez le multiplicateur pour la vitesse de défilement verticale

    scrollGrabScrollRef.current.scrollLeft = scrollLeft - walkX;
    scrollGrabScrollRef.current.scrollTop = scrollTop - walkY;
  };



  return {
    scrollGrabScrollRef,
    handleMouseDownGrabScroll,
    handleMouseUpGrabScroll,
    handleMouseMoveGrabScroll,
    isDraggingGrabScroll
  }
};

export default GrabScrollComponent;
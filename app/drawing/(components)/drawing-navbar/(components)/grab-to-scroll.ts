import React, { useRef, useState, useEffect } from 'react';

const GrabScrollComponent = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartY(e.pageY - scrollRef.current.offsetTop);
    setScrollLeft(scrollRef.current.scrollLeft);
    setScrollTop(scrollRef.current.scrollTop);

    scrollRef.current.classList.add('grabbing');
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current?.classList.remove('grabbing');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    const x = e.pageX - scrollRef.current.offsetLeft;
    const y = e.pageY - scrollRef.current.offsetTop;
    const walkX = (x - startX) * 1.5; // Ajustez le multiplicateur pour la vitesse de défilement horizontale
    const walkY = (y - startY) * 1.5; // Ajustez le multiplicateur pour la vitesse de défilement verticale

    scrollRef.current.scrollLeft = scrollLeft - walkX;
    scrollRef.current.scrollTop = scrollTop - walkY;
  };



  return {
    scrollRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    isDragging
  }
};

export default GrabScrollComponent;
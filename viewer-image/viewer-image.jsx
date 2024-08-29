
import './lookImage.css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function ViewerImage() {

    const containerRef = useRef(null);
    const imageRef = useRef() || undefined;

    const [zoomLevel, setZoomLevel] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [landscape, setLandscape] = useState(false)
    const [systemDetectMobile, setSystemDetectMobile] = useState();


    const minZoomT = 0.6;
    const maxZoomT = 3.6;
    const minZoom = 1;
    const maxZoom = 3;

    const handleMouseWheel = (e) => {

        const newZoomLevel = e.deltaY < 0 ? zoomLevel + 0.1 : zoomLevel - 0.1;

        if (newZoomLevel >= minZoomT && newZoomLevel <= maxZoomT) {

            setZoomLevel(newZoomLevel);

            if (newZoomLevel <= minZoom) {
                setPosition({ x: 0, y: 0 });
            } else {
                if (newZoomLevel < zoomLevel) {
                    setPosition({ x: position.x / 1.3, y: position.y / 1.3 });
                }
            }

        }

        if (maxZoom < newZoomLevel) {
            setTimeout(() => {
                setZoomLevel(maxZoom);
            }, 200);
        }

        if (minZoom > newZoomLevel) {
            setTimeout(() => {
                setZoomLevel(minZoom);
            }, 200);

        }


    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        //setIsAnimated(false)
        setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchStart = (e) => {
        //e.preventDefault();
        const touch = e.touches[0];
        //setTimeout(() => {
        setIsDragging(true);
        //}, 200);
        //setIsAnimated(true)
        if (e.touches.length === 2) {
            if (zoomLevel !== 3) {
                setZoomLevel(1)
                setPosition({ x: 0, y: 0 })
            }
            else if (zoomLevel !== 1) {
                setZoomLevel(1.5)
            }
            else if (zoomLevel !== 1.5) {
                setZoomLevel(2)
            }
            else if (zoomLevel !== 2) {
                setZoomLevel(3)
            }
        }
        setStartPosition({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchZoom = () => {
        if (zoomLevel === 3) {
            setZoomLevel(1)
            setPosition({ x: 0, y: 0 })
        }
        else if (zoomLevel === 1) {
            setZoomLevel(1.5)
        }
        else if (zoomLevel === 1.5) {
            setZoomLevel(2)
        }
        else if (zoomLevel === 2) {
            setZoomLevel(3)
        }
    };



    const handleMouseMove = (e) => {

        if (zoomLevel === 1 || !isDragging || minZoom > zoomLevel) return

        const imageRect = imageRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const deltaX = imageRect.width - containerRect.width;
        const deltaY = imageRect.height - containerRect.height;


        const dx = e.clientX - startPosition.x;
        const dy = e.clientY - startPosition.y;
        // Calculer les nouvelles valeurs x et y en prenant en compte les limites du cadre
        const newPosX = Math.min(Math.max(position.x + dx, -deltaX / 2), deltaX / 2);
        const newPosY = Math.min(Math.max(position.y + dy, -deltaY / 2), deltaY / 2);

        setStartPosition({ x: e.clientX, y: e.clientY });

        if (imageRect.height <= containerRect.height && imageRect.width <= containerRect.width) {
            if (imageRect.width <= containerRect.width && imageRect.height <= containerRect.height) {
                return setPosition({ x: 0, y: 0 });
            }
            if (imageRect.width < containerRect.width) {
                return setPosition({ x: 0, y: newPosY });
            }
            if (imageRect.height < containerRect.height) {
                return setPosition({ x: newPosX, y: 0 });
            }
        }



        if (imageRect.height > containerRect.height) {
            if (imageRect.width < containerRect.width) {
                return setPosition({ x: 0, y: newPosY });
            }
        }

        if (imageRect.width > containerRect.width) {
            if (imageRect.height < containerRect.height) {
                return setPosition({ x: newPosX, y: 0 });
            }
        }


        //console.log(6);
        setPosition({ x: newPosX, y: newPosY });

        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutContainer = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsDragging(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mouseup", handleClickOutContainer);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutContainer);
        };
    };

    const handleTouchMove = (e) => {
        //if (zoomLevel === 1 || !isDragging || minZoom > zoomLevel) return

        //e.preventDefault();

        if (e.touches.length !== 2 && minZoom < zoomLevel) {
            //setIsAnimated(false)
            //setIsDragging(true)
            const touch = e.touches[0];

            const imageRect = imageRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const deltaX = imageRect.width - containerRect.width;
            const deltaY = imageRect.height - containerRect.height;


            const dx = touch.clientX - startPosition.x;
            const dy = touch.clientY - startPosition.y;

            // Calculer les nouvelles valeurs x et y en prenant en compte les limites du cadre
            const newPosX = Math.min(Math.max(position.x + dx, -deltaX / 2), deltaX / 2);
            const newPosY = Math.min(Math.max(position.y + dy, -deltaY / 2), deltaY / 2);

            setStartPosition({ x: touch.clientX, y: touch.clientY });

            if (imageRect.height <= containerRect.height && imageRect.width <= containerRect.width) {
                if (imageRect.width <= containerRect.width && imageRect.height <= containerRect.height) {
                    return setPosition({ x: 0, y: 0 });
                }
                if (imageRect.width < containerRect.width) {
                    return setPosition({ x: 0, y: newPosY });
                }
                if (imageRect.height < containerRect.height) {
                    return setPosition({ x: newPosX, y: 0 });
                }
            }


            if (imageRect.height > containerRect.height) {
                if (imageRect.width < containerRect.width) {
                    return setPosition({ x: 0, y: newPosY });
                }
            }

            if (imageRect.width > containerRect.width) {
                if (imageRect.height < containerRect.height) {
                    return setPosition({ x: newPosX, y: 0 });
                }
            }

            setPosition({ x: newPosX, y: newPosY });

        } else {
            const endY = e.changedTouches[0].clientY; // Récupère la position Y du toucher final
            const deltaY = endY - startPosition.y; // Calcule la différence de position Y

            // Vérifie si le mouvement est un swipe vers le haut et si la distance parcourue est suffisante
            if (deltaY < -150) {
                // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
                props.setFullScreenImg()
                setPosition({ x: 0, y: 0 });
                setZoomLevel(1);
                setIsDragging(false)
            } else {
                // Ajoutez ici le code à exécuter lorsque le swipe vers le haut est détecté
                props.setFullScreenImg()
                setPosition({ x: 0, y: 0 });
                setZoomLevel(1);
                setIsDragging(false)
            }
        }

    }
    
    const handletouchEnd = () => {
        //setZoomLevel(1)
        setIsDragging(false);
        //setIsAnimated(true)
    };

    const handleMouseUp = () => {
        //setIsAnimated(true)
        setIsDragging(false);
    };


    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.setFullScreenImg()
                    setPosition({ x: 0, y: 0 });
                    setZoomLevel(1);
                    setIsDragging(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(containerRef);


    const handleDoubleClick = (e) => {
        if (zoomLevel > 1) {
            setZoomLevel(1)
            return setPosition({ x: 0, y: 0 })
        }

        //// Clic sur l'élément lui-même
        props.setFullScreenImg()
        setPosition({ x: 0, y: 0 });
        setZoomLevel(1);
        setIsDragging(false)


    }

    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')

    //console.log({ width: width, height: height });

    const imageSize = () => {
        if (zoomLevel === 1) {
            if (imageRef.current && containerRef.current) {
                setPosition({ x: 0, y: 0 });
                setZoomLevel(1);
                setIsDragging(false)
                const imageRect = imageRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();


                if (systemDetectMobile) {
                    if (landscape) {
                        setHeight('max-content')
                        return setWidth('max-content')
                    } else {
                        if (imageRect.width < containerRect.width) {
                            if (imageRect.height < containerRect.height) {
                                setHeight('max-content')
                                return setWidth('max-content')
                            }
                            setHeight('100%')
                            return setWidth('max-content')
                        }
                        setHeight('max-content')
                        return setWidth('100%')
                    }
                }

                if (imageRect.width - imageRect.height < 100) {
                    setWidth('max-content')
                    return setHeight('max-content')
                }
                if (imageRect.width > imageRect.height) {
                    setHeight('max-content')
                    return setWidth('100vh')
                }
                if (imageRect.width == imageRect.height) {
                    setHeight('100%')
                    setWidth('max-content')
                }
            }
        }
    };


    useEffect(() => {
        imageSize();
    }, []);

    useEffect(() => {
        const isMobileDevice = () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };

        // Utilisation de la fonction
        if (isMobileDevice()) {
            setSystemDetectMobile(true)
        } else {
            setSystemDetectMobile(false)
        }
    }, [])

    useEffect(() => {
        if (!systemDetectMobile) {
            return;
        }
        // Define a media query for landscape orientation
        const landscapeQuery = window.matchMedia("(orientation: landscape)");
        // Function to handle changes in orientation
        const handleOrientationChange = (event) => {

            if (event.matches) {
                // Device is in landscape mode
                setLandscape(true)
                imageSize()
                // Perform actions specific to landscape mode
            } else {
                // Device is not in landscape mode
                setLandscape(false)
                imageSize()
                // Perform actions specific to portrait mode
            }
        };
        // Attach listener for changes in orientation
        landscapeQuery.addListener(handleOrientationChange);
        // Initial check for device orientation
        handleOrientationChange(landscapeQuery);
    }, [systemDetectMobile])



    return (
        <>
            <div className='backgroundImg'
                ref={containerRef}
                onWheel={handleMouseWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseUp}
                onDoubleClick={!systemDetectMobile ? handleDoubleClick : handleTouchZoom}
                onContextMenu={systemDetectMobile ? handleDoubleClick : null}


                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handletouchEnd}
                style={{
                    cursor: minZoom < zoomLevel ? 'all-scroll' : 'default',
                    maxWidth: '100%',
                    maxHeight: '100%'
                }}
            >
                <img loading="lazy"
                    onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                    ref={imageRef}
                    src={""}
                    alt="Image"
                    style={{
                        display: 'block',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                        transition: !isDragging ? 'transform 250ms ease-in-out' : '',
                        objectFit: 'contain',
                        height: height,
                        width: width,
                        maxWidth: '100vh',
                        maxHeight: '100vh',
                        overflow: 'clip'
                    }}
                />
            </div>
        </>
    )
}
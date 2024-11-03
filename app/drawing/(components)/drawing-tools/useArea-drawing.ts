import { useAppContext } from "@/app/provider/useAppContext";
import { ColorsDrawing, DrawAreaDefault } from "@/public/assets/data/defaultValue-drawing";
import { Blanket, DrawArea, DrawDrawing, DrawNowInterface, NewImageSize } from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { useRef, useState } from "react";


export default function UseAreaDrawCreative() {


  const UseAppContext = useAppContext()
  const isBlanket = UseAppContext.isBlanket;
  const setBlanket = UseAppContext.setBlanket;

  const [zoom, setZoom] = useState<number[]>([1.5]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isResizing, setIsResizing] = useState<ResizeDirection>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasDrawRef = useRef<HTMLCanvasElement | null>(null);
  const textCanvasContainerRef = useRef<HTMLDivElement | null>(null);
  const overlayAreaRef = useRef<HTMLDivElement | null>(null);
  const [isImageSize, setImageSize] = useState<NewImageSize>({
    w: 0,
    h: 0,
  });
  const initState = useRef({
    initCenterX: 0,
    initCenterY: 0,
    initX: 0,
    initY: 0,
    mousePressX: 0,
    mousePressY: 0,
    initW: 0,
    initH: 0,
    initRotate: 0,
  });
  // Text
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const startAngleRef = useRef(0); // Angle initial

  const [drawDrawing, setDrawDrawing] = useState<DrawDrawing>({
    id: 0,
    color: ColorsDrawing[0].value,
    thickness: 10,
  });

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const [drawArea, setDrawArea] = useState<DrawArea>(DrawAreaDefault);

  const size =
    isImageSize.w < isImageSize.h
      ? isImageSize.w
      : isImageSize.h;


  // Fonction utilitaire pour calculer l'angle entre deux points (centre de l'élément et position de la souris)
  const getAngle = (cx: number, cy: number, mx: number, my: number) => {
    const dx = mx - cx;
    const dy = my - cy;
    return Math.atan2(dy, dx) * (180 / Math.PI); // Convertit les radians en degrés
  };

  const handleRotate = (angle: number) => {
    if (angle >= 360) {
      return angle -= 360
    } else if (angle < 0) {
      return angle += 360
    }
    return angle
  }


  const handleSettDrawArea = (el: DrawArea) => {

    setDrawArea((prevState) => ({
      ...prevState,
      width: el.width,
      height: el.height,
      leftOffset: el.leftOffset,
      topOffset: el.topOffset,
      positionX: el.positionX,
      positionY: el.positionY
    }))
  }


  const handleMouseDownResizing = (
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    e.preventDefault();
    if (!imageRef.current) return;
    // Supposons que vous ayez un élément DOM `element`
    const rect = imageRef.current.getBoundingClientRect();
    setIsResizing(direction);
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });




    if (direction === "rotate-blanket") {
      const cx = (isImageSize.w / 2 - size / 4) + (size / 4); // Ajuster le centre X avec le zoom
      const cy = (isImageSize.h / 2 - size / 4) + (size / 4); // Ajuster le centre Y avec le zoom
      // Calculer l'angle initial entre la souris et le centre de l'élément
      const startAngle = getAngle(cx, cy, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0]);
      startAngleRef.current = startAngle - isBlanket.rotate;
    } else {
      const cx = drawArea.positionX + drawArea.width / 2; // Ajuster le centre X avec le zoom
      const cy = drawArea.positionY + drawArea.height / 2; // Ajuster le centre Y avec le zoom
      // Calculer l'angle initial entre la souris et le centre de l'élément
      const startAngle = getAngle(cx, cy, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0]);
      startAngleRef.current = startAngle - drawArea.rotate;
    }

    // Enregistrer les informations initiales
    initState.current.initCenterX = drawArea.positionX + drawArea.width / 2;
    initState.current.initCenterY = drawArea.positionY + drawArea.height / 2;
    initState.current.initX = drawArea.positionX;
    initState.current.initY = drawArea.positionY;
    initState.current.mousePressX = e.clientX;
    initState.current.mousePressY = e.clientY;
    initState.current.initW = drawArea.width;
    initState.current.initH = drawArea.height;
    initState.current.initRotate = drawArea.rotate;

  };

  const handleMouseUpResizing = () => {
    setIsResizing(null);
  };


  function rotate(x: number, y: number, cx: number, cy: number, angle: number) {
    return [
      (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
      (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy,
    ];
  }

  // Fonction pour ajuster les dimensions du rectangle
  function adjustRectangle(rectangle: any, cursorX: number, cursorY: number, refPointX: number, refPointY: number) {

    // Convertir les angles de degrés en radians
    const radians = rectangle.rotate * (Math.PI / 180);

    // For a rectangle with top-left at x, y
    const cx = rectangle.positionX + rectangle.width / 2;
    const cy = rectangle.positionY + rectangle.height / 2;

    const rotatedA = rotate((rectangle.positionX + refPointX), (rectangle.positionY + refPointY), cx, cy, radians);

    const pointC = [cursorX, cursorY]

    const rotatedC = rotate(pointC[0], pointC[1], cx, cy, 0);

    const newCenter = [
      (rotatedA[0] + rotatedC[0]) / 2,
      (rotatedA[1] + rotatedC[1]) / 2,
    ];



    // calculer les nouvelles coordonnées en haut à gauche du rectangle
    const newA = rotate(rotatedA[0], rotatedA[1], newCenter[0], newCenter[1], -radians);
    // calculer les nouvelles coordonnées en bas à droite du rectangle
    const newC = rotate(rotatedC[0], rotatedC[1], newCenter[0], newCenter[1], -radians);


    return {
      finalWidth: newC[0] - newA[0],
      finalHeight: newC[1] - newA[1],
      finalPositionX: Math.min(newA[0], newC[0]),
      finalPositionY: Math.min(newA[1], newC[1]),
    }
  }


  function adjustRectangleBR(cursorX: number, cursorY: number) {

    const { initX, initY, mousePressX, mousePressY, initW, initH, initCenterX, initCenterY } = initState.current;

    // Convertir la rotation en radians
    const initRadians = drawArea.rotate * Math.PI / 180;
    const cosFraction = Math.cos(initRadians);
    const sinFraction = Math.sin(initRadians);


    // Différence de position de la souris
    const wDiff = (cursorX - mousePressX) / zoom[0];
    const hDiff = (cursorY - mousePressY) / zoom[0];

    // Appliquer la rotation aux différences
    const rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
    const rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

    // Calculer la nouvelle largeur et hauteur
    let newL = initW - rotatedWDiff;
    let newT = initH - rotatedHDiff;

    let newW = initW + rotatedWDiff;
    let newH = initH + rotatedHDiff;

    const centerXL = initCenterX - newL / 2;
    const centerYL = initCenterY - newT / 2;

    const centerX = initCenterX - newW / 2;
    const centerY = initCenterY - newH / 2;

    // Calculer la nouvelle position en fonction de la rotation et de la différence
    const newYT = centerYL + 0.5 * rotatedHDiff * cosFraction;
    const newXT = initX - 0.5 * rotatedHDiff * sinFraction;

    // Calculer la nouvelle position en fonction de la rotation et de la différence
    const newXL = centerXL + 0.5 * rotatedWDiff * cosFraction;
    const newYL = initY + 0.5 * rotatedWDiff * sinFraction;

    // Calculer la nouvelle position en fonction de la rotation et de la différence
    const newX = centerX + 0.5 * rotatedWDiff * cosFraction;
    const newY_ = initY + 0.5 * rotatedWDiff * sinFraction;

    // Calculer la nouvelle position en fonction de la rotation et de la différence
    const newX_ = initX - 0.5 * rotatedHDiff * sinFraction;
    const newY = centerY + 0.5 * rotatedHDiff * cosFraction;

    return {
      newL,
      newT,

      newW,
      newH,

      newYT,
      newYL,

      newXT,
      newXL,

      newX,
      newY,

      newX_,
      newY_
    };
  }

  const handleMouseMoveResizing = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isResizing) return;
    if (!imageRef.current) return


    // Supposons que vous ayez un élément DOM `element`
    const rect = imageRef.current.getBoundingClientRect();

    const minSize = 30;

    // Calculer les différences de position en pixels
    const dx = e.clientX - startPosition.x;
    const dy = e.clientY - startPosition.y;

    // Ajuster pour le zoom, si nécessaire
    const deltaX = dx / zoom[0];
    const deltaY = dy / zoom[0];


    switch (isResizing) {
      case "right-bottom": {
        const newSize = adjustRectangle(drawArea, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0], 0, 0)
        if (newSize.finalWidth > minSize && newSize.finalHeight > minSize) {
          setDrawArea({
            ...drawArea,
            width: newSize.finalWidth,
            height: newSize.finalHeight,
            positionX: newSize.finalPositionX,
            positionY: newSize.finalPositionY
          });
        }
        break;
      }
      case "left-bottom": {
        const newSize = adjustRectangle(drawArea, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0], drawArea.width, 0)
        if (newSize.finalWidth < -minSize && newSize.finalHeight > minSize) {
          setDrawArea({
            ...drawArea,
            width: Math.abs(newSize.finalWidth),
            height: Math.abs(newSize.finalHeight),
            positionX: newSize.finalPositionX,
            positionY: newSize.finalPositionY
          });
        }
        break;
      }
      case "left-top": {
        const newSize = adjustRectangle(drawArea, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0], drawArea.width, drawArea.height);
        if (newSize.finalWidth < -minSize && newSize.finalHeight < -minSize) {
          setDrawArea({
            ...drawArea,
            width: Math.abs(newSize.finalWidth),
            height: Math.abs(newSize.finalHeight),
            positionX: newSize.finalPositionX,
            positionY: newSize.finalPositionY
          });
        }
        break;
      }
      case "right-top": {
        const newSize = adjustRectangle(drawArea, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0], 0, drawArea.height);
        if (newSize.finalWidth > minSize && newSize.finalHeight < -minSize) {
          setDrawArea({
            ...drawArea,
            width: Math.abs(newSize.finalWidth),
            height: Math.abs(newSize.finalHeight),
            positionX: newSize.finalPositionX,
            positionY: newSize.finalPositionY
          });
        }
        break;
      }
      case "right": {
        const newSize = adjustRectangleBR(e.clientX, e.clientY)
        if (newSize.newW > minSize) {
          setDrawArea({
            ...drawArea,
            width: newSize.newW,
            positionX: newSize.newX,
            positionY: newSize.newY_,
          });
        }
        break;
      }
      case "bottom": {
        const newSize = adjustRectangleBR(e.clientX, e.clientY)
        if (newSize.newH > minSize) {
          setDrawArea({
            ...drawArea,
            height: newSize.newH,
            positionX: newSize.newX_,
            positionY: newSize.newY,
          });
        }
        break;
      }
      case "left": {
        const newSize = adjustRectangleBR(e.clientX, e.clientY)
        if (newSize.newL > minSize) {
          setDrawArea({
            ...drawArea,
            width: newSize.newL,
            positionX: newSize.newXL,
            positionY: newSize.newY_,
          });
        }
        break;
      }
      case "top": {
        const newSize = adjustRectangleBR(e.clientX, e.clientY)
        if (newSize.newT > minSize) {
          setDrawArea({
            ...drawArea,
            height: newSize.newT,
            positionX: newSize.newXT,
            positionY: newSize.newYT,
          });
        }
        break;
      }
      case "top-move": {
        setDrawArea({
          ...drawArea,
          positionX: drawArea.positionX + deltaX,
          positionY: drawArea.positionY + deltaY,
        });
        break;
      }
      case "rotate": {

        const cx = drawArea.positionX + drawArea.width / 2; // Ajuster le centre X avec le zoom
        const cy = drawArea.positionY + drawArea.height / 2; // Ajuster le centre Y avec le zoom

        // Calculer l'angle courant en fonction de la souris
        const currentAngle = getAngle(cx, cy, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0]);

        const t = handleRotate(Math.round(currentAngle - startAngleRef.current))

        setDrawArea({
          ...drawArea,
          rotate: t
        });
        break;
      }
      case "rotate-blanket": {

        const cx = (isImageSize.w / 2 - size / 4) + (size / 4); // Ajuster le centre X avec le zoom
        const cy = (isImageSize.h / 2 - size / 4) + (size / 4); // Ajuster le centre Y avec le zoom

        // Calculer l'angle courant en fonction de la souris
        const currentAngle = getAngle(cx, cy, (e.clientX - rect.left) / zoom[0], (e.clientY - rect.top) / zoom[0]);

        const t = handleRotate(Math.round(currentAngle - startAngleRef.current))

        setBlanket((prevState: Blanket) => ({
          ...prevState,
          rotate: t
        }));
        break;
      }
      default:
        break;
    }

    // Mettre à jour la position de départ après le redimensionnement
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  // ______________________DRAWING___________________________

  const [isDrawingNowCanvas, setIsDrawingNowCanvas] = useState<DrawNowInterface>({ type: "pen", id: null, active: false, isMouseDown: false, direction: 'horizontal' });

  const [isStartPositionDraw, setIsStartPositionDraw] = useState<{ x: number, y: number }>({ x: 0, y: 0 });


  const startDrawingNowCanvas = (
    e: React.MouseEvent,
  ) => {
    const canvas = canvasDrawRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    if (!imageRef.current) return

    const rect = canvas?.getBoundingClientRect(); // Vérifiez si le canvas existe


    // Convertir les coordonnées client en coordonnées relatives au canvas
    const mouseX = (e.clientX - rect.left) / zoom[0];
    const mouseY = (e.clientY - rect.top) / zoom[0];
    // Faites quelque chose avec mouseX et mouseY, comme dessiner

    setIsStartPositionDraw({ x: mouseX, y: mouseY })
    setIsDrawingNowCanvas((prevState: any) => ({
      ...prevState,
      active: true,
      isMouseDown: true
    }));

    if (isDrawingNowCanvas.type === "eraser") {
      context.globalCompositeOperation = "destination-out"; // Mode effacement
    }
    context.beginPath();
    context.moveTo(mouseX, mouseY)
  };


  const drawNowCanvas = (e: React.MouseEvent, expandValue: number) => {
    if (!isDrawingNowCanvas.active) return;
    const canvas = canvasDrawRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;

    if (!imageRef.current) return

    // Supposons que vous ayez un élément DOM `element`
    const rect = imageRef.current.getBoundingClientRect();

    const expand = expandValue / 2;

    // Convertir les coordonnées client en coordonnées relatives au canvas
    const mouseX = ((e.clientX - rect.left) / zoom[0]) + expand;
    const mouseY = ((e.clientY - rect.top) / zoom[0]) + expand;

    switch (isDrawingNowCanvas.type) {
      case "pen": {
        context.lineWidth = drawDrawing.thickness; // Taille du trait
        context.strokeStyle = drawDrawing.color; // Couleur du trait
        context.lineCap = 'round'; // Lisse les extrémités de la ligne (round, square ou butt)
        context.lineJoin = 'round'; // Lisse les coins lors de l'intersection de deux lignes

        context.lineTo(mouseX, mouseY);
        context.stroke(); // Dessine la ligne avec les propriétés définies
        break;
      }
      case "brush": {
        context.lineWidth = drawDrawing.thickness;
        context.strokeStyle = drawDrawing.color; // Couleur du trait
        context.lineCap = 'round'; // Lisse les extrémités de la ligne (round, square ou butt)
        context.lineJoin = 'round';
        context.globalAlpha = 0.1;

        context.lineTo(mouseX, mouseY); // Suivre le curseur
        context.stroke();
        break;
      }
      case "highlight": {
        context.lineWidth = drawDrawing.thickness; // Taille du trait
        context.strokeStyle = drawDrawing.color; // Couleur du trait
        context.lineCap = 'round'; // Lisse les extrémités de la ligne (round, square ou butt)
        context.lineJoin = 'round'; // Lisse les coins lors de l'intersection de deux lignes
        //context.globalAlpha = 0.1;

        switch (isDrawingNowCanvas.direction) {
          case "horizontal": {
            if (mouseY < isStartPositionDraw.y - (drawDrawing.thickness / 2) || mouseY > isStartPositionDraw.y + (drawDrawing.thickness / 2)) {
              setIsStartPositionDraw({ x: isStartPositionDraw.x, y: mouseY })
            }

            context.lineTo(mouseX, isStartPositionDraw.y); // Suivre le curseur
            context.stroke();
            break;
          }
          default:
            break;
          case "vertical": {
            if (mouseX < isStartPositionDraw.x - (drawDrawing.thickness / 2) || mouseX > isStartPositionDraw.x + (drawDrawing.thickness / 2)) {
              setIsStartPositionDraw({ x: mouseX, y: isStartPositionDraw.y })
            }

            context.lineTo(isStartPositionDraw.x, mouseY); // Suivre le curseur
            context.stroke();
            break;
          }
        }
        break;
      }
      case "eraser": {
        context.lineWidth = drawDrawing.thickness; // Taille de l'effaceur (correspond à l'épaisseur du trait)
        context.lineCap = 'round'; // Pour que l'effacement soit doux et lisse
        context.lineJoin = 'round';
        context.lineTo(mouseX, mouseY);
        context.stroke(); // Dessine la ligne avec les propriétés définies
        break;
      }
      default:
        break;
    }
  };


  const stopDrawingNowCanvas = () => {
    setIsDrawingNowCanvas((prevState: any) => ({
      ...prevState,
      active: false,
      isMouseDown: false
    }));

    const canvas = canvasDrawRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    if (isDrawingNowCanvas.type === "eraser") {
      context.globalCompositeOperation = "source-over"; // Retour au mode normal
    }
    if (isDrawingNowCanvas.type === "highlight" || isDrawingNowCanvas.type === "brush") {
      context.globalAlpha = 1;
    }
    context.closePath();
  };

  const BreakDrawingNowCanvas = () => {
    if (isDrawingNowCanvas.isMouseDown) {
      setIsDrawingNowCanvas((prevState: any) => ({
        ...prevState,
        active: false,
      }));

      // Fermer le tracé actuel pour éviter la connexion entre les tracés
      const canvas = canvasDrawRef.current;
      if (canvas) {
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (context) {
          context.closePath(); // Ferme le chemin en cours
        }
      }
    }
  };

  const RestartDrawingNowCanvas = (e: React.MouseEvent, expandValue: number) => {
    if (!isDrawingNowCanvas.isMouseDown) return;

    const canvas = canvasDrawRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;


    if (!imageRef.current) return

    // Supposons que vous ayez un élément DOM `element`
    const rect = imageRef.current.getBoundingClientRect();

    //const expand = UseAppContext.drawingExpandImg.expand / 2;
    const expand = expandValue / 2;

    // Convertir les coordonnées client en coordonnées relatives au canvas
    const mouseX = ((e.clientX - rect.left) / zoom[0]) + expand;
    const mouseY = ((e.clientY - rect.top) / zoom[0]) + expand;
    // Démarrer un nouveau chemin de dessin à la nouvelle position
    context.beginPath(); // Commence un nouveau chemin
    context.moveTo(mouseX, mouseY); // Déplace le curseur de dessin à la nouvelle position

    // Réactive le dessin dans l'état
    setIsDrawingNowCanvas((prevState: any) => ({
      ...prevState,
      active: true,
    }));
  };

  return {
    canvasRef,
    overlayAreaRef,
    canvasDrawRef,
    textCanvasContainerRef,
    handleMouseDownResizing,
    handleMouseUpResizing,
    handleMouseMoveResizing,
    imageRef,


    leftOffset,
    width,
    height,
    topOffset,
    zoom,
    setZoom,

    setWidth,
    setHeight,
    setLeftOffset,
    setTopOffset,

    setDrawArea,
    drawArea,
    handleSettDrawArea,
    startPosition,
    isResizing,
    isImageSize, setImageSize,


    startDrawingNowCanvas,
    drawNowCanvas,
    stopDrawingNowCanvas,
    isDrawingNowCanvas,
    setIsDrawingNowCanvas,
    BreakDrawingNowCanvas,
    drawDrawing, setDrawDrawing,
    RestartDrawingNowCanvas,

  };
}

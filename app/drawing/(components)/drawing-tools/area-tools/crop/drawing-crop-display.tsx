"use client";
import { Button } from "@/components/ui/button";
import {
  DrawArea,
  IsNewImage,
  NewImageSize,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { useEffect, useState } from "react";
import { FaCompress } from "react-icons/fa6";

interface DrawingCropDisplayProps {
  isNewImage: IsNewImage;
  isImageSize: NewImageSize;
  drawArea: DrawArea;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  handleStartCrop: (el: boolean) => void;
  isResizing: ResizeDirection;
  isFreeAreaCrop: boolean;
  croppedImageUrl: string | null;
  setCroppedImageUrl: React.Dispatch<React.SetStateAction<any>>;
  isRendering: boolean;
}

const DrawingCropDisplay: React.FC<DrawingCropDisplayProps> = (props) => {
  useEffect(() => {
    if (!props.isNewImage.img) {
      console.error("No image source provided.");
      return;
    }

    if (props.isResizing) {
      return;
    }

    if (typeof window === "undefined") {
      //console.log("Server-side rendering, skipping image load.");
      return;
    }

    function isSignificantImage(canvas: HTMLCanvasElement) {
      const context = canvas.getContext("2d");
      if (!context) return false;

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Parcourir tous les pixels
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];

        // Vérifier si le pixel n'est pas totalement transparent
        if (alpha !== 0) {
          // Vérifier si le pixel est différent de la transparence totale (0,0,0,0)
          // Ici, on vérifie si au moins un canal de couleur est non nul
          if (red !== 0 || green !== 0 || blue !== 0) {
            return true;
          }
        }
      }

      return false; // Tous les pixels sont soit totalement transparents, soit noirs avec alpha 0
    }

    // Vérifier si l'URL est en base64
    if (!props.isNewImage.img.startsWith("data:image")) {
      console.error("Image source is not in base64 format.");
      return;
    }

    try {
      const image = new window.Image();
      //image.src = imageUrl;

      image.onload = () => {
        //console.log("Image loaded successfully:", imageUrl);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          console.error("Failed to get canvas context.");
          return;
        }

        const { w: imageWidth, h: imageHeight } = props.isImageSize;
        const {
          width: cropWidth,
          height: cropHeight,
          positionX,
          positionY,
          leftOffset,
          topOffset,
        } = props.drawArea;

        const adjustedheight = Math.max(
          Math.min(
            imageHeight - (positionY + topOffset),
            imageHeight + cropHeight
          ),
          0
        );
        const adjustedwidth = Math.max(
          Math.min(
            imageWidth - (positionX + leftOffset),
            imageWidth + cropWidth
          ),
          0
        );

        const top = Math.max(
          Math.min(adjustedheight - imageHeight, cropHeight),
          0
        );
        const bottom = Math.max(cropHeight - adjustedheight, 0);

        const left = Math.max(
          Math.min(adjustedwidth - imageWidth, cropWidth),
          0
        );
        const right = Math.max(cropWidth - adjustedwidth, 0);

        // Définir les dimensions du canvas hors écran
        canvas.width = props.isFreeAreaCrop
          ? cropWidth - right - left
          : Math.min(cropWidth, imageWidth);
        canvas.height = props.isFreeAreaCrop
          ? cropHeight - top - bottom
          : Math.min(cropHeight, imageHeight);

        // Calculer les nouvelles coordonnées de recadrage en incluant les offsets
        const adjustedCropX = Math.max(
          Math.min(positionX + leftOffset, imageWidth - adjustedwidth),
          imageWidth - adjustedwidth
        );
        const adjustedCropY = Math.max(
          Math.min(positionY + topOffset, imageHeight - adjustedheight),
          imageHeight - adjustedheight
        );

        const adjustedBorderCropX = Math.max(
          Math.min(positionX + leftOffset, imageWidth - cropWidth),
          0
        );

        const adjustedBorderCropY = Math.max(
          Math.min(positionY + topOffset, imageHeight - cropHeight),
          0
        );

        //// Effacer le canvas avant de dessiner la nouvelle image recadrée
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, image.height + canvas.height);

        // Dessiner l'image recadrée sur le canvas hors écran
        context.drawImage(
          image,
          props.isFreeAreaCrop ? adjustedCropX : adjustedBorderCropX, // X de l'image source ajustée avec l'offset
          props.isFreeAreaCrop ? adjustedCropY : adjustedBorderCropY, // Y de l'image source ajustée avec l'offset
          cropWidth, // Largeur de la source
          cropHeight, // Hauteur de la source
          props.isFreeAreaCrop ? -left : 0, // X sur le canvas de destination
          props.isFreeAreaCrop ? -top : 0, // Y sur le canvas de destination
          cropWidth, // Largeur sur le canvas de destination
          cropHeight // Hauteur sur le canvas de destination
        );

        if (canvas.width <= 0 || canvas.height <= 0) {
          return props.setCroppedImageUrl(null);
        }

        const isValidImage = isSignificantImage(canvas);
        if (!isValidImage) {
          return props.setCroppedImageUrl(null);
        }

        // Convertir le canvas en Data URL
        const croppedImageUrl = canvas.toDataURL();
        props.setCroppedImageUrl(croppedImageUrl);
      };

      image.src = props.isNewImage.img;
    } catch (error) {
      console.error("Error processing the image:", error);
    }
  }, [
    props.isNewImage.img,
    props.drawArea.width,
    props.drawArea.height,
    props.drawArea.positionX,
    props.drawArea.positionY,
    props.drawArea.leftOffset,
    props.drawArea.topOffset,
    props.isImageSize.w,
    props.isImageSize.h,
    props.isResizing,
    props.isFreeAreaCrop,
    props.setCroppedImageUrl,
  ]);

  useEffect(() => {
    props.handleStartCrop(true);
  }, []);

  //if (!props.croppedImageUrl) return null;

  if (!props.isRendering) return null;

  if (!props.croppedImageUrl)
    return (
      <div
        className="h-[200px] border flex justify-center items-center flex-col gap-4"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <div className="text-red-300">No images to crop</div>
      </div>
    );

  return (
    <img
      className="object-contain w-full h-80"
      src={props.croppedImageUrl}
      alt="Cropped"
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default DrawingCropDisplay;

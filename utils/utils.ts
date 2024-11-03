// Définir la fonction canvasToBlob avec les types TypeScript
export function CanvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas to Blob conversion failed.'));
      }
    });
  });
}

// Fonction pour télécharger une image à partir d'une dataURL
export function downloadImage(dataURL: string, fileName: string, format: string) {

  if (format === 'jpg/jpeg') {
    // Créer une nouvelle image
    const image = new Image();
    image.src = dataURL;

    // Convertir l'image en JPEG via le canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return

    const imgElement = image;

    // Dessiner l'image dans le canvas pour la convertir en JPEG
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    context.drawImage(imgElement, 0, 0);

    // Convertir le canvas en JPEG
    const imageURL = canvas.toDataURL('image/jpeg');

    // Créer un lien de téléchargement pour l'image JPEG
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = fileName;
    link.click();

    return;
  }

  // Créer un lien <a> temporaire
  const link = document.createElement('a');

  // Définir l'URL du lien comme le dataURL de l'image
  link.href = dataURL;

  // Définir le nom du fichier téléchargé
  link.download = fileName;

  // Ajouter le lien au document
  document.body.appendChild(link);

  // Simuler un clic sur le lien pour déclencher le téléchargement
  link.click();

  // Retirer le lien du document après le téléchargement
  document.body.removeChild(link);
}


//  const handleDownload = async (e: string) => {
//    // Hide any UI elements related to the download process
//    //setIsVisible(false);
//
//
//    try {
//        // Download the image data from the URL
//        const response = await fetch(e);
//        const imageBlob = await response.blob();
//
//        // Create a URL for the blob
//        const imageUrl = window.URL.createObjectURL(imageBlob);
//
//        // Extract filename from the URL
//        const filename1 = e.split(`${REACT_APP_URL}`)[1];
//        const filename2 = filename1.split('/')[0];
//        const filename = e.split(`/${filename2}/`)[1];
//
//        // Create a link element for downloading the image
//        const link = document.createElement('a');
//        link.href = imageUrl; // Set the URL to the blob
//        link.download = filename; // Set the filename for the downloaded file
//        document.body.appendChild(link); // Append the link to the document body
//        link.click(); // Simulate a click on the link to initiate download
//        document.body.removeChild(link); // Remove the link from the document body after download
//        addErrorMessage(`L'image à bien été téléchagé.`, 5000, '#396afc')
//    } catch (error) {
//        // Handle any errors that occur during the download process
//        console.error('Error while downloading the image:', error);
//    }
//};

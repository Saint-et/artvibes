import { SystemName } from "@/public/assets/data/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { FaDrawPolygon } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useState } from "react";

interface DrawingDrawingIntroProps {
  handleButtonClickImport: () => void;
  CreateMainCanvas: () => void;
}

const DrawingIntro: React.FC<DrawingDrawingIntroProps> = (props) => {
  const [isSystemColor, setSystemColor] = useState("#000000");

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <>
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <div className="bg-black/70 h-[100%] w-[90%] max-w-[1000px]">
          <ScrollArea className="h-[100%] w-[100%] border-none">
            <Card className="p-4 w-[100%] h-[100%] bg-inherit border-none">
              <CardHeader>
                <CardTitle className="flex">
                  Drawing <FaDrawPolygon className="text-1xl ml-2" />
                </CardTitle>
                <CardDescription>Drawing by {SystemName} :</CardDescription>
              </CardHeader>
              <Separator className="my-4" />
              <CardContent className="grid grid-cols-1 gap-4 border-none">
                <h1 className="text-blue-500 font-bold">
                  Pour bien commencer :
                </h1>
                <Button className="gradient2" variant={"default"}>
                  Learn to use drawing
                </Button>
                <Separator className="my-4" />
                <h1 className="text-blue-500 font-bold">Commencer :</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      //onClick={props.CreateMainCanvas}
                      variant={"default"}
                    >
                      Create a blank page
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full flex flex-col items-center gap-4">
                      <div
                        style={{
                          background: isSystemColor,
                          width: 280,
                          height: 150,
                        }}
                      />
                      <Card className="bg-inherit border-none">
                        <CardContent className="flex p-1 gap-4">
                          <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                            width:{" "}
                            <Input
                              value={0}
                              className="w-[80px] h-[40px] border-none"
                              disabled
                              type="number"
                              placeholder="width"
                            />
                          </div>
                          <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                            height:{" "}
                            <Input
                              value={0}
                              className="w-[80px] h-[40px] border-none"
                              disabled
                              type="number"
                              placeholder="height"
                            />
                          </div>
                        </CardContent>
                      </Card>
                      <div className="flex flex-row items-start space-x-3 space-y-0 p-4 w-full">
                        <div>
                          <Checkbox
                            className="bg-[#0d0d0d]"
                            checked={false}
                            onCheckedChange={() => {}}
                          />
                        </div>
                        <div className="space-y-1 leading-none">
                          Transparent.
                        </div>
                      </div>
                      <Button
                        className="flex flex-col justify-center items-center"
                        variant={"outline"}
                        onClick={handleButtonClickColor}
                        style={{
                          background: isSystemColor,
                        }}
                      >
                        <input
                          ref={colorInputRef}
                          value={isSystemColor}
                          onChange={(e) => {
                            setSystemColor(e.target.value);
                          }}
                          className="appearance-none cursor-pointer"
                          style={{
                            background: "none",
                            opacity: 0,
                            zIndex: -1,
                          }}
                          type="color"
                          name=""
                          id=""
                        />
                      </Button>
                    </div>
                    <Button variant="activeBlue">Create</Button>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={() => {
                    props.handleButtonClickImport();
                  }}
                  variant={"activeBlue"}
                >
                  Import image ...
                </Button>
                <ul className="grid grid-cols-1 gap-4">
                  <li>
                    <strong className="text-sky-500">
                      Créez Votre Compte :
                    </strong>{" "}
                    Bien que notre application soit gratuite pour tous, nous
                    offrons des fonctionnalités supplémentaires et une
                    suppression des limites de temps pour nos utilisateurs
                    enregistrés. Créez votre compte aujourd'hui pour découvrir
                    l'ensemble complet des possibilités qu'offre Drawing et pour
                    transformer vos photos.
                  </li>
                </ul>
              </CardContent>
              <Separator className="my-4" />
              <CardContent className="grid grid-cols-1 gap-4">
                <CardHeader className="p-0">
                  <CardTitle className="flex">Drawing presentation</CardTitle>
                </CardHeader>
                <ul className="grid grid-cols-1 gap-4">
                  <li>
                    Bienvenue sur Drawing, votre outil en ligne simple et
                    intuitif pour effectuer des modifications d'images de
                    manière rapide et efficace. Que vous soyez un professionnel
                    du design ou un utilisateur occasionnel, Drawing vous offre
                    une plateforme conviviale pour retoucher, recadrer, et
                    ajuster vos images sans avoir besoin de logiciels complexes.
                  </li>
                </ul>
                <Separator className="my-4" />
                <h1 className="text-blue-500 font-bold">
                  Fonctionnalités principales :
                </h1>
                <ol className="grid grid-cols-1 gap-4">
                  <li>
                    <strong className="text-sky-500">
                      Recadrage personnalisé :
                    </strong>{" "}
                    Découpez vos images selon vos besoins spécifiques en
                    ajustant les dimensions et la position du cadre de
                    recadrage.
                  </li>
                  <li>
                    <strong className="text-sky-500">
                      Ajustement de la luminosité et du contraste :
                    </strong>{" "}
                    Apportez des modifications fines pour améliorer la qualité
                    de vos images et les rendre plus attrayantes.
                  </li>
                  <li>
                    <strong className="text-sky-500">Ajout de texte :</strong>{" "}
                    Insérez des légendes ou des annotations directement sur vos
                    images, avec des options de personnalisation du style de
                    texte (police, taille, couleur, alignement).
                  </li>
                  <li>
                    <strong className="text-sky-500">Zoom et rotation :</strong>{" "}
                    Manipulez vos images avec précision grâce aux outils de zoom
                    et de rotation, pour un contrôle total de l'affichage.
                  </li>
                  <li>
                    <strong className="text-sky-500">
                      Aperçu en temps réel :
                    </strong>{" "}
                    Visualisez instantanément les modifications apportées à vos
                    images avant de les télécharger, pour un rendu parfait à
                    chaque fois.
                  </li>
                </ol>
                <Separator className="my-4" />
                <div>
                  <strong className="text-sky-500">Drawing</strong> est votre
                  allié idéal pour des modifications d'images rapides, simples
                  et efficaces. Essayez-le dès aujourd'hui et transformez vos
                  images en quelques clics !
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default DrawingIntro;

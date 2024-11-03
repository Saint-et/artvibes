import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaClock } from "react-icons/fa6";
import { LuTimer } from "react-icons/lu";

interface IsNewImage {
  id: number;
  fileName: string;
  img: string;
}

interface TimerProps {
  //duration: number; // durée en secondes
  onComplete?: () => void; // fonction optionnelle appelée à la fin du timer
  isNewImage: IsNewImage;
}

const DrawingTimer: React.FC<TimerProps> = (props) => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft === 0) {
      if (props.onComplete) {
        props.onComplete(); // Appel de la fonction de fin de minuterie si elle est fournie
      }
      return;
    }
    if (timeLeft === 60) {
      toast("⚠️ You only have 1 minute left before the drawing stops.", {
        duration: 5000,
        style: {
          borderColor: '#ffcc00',
          color: '#ffcc00',
        }
      });
    }

    if (!props.isNewImage.img) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime: any) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, props.onComplete, props.isNewImage]);

  // Formater le temps restant en minutes et secondes
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


  return (
    <>
      <Popover>
        <PopoverTrigger className="gradient-animated1 flex items-center bg-stone-900 text-primary-foreground rounded-md px-1 py-0 text-1xl font-bold">
          <LuTimer className="mr-2 h-5 w-5" />
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </PopoverTrigger>
        <PopoverContent className="grid grid-cols-1 gap-2 gradient1">
          <span>Pour profiter d'une utilisation sans interruption :</span>
          <span>Créez un compte gratuitement 🙂 !</span>
          <Button>Connection</Button>
        </PopoverContent>
      </Popover>

      {/*<AlertDialog open={timeLeft === 0}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log in if you wish to continue.</AlertDialogTitle>
            <AlertDialogDescription>
              Log in if you want to continue or create an account if you don't
              have one yet.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>*/}
    </>
  );
};

export default DrawingTimer;

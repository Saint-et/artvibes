import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LuAlertCircle, LuArrowUpRightSquare } from "react-icons/lu";

export default function AlertPing(props: any) {
  //if (props.alertHidden) return null;

  if (props.alertStart())
    return (
      <>
        <div
          className="absolute bottom-[100px] right-[50px] flex h-[50px] w-[50px] cursor-pointer"
          style={{
            right: props.alertHidden ? 200 : 50,
            transition: '500ms'
          }}
          onClick={() => {
            if (props.onClickRef) {
              props.onClickRef.click();
            }
          }}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <HoverCard>
            <HoverCardTrigger>
              <span className="relative flex justify-center items-center inline-flex rounded-full h-[50px] w-[50px] bg-red-500 text-[30px]">
                <LuAlertCircle />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <LuAlertCircle className="text-[50px]" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Alert</h4>
                  <p className="text-sm">
                    {props.message ||
                      "The action you are trying to do is not possible"}
                  </p>
                  <Button variant="link">
                    Know more <LuArrowUpRightSquare className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </>
    );
}

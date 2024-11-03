import { Button } from "@/components/ui/button";
import { LuGem } from "react-icons/lu";

export default function Credits() {
  return (
    <>
      <h1 className="text-2xl font-bold text-start w-full my-10">Credits</h1>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 items-start">
        <div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
          <LuGem className="w-12 h-12 text-emerald-500" />
          <h3 className="text-lg font-semibold">...</h3>
          <p className="text-4xl font-bold text-stone-200">0</p>
          <Button className="w-full">0</Button>
        </div>
        <div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
          <LuGem className="w-12 h-12 text-emerald-500" />
          <h3 className="text-lg font-semibold">...</h3>
          <p className="text-4xl font-bold text-stone-200">0</p>
          <Button className="w-full">0</Button>
        </div>
        <div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
          <LuGem className="w-12 h-12 text-emerald-500" />
          <h3 className="text-lg font-semibold">...</h3>
          <p className="text-4xl font-bold text-stone-200">0</p>
          <Button className="w-full">0</Button>
        </div>
      </div>
    </>
  );
}

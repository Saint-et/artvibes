import { Button } from "@/components/ui/button";
import { LuGem } from "react-icons/lu";

export default function Credits() {
  const CreditCards = [
    {
      title: "Unavailable",
      gem: 0,
      price: '0 €',
    },
    {
      title: "Unavailable",
      gem: 0,
      price: '0 €',
    },
    {
      title: "Unavailable",
      gem: 0,
      price: '0 €',
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-start w-full my-10">Credits</h1>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 items-start">
        {CreditCards?.map((el, index) => (
          <div
            key={index}
            className="bg-white dark:bg-card rounded-lg shadow-md p-6 flex flex-col items-center gap-4"
          >
            <LuGem className="w-12 h-12 text-emerald-500" />
            <h3 className="text-lg font-semibold text-black dark:text-white">{el.title}</h3>
            <p className="text-4xl font-bold text-stone-500">{el.gem}</p>
            <Button className="w-full">{el.price}</Button>
          </div>
        ))}
      </div>
    </>
  );
}

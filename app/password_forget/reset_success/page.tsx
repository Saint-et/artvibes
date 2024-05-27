import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Reset_success() {
  return (
    <>
      <div className="flex items-center pt-[100px] flex-col">
        <div className="flex justify-center items-center max-w-max h-max flex-col">
          <h1 className="text-6xl font-bold text-center pb-20 bg-gradient-to-tr from-blue-700 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            The reset was successfully completed
          </h1>
          <div className="flex justify-center items-center w-[100%] pb-[50px] pt-[80px]">
            <div>
              <h1 className="text-2xl font-bold">Read the steps carefully.</h1>
              <p>Dear user,</p>
              <p className="leading-4 [&:not(:first-child)]:mt-6">
                We are happy to inform you that your password has been
                successfully changed. Your account is now secured with your new
                password.
              </p>
              <p className="leading-4 [&:not(:first-child)]:mt-6">
                If you have made this change, no further action is required on
                your part. You can now log in to your account using your new
                password.
              </p>
              <p className="leading-4 [&:not(:first-child)]:mt-6">
                If you have not made this change, please contact us immediately
                for additional security measures.
              </p>
              <p className="leading-4 [&:not(:first-child)]:mt-6">
                Please do not hesitate to contact us if you have any questions
                or need further assistance.
              </p>
              <p className="leading-4 [&:not(:first-child)]:mt-6">
                Kind regards
              </p>
              <p className="leading-4 [&:not(:first-child)]:mt-6">
                The Artvibes team
              </p>
            </div>
          </div>

          <div className="flex flex-col">
              <Link href={"/login"}>
            <Button
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-110 transition"
              type="submit"
            >
              Login to your account
            </Button>
            </Link>
            <Button
              className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:scale-110 transition mt-3"
              type="submit"
            >
              Visite Artvibes
            </Button>
            <div className="flex justify-center">
              <Button type="button" className="text-white" variant="link">
                Language
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

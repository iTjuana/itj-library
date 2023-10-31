import Image from "next/image";
import fourOFour from "/src/404.png";

export default function notFound() {
  return (
    <main className="flex  h-full w-full  items-center justify-center">
      <div className="flex h-[90%] w-8/12 flex-col items-center justify-center rounded-full bg-[#E5F2E9] text-center">
        <p className="text-4xl">Page not found</p>
        <Image
          src={fourOFour}
          alt="404_error"
          sizes="50vw"
          style={{
            width: "90%",
            height: "auto",
          }}
          className="max-w-md "
        />
      </div>
    </main>
  );
}

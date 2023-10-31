import Image from "next/image";

export default function notFound() {
  return (
    <main className="flex  h-full w-full  items-center justify-center">
      <div className="flex h-[90%] w-8/12 flex-col items-center justify-center rounded-full bg-[#E5F2E9] text-center">
        <p className="text-4xl">Page not found</p>
        <Image
          src="/404.png"
          alt="404_error"
          sizes="50vw"
          style={{
            width: "90%",
            height: "auto",
          }}
          width={300}
          height={300}
          className="max-w-md "
        />
      </div>
    </main>
  );
}

import Button from "~/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="h-full">
        <div className="relative flex h-full w-screen  flex-col items-center justify-center  md:flex-row">
          <div className="flex w-full flex-col items-center justify-center space-y-6 p-12  md:space-y-12 ">
            <div className="space-y-4  text-4xl leading-tight md:text-5xl lg:text-7xl">
              <h2>
                Talk <span className="italic text-primary">Together,</span>
              </h2>
              <h2>
                Bond <span className="italic text-secondary">Together,</span>
              </h2>
              <h2>
                Thrive <span className="italic text-thirdly">Forever.</span>
              </h2>
            </div>
            <span className="text-center text-base font-light lg:text-xl ">
              Unlock Meaningful Conversations, Bond Together Deeply.
            </span>

            <div className="z-10  flex w-full justify-center ">
              <Button href="/players" title="Get Started" />
            </div>
            <div className="md:hidden ">
              <Image
                src={"/hero.png"}
                alt="hero"
                width={300}
                height={250}
                priority={true}
              />
            </div>
          </div>
          <div className=" hidden h-full w-screen items-center justify-center md:flex ">
            <Image
              src={"/hero.png"}
              alt="hero"
              width={570}
              height={250}
              priority={true}
            />
          </div>
        </div>
      </main>
    </>
  );
}

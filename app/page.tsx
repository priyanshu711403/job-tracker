import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
   return (
      <main>
         <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
            <Image src={Logo} alt="logo" />
         </header>
         <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid grid-cols-[1fr,400px] items-center">
            <div>
               <h1 className="capitalize text-4xl md:text-7xl font-bold">
                  job <span className="text-primary">tracking</span> app
               </h1>
               <p className="leading-loose max-w-md mt-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi dolores a aperiam corrupti nihil
                  inventore, cum earum saepe iste reiciendis perspiciatis, consequuntur tempora necessitatibus nam
                  praesentium maiores odit esse fugiat!
               </p>
               <Button asChild className="mt-4">
                  <Link href="/add-job">Get Started</Link>
               </Button>
            </div>
            <Image src={LandingImg} alt="landingImg" className="hidden lg:block " />
         </section>
      </main>
   );
}

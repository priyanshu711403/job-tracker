import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
export default function Home() {
   return (
      <main>
         <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex justify-between">
            <Image src={Logo} alt="logo" />
            <ThemeToggle />
         </header>
         <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid grid-cols-[1fr,400px] items-center">
            <div>
               <h1 className="capitalize text-4xl md:text-7xl font-bold">
                  job <span className="text-primary">tracking</span> app
               </h1>
               <p className="leading-loose max-w-md mt-4">
                  Test Username- "test"
                  <br />
                  Password-"test"
               </p>
               {/* <p>Test Username- "test" Password-"test"</p> */}
               <Button asChild className="mt-4">
                  <Link href="/add-job">Get Started</Link>
               </Button>
            </div>
            <Image src={LandingImg} alt="landingImg" className="hidden lg:block " />
         </section>
      </main>
   );
}
// import Image from "next/image";
// import Logo from "../assets/logo.svg";
// import LandingImg from "../assets/main.svg";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function Home() {
//    return (
//       <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//          <header className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex justify-between items-center">
//             <Image src={Logo} alt="logo" className="w-10 h-10" />
//             <h1 className="text-xl font-semibold text-primary">Jobify</h1>
//          </header>
//          <section className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-4 sm:px-8 h-full">
//             <div className="text-center lg:text-left lg:flex-1">
//                <h1 className="capitalize text-4xl md:text-6xl font-bold leading-tight">
//                   Job <span className="text-primary">Tracking</span> App
//                </h1>
//                <p className="leading-loose max-w-md mt-4 mx-auto lg:mx-0">
//                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi dolores a aperiam corrupti nihil
//                   inventore, cum earum saepe iste reiciendis perspiciatis, consequuntur tempora necessitatibus nam
//                   praesentium maiores odit esse fugiat!
//                </p>
//                <Button asChild className="mt-6">
//                   <Link href="/add-job">Get Started</Link>
//                </Button>
//             </div>
//             <div className="hidden lg:block lg:flex-1">
//                <Image src={LandingImg} alt="landingImg" className="w-full h-auto" />
//             </div>
//          </section>
//       </main>
//    );
// }

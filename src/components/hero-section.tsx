"use client";
import Image from "next/image";
import profilePic from "@/images/profile-bw.jpg"
import profilePicHover from "@/images/profile-color.jpg"
import { BackgroundGradient } from "./ui/background-gradient";
import { Meteors } from "./magicui/meteors"
import { ShimmerButton } from "./magicui/shimmer-button";



export default function Hero() {


    return (     
        <div className="relative flex h-[25rem] sm:h-[40rem] w-full max-w-4xl items-center justify-center bg-white dark:bg-background overflow-hidden">
            <div className="relative z-1 flex-col h-[300px] items-center justify-center w-full max-w-4xl mt-24">
                <div className="relative flex flex-col items-center justify-center">
                    {/* meteor effect */}
                    <Meteors number={30} angle={130} />
                    {/* gradient for profile picture glow */}
                    <BackgroundGradient className="w-25 h-25 ">
                        <Image
                            src={profilePic}
                            alt="Profile Picture"
                            className="absolute rounded-full transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                        />
                        <Image
                            src={profilePicHover}
                            alt="Profile Picture Hover"
                            className="absolute rounded-full transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                        />
                        {/* </div> */}
                    </BackgroundGradient>
                    {/* available for work button */}
                    <ShimmerButton className="z-10 my-6">
                        <div className="relative flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full border-1 border-green-700/80 bg-green-500 animate-pulse mr-2"></div>
                        </div>
                        <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm">
                            Available for work
                        </span>
                    </ShimmerButton>
                </div>
                <div className="w-full">
                    {/* hero heading */}
                    <p className="z-50 leading-none subpixel-antialiased bg-gradient-to-b from-neutral-200 dark:from-neutral-50 to-neutral-700 dark:to-neutral-400 bg-clip-text py-2 text-5xl sm:6xl font-bold text-transparent md:text-7xl lg:text-7xl text-center whitespace-nowrap">
                        Hi. I&#39;m Shivam
                    </p>
                    
                    {/* hero text */}
                    <p className="text-sm leading-none subpixel-antialiased font-semibold tracking-tight sm:text-lg text-center text-neutral-500 dark:text-neutral-300">
                        A Full-Stack Developer who likes building things!
                    </p>
                </div>
            </div>
        </div>
    );
}
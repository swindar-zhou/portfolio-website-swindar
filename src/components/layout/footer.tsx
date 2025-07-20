"use client";

export const Footer = () => {
    return (
        <footer className="relative w-full h-[15rem] bg-background text-secondary-foreground pt-4 overflow-hidden">
            <div className="container relative z-10 mx-auto flex flex-col items-center justify-between px-4">
                <p className="text-sm text-center">
                    &copy; {new Date().getFullYear()} Shivam Patel. All rights reserved.
                </p>
                <p className="text-xs text-center mt-2">
                    Built with ❤️ using Next.js and Tailwind
                </p>
            </div>
        </footer>
    )
};
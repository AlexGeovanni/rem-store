import { cn } from "@workspace/ui/lib/utils"

interface Props {
children:React.ReactNode,
className?:string
}

export default function Wrapper ({children,className,...props}:Props & React.HTMLAttributes<HTMLElement>) {
    return(
        // <section className={cn('px-3.5 max-w-[1440px] mx-auto mt-5 sm:px-5 md:mt-6 lg:mt-12 lg:px-12 xl:px-16',className)}>
        <section className={cn('px-2.5 xs:px-3.5 max-w-360 mx-auto mt-5 sm:px-5 md:mt-8 lg:mt-16 lg:px-12 xl:px-16',className)}
        {...props}
        >   
        {children}
        </section>
    )
}
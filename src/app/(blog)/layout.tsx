import HeaderActionButton from "./components/HeaderActionButton";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

    return (
        <>
            <div className="w-full h-1/12 bg-green-300 align-middle pl-5 pr-5">
                <HeaderActionButton />
            </div>

            <div className="w-full h-11/12 overflow-scroll">
                {children}
            </div>
        </>
    )
}
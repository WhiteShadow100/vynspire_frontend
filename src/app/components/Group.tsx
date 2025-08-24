export function Group({ children, className }:{ children: React.ReactNode, className?: string}){
    return (
        <div className={`p-2 ${className ? className: ""}`}>
            {children}
        </div>
    )
}
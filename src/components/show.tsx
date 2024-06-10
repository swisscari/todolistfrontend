import { ReactNode } from "react"

export const Show = ({
    when,
    children,
    fallback
}: {
    when: boolean,
    children: ReactNode,
    fallback?: ReactNode
}) => {
    return when ? <>{children}</> : fallback;
}
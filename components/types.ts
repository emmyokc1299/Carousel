import React from "react"

export type CardsProps = {
    ref: React.Ref<HTMLDivElement>
}

export type CardProps = {
    children:  React.ReactNode
}

export type CarouselProps = {
    children: React.ReactNode
    space?: number
    divPerSlide?: number
    speed?: "slow" | "medium" | "fast"
    width?: string | number
}



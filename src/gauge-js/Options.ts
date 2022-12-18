export interface Options {
    strokeWidth?: number
    length?: number
    color?: string
    iconPath?: string
    iconScale?: number
    iconAngle?: number
    angle?: number
    maxValue?: number,
    minValue?: number
    highDpiSupport?: boolean
    fontSize?: number


    lineWidth?: number // The line thickness
    pointer?: {
        length?: number // Relative to gauge radius
        strokeWidth?: number // The thickness
        iconScale: number
    },
    colorStart?: string   // Colors
    colorStop?: string    // just experiment with them
    strokeColor?: string   // to see which ones work best for you
    shadowColor?: string
    radiusScale?: number
    limitMax?: boolean
    limitMin?: boolean
    gradientType?: number       	// 0 : radial, 1 : linear
    percentColors?: []
}
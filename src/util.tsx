
interface RgbaColor {
    r: number; // Red (0-255)
    g: number; // Green (0-255)
    b: number; // Blue (0-255)
    a: number; // Alpha (0-1)
}

export function hsvaToRgba(h: number, s: number, v: number, a: number): RgbaColor {
    // Ensure inputs are in the correct range
    h = (h % 360 + 360) % 360
    s = Math.max(0, Math.min(1, s)); // Saturation: 0-1
    v = Math.max(0, Math.min(1, v)); // Value: 0-1
    a = Math.max(0, Math.min(1, a)); // Alpha: 0-1

    let r: number, g: number, b: number; // Red, Green, Blue values

    const c = v * s; // Chroma
    const hPrime = h / 60; // Sector of the color wheel
    const x = c * (1 - Math.abs(hPrime % 2 - 1)); // Intermediate value
    const m = v - c; // Match lightness

    if (hPrime >= 0 && hPrime < 1) {
        r = c;
        g = x;
        b = 0;
    } else if (hPrime < 2) {
        r = x;
        g = c;
        b = 0;
    } else if (hPrime < 3) {
        r = 0;
        g = c;
        b = x;
    } else if (hPrime < 4) {
        r = 0;
        g = x;
        b = c;
    } else if (hPrime < 5) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    // Add the lightness match and scale to 0-255 range
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b, a };
}

type RGB = { r: number; g: number; b: number };
type HSV = { h: number; s: number; v: number };

export function rgbToHsv({ r, g, b }: RGB): HSV {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const v = max;

    if (delta !== 0) {
        s = delta / max;

        switch (max) {
            case r:
                h = ((g - b) / delta) % 6;
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }

        h *= 60;
        if (h < 0) h += 360;
    }

    return { h, s, v };
}


export function getCheckerboardStyle(size: number, color: string = "#ccc") {
    return {
        backgroundImage: `linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(-45deg, ${color} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${color} 75%), linear-gradient(-45deg, transparent 75%, ${color} 75%)`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: `0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px`
    }
};

export function degToRad(degrees: number) {
    return degrees * (Math.PI / 180);
}

export function getOpposite(adjacent: number, angleInDegrees: number): number {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    return Math.tan(angleInRadians) * adjacent;
}

// type ScrollbarStyleOptions = {
//     selector?: string;
//     trackColor: string;
//     thumbColor: string;
//     size?: string;
//     hideButtons?: boolean;
//     rounded?: boolean;
// };

// export function createCustomScrollbarStyle(
//     options: ScrollbarStyleOptions,
//     styleId = "custom-scrollbar-style"
// ): HTMLStyleElement {
//     const {
//         selector = "*",
//         trackColor,
//         thumbColor,
//         size = "8px",
//         hideButtons = true,
//         rounded = true,
//     } = options;

//     const style = document.createElement("style");
//     style.id = styleId;

//     style.innerHTML = `
//         ${selector}::-webkit-scrollbar {
//             width: ${size} !important;
//             height: ${size} !important;
//         }

//         ${selector}::-webkit-scrollbar-track {
//             background: ${trackColor} !important;
//         }

//         ${selector}::-webkit-scrollbar-thumb {
//             background-color: ${thumbColor} !important;
//             ${rounded ? "border-radius: 9999px !important;" : ""}
//         }

//         ${selector} {
//             scrollbar-width: thin;
//             scrollbar-color: ${thumbColor} ${trackColor};
//         }

//         ${hideButtons ? `
//             ${selector}::-webkit-scrollbar-button {
//                 display: none !important;
//                 width: 0 !important;
//                 height: 0 !important;
//                 background: transparent !important;
//                 border: none !important;
//             }

//             ${selector}::-webkit-scrollbar-button:single-button:vertical:decrement,
//             ${selector}::-webkit-scrollbar-button:single-button:vertical:increment,
//             ${selector}::-webkit-scrollbar-button:single-button:horizontal:decrement,
//             ${selector}::-webkit-scrollbar-button:single-button:horizontal:increment {
//                 display: none !important;
//                 width: 0 !important;
//                 height: 0 !important;
//                 background: transparent !important;
//                 border: none !important;
//             }
//         ` : ""}
//     `;

//     return style;
// }


type ScrollbarStyleOptions = {
    selector?: string;
    size?: string;
    trackShadow?: string;
    trackRadius?: string;
    thumbColor?: string;       // can be hex or rgba
    thumbOpacity?: number;     // optional, used only if thumbColor is hex
    thumbShadow?: string;
    thumbRadius?: string;
};

function hexToRgba(hex: string, opacity: number): string {
    const parsedHex = hex.replace("#", "");
    const bigint = parseInt(parsedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function createCustomScrollbarStyle(
    options: ScrollbarStyleOptions,
    styleId = "custom-scrollbar-style"
): HTMLStyleElement {
    const {
        selector = "*",
        size = "12px",
        trackShadow = "inset 0 0 6px rgba(0,0,0,0.3)",
        trackRadius = "10px",
        thumbColor = "#ff0000",
        thumbOpacity,
        thumbShadow = "inset 0 0 6px rgba(0,0,0,0.5)",
        thumbRadius = "10px",
    } = options;

    const finalThumbColor =
        thumbColor.startsWith("#") && thumbOpacity !== undefined
            ? hexToRgba(thumbColor, thumbOpacity)
            : thumbColor;

    const style = document.createElement("style");
    style.id = styleId;

    style.innerHTML = `
        ${selector}::-webkit-scrollbar {
            width: ${size};
        }

        ${selector}::-webkit-scrollbar-track {
            -webkit-box-shadow: ${trackShadow};
            -webkit-border-radius: ${trackRadius};
            border-radius: ${trackRadius};
        }

        ${selector}::-webkit-scrollbar-thumb {
            background: ${finalThumbColor};
            -webkit-border-radius: ${thumbRadius};
            border-radius: ${thumbRadius};
            -webkit-box-shadow: ${thumbShadow};
        }

        ${selector} {
            scrollbar-width: thin;
            scrollbar-color: ${finalThumbColor} transparent;
        }
    `;

    return style;
}

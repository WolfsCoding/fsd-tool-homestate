import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export class TextBuilder {
    text: string = "";

    constructor() {
        this.text = "";
    }

    addLine(line: string) {
        this.text += line + "\n";
        return this;
    }

    copyClipboard() {
        navigator.clipboard.writeText(this.text).then(
            function () {
                console.log("Copying to clipboard was successful!");
            },
            function (err) {
                console.error("Could not copy text: ", err);
            }
        );
    }
}

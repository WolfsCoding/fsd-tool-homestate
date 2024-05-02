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
            function () {},
            function (err) {
                console.error("Could not copy text: ", err);
            }
        );

        return this;
    }

    replaceVariables(variables: { key: string; value: string }[]) {
        for (let i = 0; i < variables.length; i++) {
            this.text = this.text.replaceAll(variables[i].key, variables[i].value);
        }

        return this;
    }

    getAsString(): string {
        return this.text;
    }
}

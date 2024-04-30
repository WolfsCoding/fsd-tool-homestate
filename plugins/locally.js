export default defineNuxtPlugin(() => {
    return {
        provide: {
            locally: {
                copyClipboard(text) {
                    if (process.client) {
                        return navigator.clipboard.writeText(text);
                    }
                },
            },
        },
    };
});

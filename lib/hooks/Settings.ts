import { SingleLocalStorage } from "../localORM";

const settings = ref(
    (await new SingleLocalStorage<{
        gutachter: string;
        sparbuch: boolean;
    }>("settings").get()) ?? {
        gutachter: "",
        sparbuch: false,
    }
);

function setSettings(newSettings: typeof settings.value) {
    settings.value = newSettings;
    new SingleLocalStorage("settings").set(newSettings);
}

export function useSettings() {
    return {
        settings,
        setSettings,
    };
}

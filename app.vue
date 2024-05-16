<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>

    <div class="absolute left-[50%] translate-x-[-50%] top-0">
        <Alert class="w-screen-1/3 m-4" v-for="alert in alerts.filter((x) => !readAlerts.includes(x.id))" :key="alert.id">
            <div class="flex">
                <AlertTitle class="text-epa font-bold">{{ alert.title }}</AlertTitle>
                <i class="fa-solid fa-xmark ml-auto hover:text-epa cursor-pointer" @click="readAlert(alert.id)"></i>
            </div>

            <AlertDescription> {{ alert.description }} </AlertDescription>
        </Alert>
    </div>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SingleLocalStorage } from "./lib/localORM";

const readAlerts = ref((await new SingleLocalStorage<string[]>("readAlerts").get()) ?? []);

function readAlert(id: string) {
    readAlerts.value.push(id);
    new SingleLocalStorage("readAlerts").set(readAlerts.value);
}

const alerts = [
    {
        id: "bcffe55c-ea88-4a12-9798-76e192ac6caf",
        title: "Neues Update!",
        description: "Du kannst nun einen standart Gutachter in den Einstellungen oben rechts festlegen.",
    },
    {
        id: "ce9e1f1a-1542-4506-972f-4aba3e5b9465",
        title: "Neues Update!",
        description: "Du kannst nun Beschriftungen für Asservate erstellen.",
    },
];
</script>

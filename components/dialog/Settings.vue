<template>
    <Popover>
        <PopoverTrigger as-child class="ml-auto">
            <Button variant="ghost" class="rounded-full">
                <i class="fa-solid fa-gear"></i>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
            <div class="grid gap-4">
                <div class="space-y-2">
                    <h4 class="font-medium leading-none">Einstellungen</h4>
                </div>
                <div class="grid gap-2">
                    <div class="grid grid-cols-3 items-center gap-4">
                        <Label for="width">Gutachter:</Label>
                        <Input id="width" type="text" class="col-span-2 h-8" v-model="settings.gutachter" />
                    </div>
                </div>
                <Button variant="secondary" @click="saveSettings">Speichern</Button>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { SingleLocalStorage } from "@/lib/localORM";
import { useToast } from "../ui/toast";

const settings = (await new SingleLocalStorage<{
    gutachter: string;
}>("settings").get()) ?? { gutachter: "" };

function saveSettings() {
    new SingleLocalStorage("settings").set(settings);

    useToast().toast({
        title: "Einstellungen gespeichert",
        description: "Die Einstellungen wurden erfolgreich gespeichert.",
    });
}
</script>

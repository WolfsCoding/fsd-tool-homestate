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
                        <Label for="gutachter">Gutachter:</Label>
                        <Input id="gutachter" type="text" class="col-span-2 h-8" v-model="settings.gutachter" />
                    </div>
                    <Form v-slot="{ values }">
                        <div class="grid grid-cols-3 items-center gap-4">
                            <Label for="sparbuch">Sparbuch:</Label>
                            <Switch id="sparbuch" class="col-span-2" v-model:checked="settings.sparbuch" />
                        </div>
                    </Form>
                </div>
                <Button variant="secondary" @click="saveSettings">Speichern</Button>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { Switch } from "../ui/switch";
import { toast } from "vue-sonner";
import { useSettings } from "@/lib/hooks/Settings";

const { settings, setSettings } = useSettings();

function saveSettings() {
    setSettings(settings.value);

    toast("Einstellungen gespeichert", {
        description: "Die Einstellungen wurden erfolgreich gespeichert.",
    });
}
</script>

<template>
    <DialogHeader>
        <DialogTitle>Analyse erstellen</DialogTitle>
        <DialogDescription> Erstelle ein Analyse zu Hieb und/oder Stichwaffen.</DialogDescription>
    </DialogHeader>
    <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
            <Label for="akz" class="text-right"> Akz. </Label>
            <Input id="akz" class="col-span-3" type="text" v-model="akz" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
            <Label for="gutachter" class="text-right"> Gutachter </Label>
            <Input id="gutachter" class="col-span-3" type="text" v-model="gutachter" />
        </div>
    </div>
    <DialogFooter>
        <DialogClose as-child>
            <Button type="submit" @click="create()"> Erstellen </Button>
        </DialogClose>
    </DialogFooter>
</template>

<script setup lang="ts">
import { LocalStorage, Stichwaffen } from "@/lib/localORM";
import { useToast } from "../ui/toast";
import { useSettings } from "@/lib/hooks/Settings";
import { useStichwaffen } from "@/lib/hooks/Stichwaffen";

const { settings } = useSettings();
const { addStichwaffe } = useStichwaffen();

const akz = ref("");
const gutachter = ref(settings.value.gutachter);

async function create() {
    if (akz.value === "" || gutachter.value === "") {
        useToast().toast({
            title: "Fehler",
            description: "Bitte fülle alle Felder aus.",
            variant: "destructive",
        });
        return;
    }

    const newStichwaffe = new Stichwaffen({
        akz: akz.value,
        gutachter: gutachter.value,
    });

    addStichwaffe(newStichwaffe);

    akz.value = "";
    gutachter.value = "";

    useToast().toast({
        title: "Analyse erstellt",
        description: "Die Analyse wurde erfolgreich erstellt.",
    });

    useRouter().push("/stichwaffen/" + newStichwaffe.id);
}
</script>

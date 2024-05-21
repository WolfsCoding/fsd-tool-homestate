<template>
    <DialogHeader>
        <DialogTitle>Gutachten erstellen</DialogTitle>
        <DialogDescription> Erstelle ein neues ballistisches Gutachten.</DialogDescription>
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
            <Button type="submit" @click="createGutachten()"> Erstellen </Button>
        </DialogClose>
    </DialogFooter>
</template>

<script setup lang="ts">
import { Gutachten, LocalStorage, SingleLocalStorage } from "@/lib/localORM";
import { useToast } from "../ui/toast";
import { useSettings } from "@/lib/hooks/Settings";

const gutachtenDB = new LocalStorage<Gutachten>("gutachten", (data: any) => new Gutachten(data));
const { settings } = useSettings();

const akz = ref("");
const gutachter = ref(settings.value.gutachter);

async function createGutachten() {
    if (akz.value === "" || gutachter.value === "") {
        useToast().toast({
            title: "Fehler",
            description: "Bitte fülle alle Felder aus.",
            variant: "destructive",
        });
        return;
    }

    const createdGutachten = new Gutachten({
        akz: akz.value,
        gutachter: gutachter.value,
    });

    gutachtenDB.add(createdGutachten);

    useToast().toast({
        title: "Gutachten erfolgreicherstellt",
        description: "UUID: " + createdGutachten.id,
    });

    useRouter().push("/gutachten/" + createdGutachten.id);
}
</script>

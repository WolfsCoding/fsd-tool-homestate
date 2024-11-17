<template>
  <DialogHeader>
    <DialogTitle>Gutachten erstellen</DialogTitle>
    <DialogDescription> Erstelle ein neues ballistisches Gutachten.</DialogDescription>
  </DialogHeader>
  <div class="grid gap-4 py-4">
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="akz" class="text-right"> Aktenzeichen </Label>
      <Input id="akz" class="col-span-3" type="text" v-model="akz" />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="gutachter" class="text-right"> Gutachter </Label>
      <Input id="gutachter" class="col-span-3" type="text" v-model="gutachter" />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="gutachter" class="text-right"> Im Auftrag von </Label>
      <Input id="gutachter" class="col-span-3" type="text" v-model="forName" />
    </div>
  </div>
  <DialogFooter>
    <DialogClose as-child>
      <Button type="submit" @click="createGutachten()"> Erstellen </Button>
    </DialogClose>
  </DialogFooter>
</template>

<script setup lang="ts">
import { Gutachten } from '@/lib/localORM';
import { toast } from 'vue-sonner';
import { useSettings } from '@/lib/hooks/Settings';
import { useGutachten } from '@/lib/hooks/Gutachten';

const { settings } = useSettings();
const { add: addGutachten } = useGutachten();

const akz = ref('');
const gutachter = ref(settings.value.gutachter);
const forName = ref('');

async function createGutachten() {
  if (akz.value === '' || gutachter.value === '' || forName.value === '') {
    toast('Fehler', {
      description: 'Bitte fülle alle Felder aus.',
    });

    return;
  }

  const createdGutachten = new Gutachten({
    akz: akz.value,
    gutachter: gutachter.value,
    forName: forName.value,
  });

  addGutachten(createdGutachten);

  toast('Gutachten erfolgreicherstellt', {
    description: 'UUID: ' + createdGutachten.id,
  });

  useRouter().push('/gutachten/' + createdGutachten.id + '/Waffen');
}
</script>

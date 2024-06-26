<template>
  <DialogHeader>
    <DialogTitle>Analyse erstellen</DialogTitle>
    <DialogDescription> Erstelle ein neues toxikologische Analyse.</DialogDescription>
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
      <Button type="submit" @click="create()"> Erstellen </Button>
    </DialogClose>
  </DialogFooter>
</template>

<script setup lang="ts">
import { Toxi } from '@/lib/localORM';
import { toast } from 'vue-sonner';
import { useSettings } from '@/lib/hooks/Settings';
import { useToxi } from '@/lib/hooks/Toxikologisch';

const { settings } = useSettings();
const { add: addToxi } = useToxi();

const akz = ref('');
const gutachter = ref(settings.value.gutachter);
const forName = ref('');

async function create() {
  if (!akz.value || !gutachter.value || !forName.value) {
    toast('Fehler beim Erstellen', {
      description: 'Bitte fülle alle Felder aus.',
    });
    return;
  }

  const newAnalyse = new Toxi({
    akz: akz.value,
    gutachter: gutachter.value,
    forName: forName.value,
  });

  addToxi(newAnalyse);

  akz.value = '';
  gutachter.value = '';
  forName.value = '';

  toast('Analyse erstellt', {
    description: 'Die Analyse wurde erfolgreich erstellt.',
  });

  useRouter().push('/toxikologisch/' + newAnalyse.id + '/Drogen');
}
</script>

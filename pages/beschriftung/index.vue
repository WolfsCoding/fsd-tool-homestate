<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Beschriftung, TYPES } from '@/lib/localORM/tables/beschriftung';
import { useBeschriftungen } from '@/lib/hooks/Beschriftung';
import { useDate } from '@/lib/hooks/Date';
import { toast } from 'vue-sonner';

const { add: addBeschriftung, beschriftungen, remove: removeBeschriftung } = useBeschriftungen();
const { calculateRoundedOffsetInMinutes, getFormattedDate } = useDate();

const minutes = ref('');
const ort = ref('');
const akz = ref('');
const type = ref(TYPES.Eigentumsdelikt);

const props = defineProps(['search']);

async function handleAddBeschriftung() {
  if (minutes.value === '' || ort.value === '') {
    toast('Fehler', {
      description: 'Bitte fülle alle Felder aus.',
    });

    return;
  }

  const date = calculateRoundedOffsetInMinutes(-parseInt(minutes.value));

  addBeschriftung(
    new Beschriftung({
      datum: getFormattedDate(date, 'DD.MM.YYYY'),
      uhrzeit: getFormattedDate(date, 'hh:mm Uhr'),
      ort: ort.value,
      akz: akz.value,
      type: type.value,
    })
  );

  toast('Beschriftung hinzugefügt', {
    description: 'Die Beschriftung wurde erfolgreich hinzugefügt.',
  });
}

async function handleCopyBeschriftung() {
  if (minutes.value === '' || ort.value === '') {
    toast('Fehler', {
      description: 'Bitte fülle alle Felder aus.',
    });

    return;
  }

  const date = calculateRoundedOffsetInMinutes(-parseInt(minutes.value));

  new Beschriftung({
    datum: getFormattedDate(date, 'DD.MM.YYYY'),
    uhrzeit: getFormattedDate(date, 'hh:mm Uhr'),
    ort: ort.value,
    akz: akz.value,
    type: type.value,
  }).copyToClipboard();

  toast('Beschriftung kopiert', {
    description: 'Die letzte Beschriftung wurde erfolgreich kopiert.',
  });
}

async function handleRemoveBeschriftung(beschriftung: Beschriftung) {
  removeBeschriftung(beschriftung.id);

  toast('Beschriftung gelöscht', {
    description: 'Die Beschriftung wurde erfolgreich gelöscht.',
  });
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <div class="flex flex-col sm:gap-4 sm:py-4">
      <header
        class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
      >
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Asservaten Beschriftung</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="grid gap-4 py-4 grid-cols-12">
          <div class="col-span-2">
            <Input
              id="minutesAgo"
              class="col-span-11"
              type="text"
              v-model="minutes"
              placeholder="Minuten alt"
            />
          </div>
          <div class="col-span-3">
            <Input id="ort" class="col-span-11" type="text" v-model="ort" placeholder="Ort" />
          </div>
          <div class="col-span-3">
            <Input
              id="aktenzeichen"
              class="col-span-11"
              type="text"
              v-model="akz"
              placeholder="Aktenzeichen"
            />
          </div>
          <div class="col-span-3">
            <Select class="col-span-3" v-model="type">
              <SelectTrigger class="col-span-3">
                <SelectValue class="col-span-3" placeholder="Wähle aus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="typeT in TYPES" :value="typeT"> {{ typeT }} </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="col-span-1">
            <Button class="w-1/2" variant="ghost" @click="handleAddBeschriftung">
              <i class="fa-duotone fa-add"></i>
            </Button>
            <Button class="w-1/2" variant="ghost" @click="handleCopyBeschriftung">
              <i class="fa-duotone fa-clipboard"></i>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
              <TableHead>Uhrzeit</TableHead>
              <TableHead>Ort</TableHead>
              <TableHead>Akz.</TableHead>
              <TableHead>Type</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(beschriftung, analysenIndex) in beschriftungen
                .filter(
                  (x) =>
                    x.akz.toLowerCase().includes(props.search.toLowerCase()) ||
                    x.datum.toLowerCase().includes(props.search.toLowerCase()) ||
                    x.uhrzeit.toLowerCase().includes(props.search.toLowerCase()) ||
                    x.ort.toLowerCase().includes(props.search.toLowerCase()) ||
                    x.type.toLowerCase().includes(props.search.toLowerCase())
                )
                .slice(0, 20)"
            >
              <TableCell> {{ beschriftung.datum }} </TableCell>
              <TableCell> {{ beschriftung.uhrzeit }} </TableCell>
              <TableCell> {{ beschriftung.ort }} </TableCell>
              <TableCell> {{ beschriftung.akz }} </TableCell>
              <TableCell> {{ beschriftung.type }} </TableCell>
              <TableCell class="[--table-padding:0]">
                <Button variant="ghost" @click="beschriftung.copyToClipboard()">
                  <i class="fa-duotone fa-clipboard"></i>
                </Button>
                <Button variant="ghost" @click="handleRemoveBeschriftung(beschriftung)">
                  <i class="fa-duotone fa-trash"></i>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  </div>
</template>

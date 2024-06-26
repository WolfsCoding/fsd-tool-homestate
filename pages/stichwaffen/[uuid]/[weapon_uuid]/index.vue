<script setup lang="ts">
import { MoreHorizontal, PlusCircle } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LocalStorage, Stichwaffen } from '@/lib/localORM';
import { toast } from 'vue-sonner';

const route = useRoute();

const stichwaffenDB = new LocalStorage<Stichwaffen>(
  'stichwaffen',
  (data: any) => new Stichwaffen(data)
);
const stichwaffe: Ref<Stichwaffen | undefined> = ref(await stichwaffenDB.get(route.params.uuid));

const createDialog: Ref<{ name: string }> = ref({
  name: '',
});

function addDNA() {
  if (!stichwaffe.value) return;

  if (createDialog.value.name === '') {
    toast('Fehler', {
      description: 'Bitte fülle alle Felder aus.',
    });
    return;
  }

  stichwaffe.value?.weapons
    .find((x) => x.id == route.params.weapon_uuid)
    ?.dnas.push(createDialog.value.name);
  stichwaffenDB.update(route.params.uuid, stichwaffe.value);
  createDialog.value.name = '';

  toast('DNA hinzugefügt', {
    description: 'Die DNA wurde erfolgreich hinzugefügt.',
  });
}

function deleteDNA(dna: string) {
  if (!stichwaffe.value) return;
  const t = stichwaffe.value.weapons.find((x) => x.id == route.params.weapon_uuid);
  if (!t) return;

  stichwaffe.value.weapons
    .find((x) => x.id == route.params.weapon_uuid)
    ?.dnas.splice(t.dnas.indexOf(dna), 1);
  stichwaffenDB.update(route.params.uuid, stichwaffe.value);

  toast('DNA gelöscht', {
    description: 'Die DNA wurde erfolgreich gelöscht.',
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
              <BreadcrumbLink as-child>
                <a href="/stichwaffen">Hieb und Stichwaffen Analysen</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a :href="'/stichwaffen/' + route.params.uuid">{{ stichwaffe?.akz }} </a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> Waffen </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {{ stichwaffe?.weapons.find((x) => x.id == route.params.weapon_uuid)?.from }}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {{ stichwaffe?.weapons.find((x) => x.id == route.params.weapon_uuid)?.name }}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Dialog>
            <DialogTrigger as-child>
              <Button size="sm" class="h-7 gap-1">
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sm:whitespace-nowrap"> DNA hinzufügen </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CardContent>
                <div class="grid gap-4 py-4">
                  <p class="text-lg font-semibold leading-none tracking-tight">DNA hinzufügen</p>
                  <p class="text-sm text-muted-foreground -mt-3">
                    Füge der Hieb und/oder Stichwaffe eine DNA hinzu.
                  </p>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="model" class="text-right"> DNA Treffer </Label>
                    <Input id="name" class="col-span-3" type="text" v-model="createDialog.name" />
                  </div>
                </div>
              </CardContent>
              <DialogFooter>
                <DialogClose as-child>
                  <Button type="submit" @click="addDNA"> Hinzufügen </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DNA</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="dna in stichwaffe?.weapons.find((x) => x.id == route.params.weapon_uuid)?.dnas"
              :key="dna"
            >
              <TableCell class="font-medium"> {{ dna }} </TableCell>
              <TableCell class="[--table-padding:0] pl-4">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                    <DropdownMenuItem @click="deleteDNA(dna)">Löschen</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  </div>
</template>

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type IStichwaffe } from '@/lib/localORM';
import { v4 } from 'uuid';
import { TextBuilder } from '@/lib/utils';
import { useStichwaffen } from '@/lib/hooks/Stichwaffen';
import { toast } from 'vue-sonner';
import { useCustomRoute } from '@/lib/hooks/CustomRoute';

const { route, getTab, switchTab } = useCustomRoute();
const router = useRouter();
const { updateStichwaffe, getStichwaffe } = useStichwaffen();

const stichwaffe = ref(await getStichwaffe(route.params.uuid));

const activeTab = ref('Waffen');

const createDialog: Ref<Partial<IStichwaffe>> = ref({
  from: '',
  name: '',
  dnas: [],
});

function addWeapon() {
  if (!stichwaffe.value) return;

  stichwaffe.value.weapons.push({
    id: v4(),
    from: createDialog.value.from || '',
    name: createDialog.value.name || '',
    dnas: createDialog.value.dnas || [],
  });
  updateStichwaffe(stichwaffe.value.id, stichwaffe.value);

  createDialog.value.name = '';
  createDialog.value.dnas = [];

  toast('Waffe hinzugefügt', {
    description: 'Die Waffe wurde erfolgreich hinzugefügt.',
  });
}

function deleteWeapon(weaponId: string) {
  if (!stichwaffe.value) return;

  const weaponIndex = stichwaffe.value.weapons.findIndex((weapon) => weapon.id === weaponId);

  stichwaffe.value.weapons.splice(weaponIndex, 1);
  updateStichwaffe(stichwaffe.value.id, stichwaffe.value);

  toast('Waffe gelöscht', {
    description: 'Die Waffe wurde erfolgreich gelöscht.',
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
              <BreadcrumbPage> {{ stichwaffe?.akz }} </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {{ activeTab }} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs
          default-value="Waffen"
          v-model="activeTab"
          @update:model-value="(a) => switchTab('' + a)"
        >
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="Waffen"> Waffen </TabsTrigger>
              <TabsTrigger value="Details"> Details </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2">
              <Dialog>
                <DialogTrigger as-child>
                  <Button size="sm" class="h-7 gap-1">
                    <PlusCircle class="h-3.5 w-3.5" />
                    <span class="sm:whitespace-nowrap"> Waffe hinzufügen </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <CardContent>
                    <div class="grid gap-4 py-4">
                      <p class="text-lg font-semibold leading-none tracking-tight">
                        Waffe hinzufügen
                      </p>
                      <p class="text-sm text-muted-foreground -mt-3">
                        Füge der Analyse eine Waffe hinzu.
                      </p>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="model" class="text-right"> Täter </Label>
                        <Input
                          id="name"
                          class="col-span-3"
                          type="text"
                          v-model="createDialog.from"
                        />
                      </div>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="model" class="text-right"> Waffe </Label>
                        <Input
                          id="name"
                          class="col-span-3"
                          type="text"
                          v-model="createDialog.name"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <DialogFooter>
                    <DialogClose as-child>
                      <Button type="submit" @click="addWeapon"> Hinzufügen </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value="Waffen">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Täter</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Anzahl der DNAS</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="weapon in stichwaffe?.weapons"
                  :key="weapon.id"
                  :href="'/stichwaffen/' + route.params.uuid + '/' + weapon.id"
                >
                  <TableCell class="font-medium"> {{ weapon.from }} </TableCell>
                  <TableCell class="font-medium"> {{ weapon.name }} </TableCell>
                  <TableCell class=""> {{ weapon.dnas.length }} </TableCell>
                  <TableCell class="[--table-padding:0] pl-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal class="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                        <DropdownMenuItem
                          @click="
                            router.push('/stichwaffen/' + route.params.uuid + '/' + weapon.id)
                          "
                          >Öffnen</DropdownMenuItem
                        >
                        <DropdownMenuItem
                          @click="
                            new TextBuilder()
                              .addLine(weapon.name + ' - ' + weapon.from + ' - ' + stichwaffe?.akz)
                              .copyClipboard()
                          "
                          >Beschriftung kopieren</DropdownMenuItem
                        >
                        <DropdownMenuItem @click="deleteWeapon(weapon.id)"
                          >Löschen</DropdownMenuItem
                        >
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>

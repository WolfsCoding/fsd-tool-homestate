<script setup lang="ts">
import { MoreHorizontal, PlusCircle } from 'lucide-vue-next';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WeaponNames } from '@/lib/localORM';
import { useGutachten } from '@/lib/hooks/Gutachten';
import { toast } from 'vue-sonner';
import { useDialog } from '@/components/root/useDialog';
import { useCustomRoute } from '@/lib/hooks/CustomRoute';

const { $locally }: { $locally: any } = useNuxtApp() as any;
const { route, switchTab, getTab } = useCustomRoute();

const {
  getById: getGutachtenById,
  update: updateGutachten,
  addWeapon: addWeaponToGutachten,
  removeWeapon: removeWeaponFromGutachten,
} = useGutachten();

const gutachten = await getGutachtenById(route.params.uuid);

const { openDialog } = useDialog();

async function handleEditWeapon(weappnId: string) {
  const weapon = gutachten.value?.weapons.find((w) => w.id === weappnId);
  if (!weapon) return;

  const result = await openDialog(
    'Waffe bearbeiten',
    'Bearbeite die Waffe hier. Klicke auf speichern, wenn du fertig bist.',
    [
      {
        label: 'Name',
        type: 'text',
        value: weapon?.name || '',
      },
      {
        label: 'Model',
        type: 'select',
        value: weapon?.model || '',
        options: WeaponNames.map((weapon) => ({
          label: weapon.title,
          type: 'group',
          options: weapon.models.map((model) => ({
            label: model,
            type: 'item',
            value: weapon.title + ' ' + model,
          })),
        })),
      },
      {
        label: 'Seriennummer',
        type: 'text',
        value: weapon?.serial || '',
      },
      {
        label: 'Schmauchspuren',
        type: 'select',
        value: weapon?.schmauchspuren ? 'Ja' : 'Nein',
        options: [
          { type: 'item', label: 'Ja', value: 'Ja' },
          { type: 'item', label: 'Nein', value: 'Nein' },
        ],
      },
      {
        label: 'Zustand',
        type: 'select',
        value: weapon.zustand?.charAt(0).toUpperCase() + weapon.zustand?.slice(1) || 'kalt',
        options: [
          { type: 'item', label: 'Kalt', value: 'kalt' },
          { type: 'item', label: 'Warm', value: 'warm' },
        ],
      },
      {
        label: 'Munition',
        type: 'text',
        value: weapon?.munition.toString() || '0',
      },
    ]
  );

  if (!result) return;

  weapon.name = result.get('Name') || '';
  weapon.model = result.get('Model') || '';
  weapon.serial = result.get('Seriennummer') || '';
  weapon.schmauchspuren = result.get('Schmauchspuren') === 'Ja';
  weapon.zustand = result.get('Zustand')?.toLocaleLowerCase() || 'kalt';
  weapon.munition = parseInt(result.get('Munition') || '0');

  if (!gutachten.value) return;

  updateGutachten(gutachten.value.id, gutachten.value);
}

const createWeaponDialog = ref({
  name: '',
  model: '',
  serial: '',
  schmauchspuren: 'false',
  zustand: 'kalt',
  munition: 0,
});

const activeTab = ref('Waffen');

function handleAddWeapon() {
  if (!gutachten.value) return;

  addWeaponToGutachten(gutachten.value.id, {
    name: createWeaponDialog.value.name,
    model: createWeaponDialog.value.model,
    serial: createWeaponDialog.value.serial,
    schmauchspuren: createWeaponDialog.value.schmauchspuren == 'true',
    zustand: createWeaponDialog.value.zustand,
    munition: createWeaponDialog.value.munition,
  });
  createWeaponDialog.value = {
    name: '',
    model: '',
    serial: '',
    schmauchspuren: 'false',
    zustand: 'warm',
    munition: 0,
  };

  toast('Waffe hinzugefügt', {
    description: 'Die Waffe wurde erfolgreich hinzugefügt.',
  });
}

function handleRemoveWeapon(uuid: string) {
  if (!gutachten.value) return;

  removeWeaponFromGutachten(gutachten.value.id, uuid);

  toast('Waffe entfernt', {
    description: 'Die Waffe wurde erfolgreich entfernt.',
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
                <a href="/gutachten">Ballistische Gutachten</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a :href="'/gutachten/' + gutachten?.id">{{ gutachten?.akz }}</a>
              </BreadcrumbLink>
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
              <TabsTrigger value="Schmauchspurentests"> Schmauchspurentests </TabsTrigger>
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
                  <CardHeader>
                    <CardTitle>Waffe hinzufügen</CardTitle>
                    <CardDescription> Füge dem Gutachten eine Waffe hinzu. </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-6 items-center gap-4">
                        <Label for="name" class="col-span-2"> Täter </Label>
                        <Input
                          id="name"
                          class="col-span-4"
                          type="text"
                          v-model="createWeaponDialog.name"
                        />
                      </div>
                      <div class="grid grid-cols-6 items-center gap-4">
                        <Label for="model" class="col-span-2"> Model </Label>
                        <Select v-model="createWeaponDialog.model">
                          <SelectTrigger class="col-span-4">
                            <SelectValue placeholder="Suche ein Model aus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup v-for="weapon in WeaponNames" :key="weapon.title">
                              <SelectLabel>{{ weapon.title }}</SelectLabel>
                              <SelectItem
                                v-for="model in weapon.models"
                                :value="
                                  (weapon.title == 'Sonstige' ? '' : weapon.title + ' ') + model
                                "
                              >
                                {{ model }}
                              </SelectItem>
                            </SelectGroup>
                            <!-- <SelectItem v-for="weapon in weapons" :value="weapon"> {{ weapon }} </SelectItem> -->
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="grid grid-cols-6 items-center gap-4">
                        <Label for="serial" class="col-span-2"> Seriennummer </Label>
                        <Input
                          id="serial"
                          class="col-span-4"
                          type="text"
                          v-model="createWeaponDialog.serial"
                        />
                      </div>
                      <div class="grid grid-cols-6 items-center gap-4">
                        <Label for="schmauchspuren" class="col-span-2"> Schmauchspuren </Label>
                        <Select v-model="createWeaponDialog.schmauchspuren">
                          <SelectTrigger class="col-span-4">
                            <SelectValue placeholder="Wähle aus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem :value="'false'"> Nein </SelectItem>
                            <SelectItem :value="'true'"> Ja </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="grid grid-cols-6 items-center gap-4">
                        <Label for="zustand" class="col-span-2"> Zustand </Label>
                        <Select v-model="createWeaponDialog.zustand">
                          <SelectTrigger class="col-span-4">
                            <SelectValue placeholder="Wähle aus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kalt"> Kalt </SelectItem>
                            <SelectItem value="warm"> Warm </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="grid grid-cols-6 items-center gap-4">
                        <Label for="munition" class="col-span-2"> Munition </Label>
                        <Input
                          id="munition"
                          class="col-span-4"
                          type="number"
                          v-model="createWeaponDialog.munition"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <DialogFooter>
                    <DialogClose as-child>
                      <Button type="submit" @click="handleAddWeapon()"> Hinzufügen </Button>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Seriennummer</TableHead>
                  <TableHead>Schmauchspuren</TableHead>
                  <TableHead>Zustand</TableHead>
                  <TableHead>Munition</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="weapon in gutachten?.weapons" :key="weapon.id">
                  <TableCell class="font-medium"> {{ weapon.name }} </TableCell>
                  <TableCell class=""> {{ weapon.model }} </TableCell>
                  <TableCell class=""> {{ weapon.serial }} </TableCell>
                  <TableCell class="">
                    <Badge
                      variant="default"
                      class="bg-red-900 hover:bg-red-900 text-white"
                      v-if="weapon.schmauchspuren"
                    >
                      Ja
                    </Badge>
                    <Badge
                      variant="default"
                      class="bg-green-900 hover:bg-green-900 text-white"
                      v-else
                    >
                      Nein
                    </Badge>
                  </TableCell>
                  <TableCell class="">
                    <Badge
                      variant="default"
                      class="bg-red-900 hover:bg-red-900 text-white"
                      v-if="weapon.zustand == 'warm'"
                    >
                      Warm
                    </Badge>
                    <Badge
                      variant="default"
                      class="bg-blue-900 hover:bg-blue-900 text-white"
                      v-else
                    >
                      Kalt
                    </Badge>
                  </TableCell>
                  <TableCell class=""> {{ weapon.munition }} </TableCell>
                  <TableCell class="[--table-padding:0] pl-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal class="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                        <DropdownMenuItem @click="handleEditWeapon(weapon.id)"
                          >Bearbeiten</DropdownMenuItem
                        >
                        <DropdownMenuItem
                          @click="
                            () => {
                              $locally.copyClipboard(
                                weapon.model + ' - ' + weapon.name + ' - Az.: ' + gutachten?.akz
                              );
                            }
                          "
                          >Schmauchspuren kopieren</DropdownMenuItem
                        >
                        <DropdownMenuItem @click="handleRemoveWeapon(weapon.id)"
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

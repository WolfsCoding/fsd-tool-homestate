<script setup lang="ts">
const isOpen = ref(true);
</script>

<template>
    <div class="w-screen h-screen top-0 left-0 absolute flex justify-center items-center" v-if="isOpen">
      <div class="w-2/5 bg-[#0A0A0A] m-8 rounded-lg shadow-ds-card">
          <div class="w-full p-6 border-b-ds-gray-100 border-b">
          <h1 class='text-xl font-bold'>Neues Update</h1>
          <p class='text-sm mt-2 mb-6'>
            In den letzten Wochen habe ich intensiv an eine Rework von diesem Homestate Tool gearbeitet.
            Dies habe ich gemacht um in Zukunft besser und schneller Updates zu erstellen.
            Aktuell behinhaltet die neue Seite noch keine großen neuen Features.
            Doch ich bin derzeit dran neue dinge einzubauen und bin über euer Feedback gespannt.
            Ich hoffe euch gefällt die neue Seite.
            Solltet ihr Fehler finden schreib diese mir gerne auf Discord "@WolfsCoding".
            Die Seite erreicht ihr
          </p>
            
            <h1 class='text-xl font-bold text-epa mb-6'><a href="https://hs-tool.wolfscoding.me">Klick hier um zur neuen Seite zu gelangen</a></h1>
            
            
            <Button size="sm" variant="outline" @click="isOpen = false">Schließen</Button>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>
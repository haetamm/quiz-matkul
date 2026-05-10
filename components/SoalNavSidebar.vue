<template>
  <!-- Toggle button mobile -->
  <button
    class="fixed bottom-6 left-6 z-50 lg:hidden bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl"
    @click="drawerOpen = !drawerOpen"
  >
    {{ drawerOpen ? "✕" : "☰" }}
  </button>

  <!-- Overlay mobile -->
  <div
    v-if="drawerOpen"
    class="fixed inset-0 bg-black/40 z-30 lg:hidden"
    @click="drawerOpen = false"
  />

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed left-0 bg-white border-r border-gray-200 z-40 transition-transform duration-300 flex flex-col',
      'w-64',
      'top-0 h-full lg:top-14 lg:h-[calc(100vh-56px)]',
      'lg:sticky lg:translate-x-0',
      drawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Header sidebar (mobile only) -->
    <div
      class="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100"
    >
      <span class="font-semibold text-gray-700 text-sm">Nomor Soal</span>
      <button
        @click="drawerOpen = false"
        class="text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>

    <!-- Label desktop -->
    <div class="hidden lg:flex items-center px-4 py-3 border-b border-gray-100">
      <span class="font-semibold text-gray-700 text-sm">Nomor Soal</span>
    </div>

    <!-- Grid nomor soal -->
    <div class="flex-1 overflow-y-auto p-3">
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="(soal, i) in soalList"
          :key="soal.id"
          @click="pilih(i)"
          :title="`Soal ${i + 1}`"
          :class="[
            'h-10 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center',
            i === indexAktif
              ? 'bg-blue-600 text-white'
              : jawabanUser[soal.id]
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ i + 1 }}
        </button>
      </div>
    </div>

    <!-- Legend -->
    <div class="p-3 border-t border-gray-100 space-y-1">
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <span class="w-4 h-4 rounded bg-blue-600 inline-block"></span> Aktif
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <span class="w-4 h-4 rounded bg-green-100 inline-block"></span> Dijawab
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <span class="w-4 h-4 rounded bg-gray-100 inline-block"></span> Belum
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Soal, JawabanUser } from "~/types";

defineProps<{
  soalList: Soal[];
  jawabanUser: JawabanUser;
  indexAktif: number;
}>();
const emit = defineEmits(["pilih"]);

const drawerOpen = ref(false);

const pilih = (i: number) => {
  emit("pilih", i);
  drawerOpen.value = false;
};
</script>

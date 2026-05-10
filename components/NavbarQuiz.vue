<template>
  <nav
    class="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0"
  >
    <div class="flex items-center gap-3">
      <NuxtLink to="/" class="text-gray-400 hover:text-gray-600">←</NuxtLink>
      <h1 class="font-semibold text-gray-800">{{ namaMatkul }}</h1>
    </div>

    <div class="flex items-center gap-4">
      <!-- Timer (mode ujian) -->
      <span
        v-if="mode === 'ujian'"
        :class="[
          'font-mono font-bold text-lg',
          sisaDetik < 60 ? 'text-red-500' : 'text-gray-700',
        ]"
      >
        ⏱ {{ formatWaktu }}
      </span>

      <!-- Toggle mode -->
      <div
        class="flex rounded-xl overflow-hidden border border-gray-200 text-sm"
      >
        <button
          @click="gantiMode('latihan')"
          :class="[
            'px-4 py-2 font-medium transition',
            mode === 'latihan'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-50',
          ]"
        >
          ✏️ Latihan
        </button>
        <button
          @click="gantiMode('ujian')"
          :class="[
            'px-4 py-2 font-medium transition',
            mode === 'ujian'
              ? 'bg-red-500 text-white'
              : 'text-gray-600 hover:bg-gray-50',
          ]"
        >
          🎯 Ujian
        </button>
      </div>

      <!-- Selesai (mode ujian) -->
      <button
        v-if="mode === 'ujian'"
        @click="$emit('selesai')"
        class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
      >
        Selesai
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ namaMatkul: string }>();

const emit = defineEmits(["selesai", "gantiModeUjian"]);

const { mode } = useQuiz();
const { formatWaktu, sisaDetik } = useTimer();

const gantiMode = (m: "latihan" | "ujian") => {
  mode.value = m;
  if (m === "ujian") emit("gantiModeUjian");
};
</script>

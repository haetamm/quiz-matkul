<template>
  <nav
    class="h-14 bg-white border-b border-gray-200 px-3 sm:px-6 flex items-center justify-between shrink-0"
  >
    <!-- Left Section -->
    <div class="flex items-center gap-2 sm:gap-3 min-w-0">
      <NuxtLink
        to="/"
        class="text-gray-400 hover:text-gray-600 transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 shrink-0"
        title="Kembali"
      >
        <svg
          class="w-5 h-5 sm:w-[18px] sm:h-[18px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </NuxtLink>

      <!-- Judul Matkul -->
      <h1
        class="font-semibold text-gray-800 truncate hidden sm:block max-w-[200px] md:max-w-none"
      >
        {{ namaMatkul }}
      </h1>

      <!-- Judul pendek untuk mobile -->
      <span
        class="font-semibold text-gray-800 truncate block sm:hidden max-w-[120px] text-sm"
      >
        {{ namaMatkulSingkat }}
      </span>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-1 sm:gap-4">
      <!-- Timer (mode ujian) -->
      <span
        v-if="mode === 'ujian'"
        :class="[
          'font-mono font-bold text-sm sm:text-lg whitespace-nowrap',
          sisaDetik < 60 ? 'text-red-500 animate-pulse' : 'text-gray-700',
        ]"
      >
        <span class="hidden sm:inline">⏱</span>
        <span class="sm:hidden">⏱</span>
        {{ formatWaktu }}
      </span>

      <!-- Toggle mode -->
      <div
        class="flex rounded-xl overflow-hidden border border-gray-200 text-xs sm:text-sm"
      >
        <button
          @click="gantiMode('latihan')"
          :class="[
            'px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition whitespace-nowrap',
            mode === 'latihan'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-50',
          ]"
        >
          <span class="sm:hidden">✏️</span>
          <span class="hidden sm:inline">✏️ Latihan</span>
        </button>
        <button
          @click="gantiMode('ujian')"
          :class="[
            'px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition whitespace-nowrap',
            mode === 'ujian'
              ? 'bg-red-500 text-white'
              : 'text-gray-600 hover:bg-gray-50',
          ]"
        >
          <span class="sm:hidden">🎯</span>
          <span class="hidden sm:inline">🎯 Ujian</span>
        </button>
      </div>

      <!-- Selesai (mode ujian) -->
      <button
        v-if="mode === 'ujian'"
        @click="$emit('selesai')"
        class="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors whitespace-nowrap"
      >
        <span class="hidden sm:inline">Selesai</span>
        <span class="sm:hidden">✓</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ namaMatkul: string }>();

const emit = defineEmits(["selesai", "gantiModeUjian"]);

const { mode } = useQuiz();
const { formatWaktu, sisaDetik } = useTimer();

const namaMatkulSingkat = computed(() => {
  if (props.namaMatkul.length <= 15) return props.namaMatkul;

  const words = props.namaMatkul.split(" ");
  if (words.length > 1) {
    return words[0];
  }

  return props.namaMatkul.substring(0, 12) + "...";
});

const gantiMode = (m: "latihan" | "ujian") => {
  mode.value = m;
  if (m === "ujian") emit("gantiModeUjian");
};
</script>

<template>
  <div
    class="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
  >
    <!-- Navbar -->
    <NavbarQuiz
      :nama-matkul="namaMatkul"
      @selesai="selesaiUjian"
      @ganti-mode-ujian="showModalTimer = true"
    />

    <div class="flex flex-1 min-h-0">
      <!-- Sidebar kiri: nomor soal -->
      <SoalNavSidebar
        :soal-list="soalList"
        :jawaban-user="jawabanUser"
        :index-aktif="indexAktif"
        @pilih="navigasi"
      />

      <!-- Konten kanan: soal aktif -->
      <main ref="mainContentRef" class="flex-1 overflow-y-auto p-4 md:p-6">
        <SoalCard
          v-if="soalAktif"
          :soal="soalAktif"
          :jawaban-user="jawabanUser[soalAktif.id]"
          :sudah-diperiksa="sudahDiperiksa[soalAktif.id]"
          :mode="mode"
          @pilih-jawaban="(opsi) => pilihJawaban(soalAktif.id, opsi)"
          @periksa="periksaJawaban(soalAktif.id)"
        />

        <!-- Navigasi Next/Prev -->
        <div class="flex justify-between mt-6">
          <button
            @click="navigasi(indexAktif - 1)"
            :disabled="indexAktif === 0"
            class="px-4 py-2 bg-white border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
          >
            ← Sebelumnya
          </button>

          <button
            v-if="mode === 'ujian' && indexAktif === soalList.length - 1"
            @click="selesaiUjian"
            class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Selesai & Kumpulkan
          </button>

          <button
            @click="navigasi(indexAktif + 1)"
            :disabled="indexAktif === soalList.length - 1"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40 hover:bg-blue-700 transition"
          >
            Selanjutnya →
          </button>
        </div>
      </main>
    </div>

    <!-- Modal set timer -->
    <ModalSetTimer
      v-if="showModalTimer"
      @konfirmasi="mulaiUjian"
      @batal="batalModeUjian"
    />
  </div>
</template>

<script setup lang="ts">
import type { Matakuliah, Soal } from "~/types";

const route = useRoute();
const router = useRouter();

const {
  soalList,
  jawabanUser,
  indexAktif,
  mode,
  sudahDiperiksa,
  soalAktif,
  pilihJawaban,
  periksaJawaban,
  navigasi,
  hitungHasil,
  resetQuiz,
} = useQuiz();

const { mulai, berhenti, sisaDetik } = useTimer();

const namaMatkul = ref("");
const showModalTimer = ref(false);
const mainContentRef = ref<HTMLElement | null>(null);

watch(indexAktif, () => {
  nextTick(() => {
    if (mainContentRef.value) {
      mainContentRef.value.scrollTop = 0; // langsung scroll ke atas
    }
  });
});

onMounted(async () => {
  const daftar: Matakuliah[] = await $fetch("/data/matakuliah.json");
  const matkul = daftar.find((m) => m.id === route.params.id);
  if (!matkul) return router.push("/");

  namaMatkul.value = matkul.nama;
  soalList.value = await $fetch<Soal[]>(`/data/${matkul.file}`);
  resetQuiz();
});

watch(sisaDetik, (val) => {
  if (val === 0 && mode.value === "ujian") selesaiUjian();
});

const mulaiUjian = (menit: number) => {
  showModalTimer.value = false;
  mulai(menit);
};

const batalModeUjian = () => {
  showModalTimer.value = false;
  mode.value = "latihan";
};

const selesaiUjian = () => {
  berhenti();
  const hasil = hitungHasil();
  sessionStorage.setItem("hasilQuiz", JSON.stringify(hasil));
  router.push(`/result/${route.params.id}`);
};
</script>

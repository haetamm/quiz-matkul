import { useState } from "nuxt/app";
import { computed } from "vue";
import type { HasilQuiz, JawabanUser, ModeQuiz, Soal } from "../types";

export const useQuiz = () => {
  const soalList = useState<Soal[]>("soalList", () => []);
  const jawabanUser = useState<JawabanUser>("jawabanUser", () => ({}));
  const indexAktif = useState<number>("indexAktif", () => 0);
  const mode = useState<ModeQuiz>("mode", () => "latihan");
  const sudahDiperiksa = useState<Record<number, boolean>>(
    "sudahDiperiksa",
    () => ({}),
  );

  const soalAktif = computed(() => soalList.value[indexAktif.value]);

  const pilihJawaban = (soalId: number, opsi: "a" | "b" | "c" | "d" | "e") => {
    jawabanUser.value[soalId] = opsi;
  };

  const periksaJawaban = (soalId: number) => {
    sudahDiperiksa.value[soalId] = true;
  };

  const navigasi = (index: number) => {
    if (index >= 0 && index < soalList.value.length) {
      indexAktif.value = index;
    }
  };

  const hitungHasil = (): HasilQuiz => {
    const detailJawaban = soalList.value.map((soal) => {
      const jwb = jawabanUser.value[soal.id] ?? null;
      return {
        soal,
        jawabanUser: jwb,
        benar: jwb === soal.jawaban,
      };
    });

    const benar = detailJawaban.filter((d) => d.benar).length;
    const belumDijawab = detailJawaban.filter(
      (d) => d.jawabanUser === null,
    ).length;

    return {
      total: soalList.value.length,
      benar,
      salah: soalList.value.length - benar - belumDijawab,
      belumDijawab,
      nilaiPersen: Math.round((benar / soalList.value.length) * 100),
      detailJawaban,
    };
  };

  const resetQuiz = () => {
    jawabanUser.value = {};
    indexAktif.value = 0;
    sudahDiperiksa.value = {};
  };

  return {
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
  };
};

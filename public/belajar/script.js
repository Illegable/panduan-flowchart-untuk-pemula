/* =========================================================
   Belajar Flowchart dari Nol — script.js
   ========================================================= */

/* ---------- Pembuat simbol flowchart ---------- */
const S = (x, id) => ({ t: "start", x, id });
const E = (x, id) => ({ t: "end", x, id });
const P = (x, id) => ({ t: "process", x, id });
const IO = (x, id) => ({ t: "io", x, id });
// D = Decision: pertanyaan + jalur YA + jalur TIDAK
const D = (x, yes, no, id, noFirst) => ({ t: "decision", x, yes, no, id, noFirst });

function node(n) {
  return `<div class="node ${n.t}" ${n.id ? `data-id="${n.id}"` : ""}><span>${n.x}</span></div>`;
}
function renderItem(it) {
  if (it.t !== "decision") return node(it);
  const yes = `<div class="path"><span class="lab yes">YA</span><div class="arrow"></div>${flow(it.yes, true)}</div>`;
  const no = `<div class="path"><span class="lab no">TIDAK</span><div class="arrow"></div>${flow(it.no, true)}</div>`;
  if (!it.yes && !it.no) return node(it);
  return `<div class="branch">${node(it)}<div class="arrow" style="height:14px"></div>
    <div class="paths">${it.noFirst ? no + yes : yes + no}</div></div>`;
}
function flow(items, inner) {
  const body = (items || []).map((it, i) => (i ? '<div class="arrow"></div>' : "") + renderItem(it)).join("");
  return inner ? `<div class="flow">${body}</div>` : `<div class="diagram"><div class="flow">${body}</div></div>`;
}
const chain = (arr) => `<div class="chain">${arr.map((a, i) => (i ? "<i>↓</i>" : "") + `<span>${a}</span>`).join("")}</div>`;
const mini = (t) => `<span class="mini ${t}"></span>`;
const big = (t, x) => `<div class="flow">${node({ t, x })}</div>`;

/* ---------- Isi materi ---------- */
const lessons = [
  /* 01 */
  {
    title: "Mulai dari Sini",
    html: () => `
    <p class="lead">Selamat datang! Di sini kamu akan belajar flowchart pelan-pelan, dari nol. Tidak ada coding, tidak ada soal, tidak ada nilai.</p>
    <div class="card key"><b>Tujuan akhir kita:</b> memahami gambaran alur sebuah aplikasi pembayaran siswa SMP.</div>
    <h3>Jalan yang akan kita tempuh</h3>
    ${chain(["🧩 Ada masalah", "📝 Kita tulis langkah-langkahnya", "🗺️ Kita buat gambaran alurnya", "🔷 Gambaran itu disebut flowchart", "📱 Flowchart menjadi rancangan aplikasi"])}
    <div class="card tip">Sebelum membuat aplikasi pembayaran, kita perlu tahu dulu <b>apa saja yang harus dilakukan</b> dan <b>urutannya</b>. Flowchart membantu kita melihat itu dengan jelas.</div>
    <p>Kita akan mengenal simbol <b>satu per satu</b>. Silakan klik <b>Berikutnya</b> kapan pun kamu siap.</p>`,
  },
  /* 02 */
  {
    title: "Apa Itu Flowchart?",
    html: () => `
    <p class="lead">Hampir semua kegiatan punya urutan langkah. Kamu sudah sering melakukannya tanpa sadar.</p>
    <h3>Contoh: membuat teh</h3>
    ${chain(["Mulai", "Panaskan air", "Masukkan teh", "Tambahkan gula", "Selesai"])}
    <div class="card key"><b>Flowchart</b> adalah cara <b>menggambar</b> langkah-langkah seperti di atas memakai <b>bentuk-bentuk (simbol)</b> dan <b>panah</b>.</div>
    <h3>Langkah membuat teh, dalam bentuk flowchart</h3>
    ${flow([S("Mulai"), P("Panaskan air"), P("Masukkan teh"), P("Tambahkan gula"), E("Selesai")])}
    <p>Isinya sama persis, hanya saja sekarang setiap langkah punya bentuk, dan panah menunjukkan urutannya. Arti tiap bentuk akan kita pelajari satu per satu.</p>`,
  },
  /* 03 */
  {
    title: "Start / End",
    html: () => `
    <p class="lead">Simbol ini sudah kamu kenal. Kita jadikan pijakan untuk memahami simbol berikutnya.</p>
    <div class="card symbol-show">
      ${big("start", "START")}
      <dl class="facts">
        <dt>Nama</dt><dd>Start / End (Mulai / Selesai)</dd>
        <dt>Bentuk</dt><dd>Lonjong, seperti kapsul</dd>
        <dt>Fungsi</dt><dd>Menandai awal dan akhir alur</dd>
        <dt>Kapan dipakai</dt><dd>Selalu: satu di paling atas, dan di setiap akhir alur</dd>
      </dl>
    </div>
    <h3>Contoh sederhana</h3>
    ${flow([S("START"), { t: "process", x: "Melakukan sesuatu" }, E("END")])}
    <div class="grid">
      <div class="card key"><b>Start</b> = tempat proses <b>dimulai</b>.</div>
      <div class="card key"><b>End</b> = tempat proses <b>selesai</b>.</div>
    </div>
    <p>Kotak di tengah akan kita bahas di materi berikutnya. Untuk sekarang, cukup tahu bahwa "ada sesuatu yang dilakukan" di antara mulai dan selesai.</p>`,
  },
  /* 04 */
  {
    title: "Process",
    html: () => `
    <p class="lead">Setelah sesuatu dimulai, biasanya kita <b>melakukan suatu tindakan</b>.</p>
    <h3>Contoh tindakan</h3>
    <ul class="chips"><li>Mengambil buku</li><li>Membuka pintu</li><li>Menyimpan pembayaran</li><li>Mencetak bukti</li></ul>
    <div class="card symbol-show">
      ${big("process", "Process")}
      <div><b>Simbol Process</b> berbentuk <b>kotak persegi panjang</b>.<br/>Artinya: <b>"lakukan sesuatu"</b>. Setiap tindakan digambar dengan kotak ini.</div>
    </div>
    ${flow([S("START"), P("[Process]"), E("END")])}
    <h3>Contoh sehari-hari</h3>
    ${flow([S("START"), P("Ambil buku"), P("Buka halaman 10"), E("END")])}
    <h3>Contoh di aplikasi pembayaran siswa</h3>
    ${flow([S("START"), P("Pilih siswa"), E("END")])}
    <div class="card tip">"Pilih siswa" adalah sebuah <b>tindakan</b> yang dilakukan petugas. Karena itu digambar dengan kotak Process.</div>`,
  },
  /* 05 */
  {
    title: "Input / Output",
    html: () => `
    <p class="lead">Dua kata ini terdengar teknis, padahal artinya sederhana.</p>
    <div class="grid">
      <div class="card"><h3 style="margin-top:0">📥 Input</h3><p>= <b>sesuatu yang dimasukkan</b>.</p><ul class="chips"><li>Nama siswa</li><li>Nomor induk</li><li>Nominal pembayaran</li></ul></div>
      <div class="card"><h3 style="margin-top:0">📤 Output</h3><p>= <b>sesuatu yang dihasilkan atau ditampilkan</b>.</p><ul class="chips"><li>Bukti pembayaran</li><li>Status pembayaran</li><li>Informasi siswa</li></ul></div>
    </div>
    <div class="card symbol-show">
      ${big("io", "Input / Output")}
      <div><b>Simbol Input/Output</b> berbentuk <b>jajar genjang</b> (kotak miring).<br/>Dipakai ketika ada data yang <b>masuk</b> atau hasil yang <b>keluar</b>.</div>
    </div>
    <h3>Bandingkan dengan Process</h3>
    <div class="compare">
      <div class="col">${node(IO("Masukkan nominal pembayaran"))}<p>Input: data masuk</p></div>
      <span>→</span>
      <div class="col">${node(P("Simpan pembayaran"))}<p>Process: melakukan tindakan</p></div>
      <span>→</span>
      <div class="col">${node(IO("Tampilkan bukti pembayaran"))}<p>Output: hasil keluar</p></div>
    </div>
    <div class="card tip">Cara mudah mengingat: <b>miring</b> = ada yang masuk/keluar. <b>Kotak tegak</b> = ada yang dikerjakan.</div>`,
  },
  /* 06 */
  {
    title: "Decision",
    html: () => `
    <p class="lead">Kadang kita harus <b>menjawab sebuah pertanyaan</b> sebelum tahu langkah berikutnya.</p>
    <div class="card"><b>Apakah hujan?</b><br/><span class="pill-yes">YA</span> → Bawa payung.<br/><span class="pill-no">TIDAK</span> → Tidak membawa payung.</div>
    <div class="card symbol-show">
      ${big("decision", "Pertanyaan?")}
      <div><b>Simbol Decision</b> (keputusan) berbentuk <b>belah ketupat</b>.<br/>Isinya selalu <b>pertanyaan</b>. Jawabannya menentukan kita lewat jalan yang mana.</div>
    </div>
    ${flow([D("Apakah hujan?", [P("Bawa payung")], [P("Tidak membawa payung")])])}
    <h3>Di aplikasi pembayaran</h3>
    ${flow([D("Apakah data pembayaran benar?", [P("Simpan pembayaran")], [P("Perbaiki data")])])}
    <div class="card key">Decision membuat alur <b>terbagi menjadi beberapa jalan</b>, tergantung jawaban pertanyaannya (biasanya YA atau TIDAK).</div>`,
  },
  /* 07 */
  {
    title: "Flowline / Panah",
    html: () => `
    <p class="lead">Simbol saja belum cukup. Kita juga perlu tahu <b>urutannya</b>: setelah ini, lalu ke mana?</p>
    <div class="card symbol-show">
      <span class="mini arrow-m" style="width:80px"></span>
      <div><b>Flowline (panah)</b> menunjukkan <b>ke mana proses berikutnya berjalan</b>.</div>
    </div>
    <div class="walk-wrap">
      ${flow([S("START", "a1"), P("Process", "a2"), IO("Input", "a3"), D("Decision", null, null, "a4"), E("END", "a5")])}
      <div class="card walk-note"><b>Cara membaca arah:</b><p>Mulai dari atas, ikuti ujung panah ke bawah, satu simbol demi satu simbol.</p>
        <button class="btn small" id="arrowDemo">▶ Tunjukkan arahnya</button></div>
    </div>
    <div class="card tip">Tanpa panah, kita tidak tahu simbol mana yang dikerjakan lebih dulu.</div>`,
    after: () => {
      document.getElementById("arrowDemo").onclick = () => {
        const ids = ["a1", "a2", "a3", "a4", "a5"];
        ids.forEach((id, i) => setTimeout(() => highlight(ids, id), i * 700));
        setTimeout(() => highlight(ids, null), ids.length * 700 + 300);
      };
    },
  },
  /* 08 */
  {
    title: "Menggabungkan Simbol",
    html: () => `
    <p class="lead">Semua simbol dasar sudah kita kenal. Sekarang kita gabungkan dalam satu alur: membeli makanan.</p>
    ${flow([S("START"), IO("Masukkan uang"), P("Pilih makanan"),
      D("Apakah uang cukup?", [P("Beli makanan"), E("END")], [P("Tambah uang"), E("END")])])}
    <h3>Penjelasan setiap simbol</h3>
    <ul class="explain">
      <li>${mini("start")}<div><b>START</b> — alur dimulai.</div></li>
      <li>${mini("io")}<div><b>Masukkan uang</b> — ada sesuatu yang <b>dimasukkan</b> (input).</div></li>
      <li>${mini("process")}<div><b>Pilih makanan</b> — sebuah <b>tindakan</b>.</div></li>
      <li>${mini("decision")}<div><b>Apakah uang cukup?</b> — sebuah <b>pertanyaan</b> yang membagi jalan.</div></li>
      <li>${mini("process")}<div><b>Beli makanan</b> (jika YA) atau <b>Tambah uang</b> (jika TIDAK) — tindakan sesuai jawaban.</div></li>
      <li>${mini("start")}<div><b>END</b> — setiap jalan berakhir di End.</div></li>
      <li>${mini("arrow-m")}<div><b>Panah</b> — menghubungkan semuanya sesuai urutan.</div></li>
    </ul>`,
  },
  /* 09 */
  {
    title: "Cara Membaca Flowchart",
    html: () => `
    <p class="lead">Membaca flowchart cukup dengan 6 aturan sederhana:</p>
    <ol class="card" style="padding-left:40px">
      <li>Cari <b>Start</b>.</li><li>Ikuti <b>panah</b>.</li><li>Baca isi setiap simbol.</li>
      <li>Jika bertemu <b>Decision</b>, perhatikan pertanyaannya.</li><li>Ikuti jalur yang sesuai jawabannya.</li><li>Berhenti saat sampai di <b>End</b>.</li>
    </ol>
    <h3>Ayo baca bersama</h3>
    <div class="walk-wrap">
      ${flow([S("START", "r1"), IO("Masukkan nominal", "r2"),
        D("Apakah nominal sesuai?", [P("Simpan pembayaran", "r4"), IO("Tampilkan bukti", "r5"), E("END", "r6")],
          [P("Minta nominal ulang", "r7"), E("END", "r8")], "r3")])}
      <div class="card walk-note">
        <div class="step-no" id="wNo"></div><p id="wText"></p>
        <div class="walk-btns">
          <button class="btn small ghost" id="wReset">↺ Ulangi</button>
          <button class="btn small" id="wNext">Langkah Berikutnya →</button>
        </div>
      </div>
    </div>`,
    after: () => {
      const ids = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];
      const steps = [
        ["r1", "Aturan 1: cari START. Di sinilah kita mulai membaca."],
        ["r2", "Ikuti panah ke bawah. Bentuk miring: petugas memasukkan nominal (input)."],
        ["r3", "Ketemu belah ketupat (Decision). Ada pertanyaan: apakah nominalnya sesuai?"],
        ["r4", "Misalkan jawabannya YA. Kita ikuti jalur YA: simpan pembayaran."],
        ["r5", "Lanjut ke bawah: bukti pembayaran ditampilkan (output)."],
        ["r6", "Sampai di END. Selesai membaca jalur YA."],
        ["r7", "Bagaimana jika jawabannya TIDAK? Kita ikuti jalur TIDAK: minta nominal ulang."],
        ["r8", "Jalur TIDAK juga berakhir di END. Sekarang kamu sudah membaca seluruh flowchart! 🎉"],
      ];
      let i = -1;
      const show = () => {
        if (i < 0) { highlight(ids, null); wNo.textContent = "Siap?"; wText.textContent = "Tekan “Langkah Berikutnya” untuk mulai membaca."; }
        else { highlight(ids, steps[i][0]); wNo.textContent = `Langkah ${i + 1} dari ${steps.length}`; wText.textContent = steps[i][1]; }
        wNext.disabled = i >= steps.length - 1;
      };
      const wNo = document.getElementById("wNo"), wText = document.getElementById("wText"), wNext = document.getElementById("wNext");
      wNext.onclick = () => { i++; show(); };
      document.getElementById("wReset").onclick = () => { i = -1; show(); };
      show();
    },
  },
  /* 10 */
  {
    title: "Contoh Flowchart Sederhana",
    html: () => `
    <p class="lead">Tiga contoh, dari yang paling mudah ke yang sedikit lebih panjang.</p>
    <h3>Contoh 1 — Berangkat sekolah</h3>
    ${flow([S("START"), P("Bangun tidur"), P("Mandi"), P("Pakai seragam"), E("END")])}
    <p>Hanya Start, Process, dan End. Lurus dari atas ke bawah.</p>
    <h3>Contoh 2 — Membeli minuman di kantin</h3>
    ${flow([S("START"), P("Pilih minuman"), IO("Berikan uang"), D("Apakah uang cukup?", [IO("Terima minuman"), E("END")], [P("Batal membeli"), E("END")])])}
    <p>Mulai ada Input/Output dan sebuah pertanyaan (Decision).</p>
    <h3>Contoh 3 — Pembayaran sederhana</h3>
    ${flow([S("START"), IO("Masukkan nama siswa"), IO("Masukkan nominal"), P("Simpan pembayaran"), IO("Tampilkan bukti"), E("END")])}
    <p>Inilah bibit dari aplikasi pembayaran yang akan kita bahas berikutnya.</p>`,
  },
  /* 11 */
  {
    title: "Studi Kasus Pembayaran Siswa",
    html: () => `
    <p class="lead">Sekarang kita fokus ke aplikasi pembayaran siswa SMP.</p>
    <div class="card key"><b>Cerita:</b> Petugas sekolah ingin menerima pembayaran dari seorang siswa. Apa saja yang perlu dilakukan?</div>
    <h3>Langkah 1 — Tulis daftar langkahnya</h3>
    <ol class="card" style="padding-left:40px">
      <li>Menentukan siswa.</li><li>Menentukan jenis pembayaran.</li><li>Memasukkan nominal.</li>
      <li>Memeriksa data.</li><li>Menyimpan pembayaran.</li><li>Menampilkan bukti pembayaran.</li>
    </ol>
    <h3>Langkah 2 — Tentukan simbol untuk setiap langkah</h3>
    <ul class="explain">
      <li>${mini("process")}<div>Menentukan siswa → <b>tindakan</b> memilih → Process</div></li>
      <li>${mini("process")}<div>Menentukan jenis pembayaran → <b>tindakan</b> memilih → Process</div></li>
      <li>${mini("io")}<div>Memasukkan nominal → ada data <b>masuk</b> → Input</div></li>
      <li>${mini("decision")}<div>Memeriksa data → ada <b>pertanyaan</b> "benar atau tidak?" → Decision</div></li>
      <li>${mini("process")}<div>Menyimpan pembayaran → <b>tindakan</b> → Process</div></li>
      <li>${mini("io")}<div>Menampilkan bukti → ada hasil <b>keluar</b> → Output</div></li>
    </ul>
    <h3>Langkah 3 — Jadikan flowchart</h3>
    ${flow([S("START"), P("Pilih siswa"), P("Pilih jenis pembayaran"), IO("Masukkan nominal"),
      D("Apakah data benar?", [P("Simpan pembayaran"), IO("Tampilkan bukti"), E("END")], [P("Perbaiki data")])])}
    <div class="card tip">Dari <b>daftar tulisan</b> menjadi <b>gambar alur</b>: isinya sama, tapi sekarang terlihat jelas mana tindakan, mana data masuk/keluar, dan di mana harus memilih jalan.</div>`,
  },
  /* 12 */
  {
    title: "Flowchart Aplikasi Pembayaran Siswa",
    html: () => `
    <p class="lead">Ini versi yang lebih lengkap, termasuk login petugas. Tekan tombol untuk membahasnya bagian demi bagian.</p>
    <div class="walk-wrap">
      ${flow([S("START", "p1"), IO("Login", "p2"),
        D("Apakah login benar?", [P("Buka Dashboard", "p4")], [P("Login ulang", "p3b")], "p3", true),
        P("Pilih siswa", "p5"), P("Pilih jenis pembayaran", "p6"), IO("Masukkan nominal", "p7"), P("Periksa data", "p8"),
        D("Apakah data benar?", [P("Simpan pembayaran", "p10"), IO("Tampilkan bukti", "p11"), E("END", "p12")], [P("Perbaiki data", "p9b")], "p9", true)])}
      <div class="card walk-note">
        <div class="step-no" id="aNo"></div>
        <div id="aBody"></div>
        <div class="walk-btns">
          <button class="btn small ghost" id="aPrev">←</button>
          <button class="btn small" id="aNext">Bagian Berikutnya →</button>
        </div>
      </div>
    </div>
    <div class="card key">Ingat: flowchart ini menggambarkan <b>alur proses</b>, bukan kode program. Ini seperti peta jalan sebelum aplikasi dibuat.</div>`,
    after: () => {
      const ids = ["p1", "p2", "p3", "p3b", "p4", "p5", "p6", "p7", "p8", "p9", "p9b", "p10", "p11", "p12"];
      const parts = [
        ["p1", "start", "Start", "Menandai awal.", "Petugas membuka aplikasi."],
        ["p2", "io", "Input", "Petugas memasukkan nama pengguna dan kata sandi.", "Data masuk ke aplikasi."],
        ["p3", "decision", "Decision", "Ada pertanyaan: benar atau salah?", "Aplikasi memeriksa apakah petugas boleh masuk."],
        ["p3b", "process", "Process", "Tindakan jika jawabannya TIDAK.", "Petugas harus mencoba login lagi."],
        ["p4", "process", "Process", "Tindakan jika jawabannya YA.", "Petugas masuk ke halaman utama (dashboard)."],
        ["p5", "process", "Process", "Tindakan memilih.", "Petugas memilih siswa yang akan membayar."],
        ["p6", "process", "Process", "Tindakan memilih.", "Misalnya: SPP, uang buku, atau study tour."],
        ["p7", "io", "Input", "Ada angka yang dimasukkan.", "Petugas mengetik jumlah uang yang dibayar."],
        ["p8", "process", "Process", "Tindakan memeriksa.", "Petugas/aplikasi mengecek kembali data yang diisi."],
        ["p9", "decision", "Decision", "Pertanyaan yang membagi jalan.", "Apakah siswa, jenis, dan nominal sudah benar?"],
        ["p9b", "process", "Process", "Tindakan jika TIDAK.", "Data diperbaiki dulu sebelum disimpan."],
        ["p10", "process", "Process", "Tindakan jika YA.", "Pembayaran dicatat oleh aplikasi."],
        ["p11", "io", "Output", "Ada hasil yang ditampilkan.", "Bukti pembayaran muncul dan bisa dicetak."],
        ["p12", "start", "End", "Menandai akhir.", "Satu pembayaran selesai diproses."],
      ];
      let i = 0;
      const aNo = document.getElementById("aNo"), aBody = document.getElementById("aBody");
      const aPrev = document.getElementById("aPrev"), aNext = document.getElementById("aNext");
      const show = () => {
        const [id, t, name, why, meaning] = parts[i];
        highlight(ids, id);
        aNo.textContent = `Bagian ${i + 1} dari ${parts.length}`;
        aBody.innerHTML = `<p style="display:flex;gap:10px;align-items:center">${mini(t)} <b>${name}</b></p>
          <p><b>Mengapa simbol ini?</b><br/>${why}</p><p><b>Artinya di aplikasi:</b><br/>${meaning}</p>`;
        aPrev.disabled = i === 0; aNext.disabled = i === parts.length - 1;
      };
      aPrev.onclick = () => { i--; show(); };
      aNext.onclick = () => { i++; show(); };
      show();
    },
  },
  /* 13 */
  {
    title: "Ringkasan",
    html: () => `
    <p class="lead">Selamat! Kamu sudah menempuh semua materi. Ini rangkumannya.</p>
    <table class="sum">
      <tr><th>Simbol</th><th>Nama</th><th>Arti sederhana</th><th>Contoh</th></tr>
      <tr><td>${mini("start")}</td><td>Start/End</td><td>Mulai atau selesai</td><td>Mulai aplikasi</td></tr>
      <tr><td>${mini("process")}</td><td>Process</td><td>Melakukan sesuatu</td><td>Simpan pembayaran</td></tr>
      <tr><td>${mini("io")}</td><td>Input/Output</td><td>Data masuk atau hasil keluar</td><td>Masukkan nominal</td></tr>
      <tr><td>${mini("decision")}</td><td>Decision</td><td>Pertanyaan yang menentukan jalan</td><td>Data benar?</td></tr>
      <tr><td>${mini("arrow-m")}</td><td>Flowline</td><td>Menunjukkan arah</td><td>Lanjut ke langkah berikutnya</td></tr>
    </table>
    <h3>Urutan yang sudah kamu pelajari</h3>
    ${chain(["START / END", "PROCESS", "INPUT / OUTPUT", "DECISION", "FLOWLINE", "FLOWCHART LENGKAP ✨"])}
    <div class="card tip">Sekarang kamu bisa membaca flowchart aplikasi pembayaran siswa: cari Start, ikuti panah, baca tiap simbol, pilih jalur di Decision, dan berhenti di End.</div>`,
  },
];

/* ---------- Highlight ---------- */
function highlight(ids, active) {
  ids.forEach((id) => {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (!el) return;
    el.classList.toggle("hl", id === active);
    el.classList.toggle("dim", active !== null && id !== active);
  });
  if (active) {
    const el = document.querySelector(`[data-id="${active}"]`);
    if (el && window.innerWidth <= 860) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ---------- Navigasi, progres, localStorage ---------- */
const KEY_PAGE = "flowchart-last-page";
const KEY_SEEN = "flowchart-seen";
let current = Math.min(Math.max(parseInt(localStorage.getItem(KEY_PAGE) || "0", 10) || 0, 0), lessons.length - 1);
let seen = new Set(JSON.parse(localStorage.getItem(KEY_SEEN) || "[]"));

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");

function buildMenu() {
  $("menu").innerHTML = lessons
    .map((l, i) => `<li data-i="${i}"><button><span class="num">${pad(i + 1)}</span>${l.title}</button></li>`)
    .join("");
  $("menu").querySelectorAll("li").forEach((li) => {
    li.querySelector("button").onclick = () => { go(+li.dataset.i); closeMenu(); };
  });
}

function go(i) {
  current = i;
  seen.add(i);
  localStorage.setItem(KEY_PAGE, i);
  localStorage.setItem(KEY_SEEN, JSON.stringify([...seen]));
  const l = lessons[i];
  $("counter").textContent = `Materi ${pad(i + 1)} dari ${lessons.length}`;
  $("lesson").innerHTML = `<h2>${l.title}</h2>${l.html()}`;
  $("lesson").style.animation = "none"; void $("lesson").offsetWidth; $("lesson").style.animation = "";
  if (l.after) l.after();
  $("prevBtn").disabled = i === 0;
  $("nextBtn").disabled = i === lessons.length - 1;
  $("menu").querySelectorAll("li").forEach((li, k) => {
    li.classList.toggle("active", k === i);
    li.classList.toggle("done", seen.has(k) && k !== i);
  });
  const pct = Math.round((seen.size / lessons.length) * 100);
  $("progressBar").style.width = pct + "%";
  $("progressText").textContent = `${seen.size} dari ${lessons.length} materi dibuka (${pct}%)`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openMenu() { $("sidebar").classList.add("open"); $("overlay").classList.add("show"); }
function closeMenu() { $("sidebar").classList.remove("open"); $("overlay").classList.remove("show"); }

$("prevBtn").onclick = () => current > 0 && go(current - 1);
$("nextBtn").onclick = () => current < lessons.length - 1 && go(current + 1);
$("menuBtn").onclick = openMenu;
$("overlay").onclick = closeMenu;

buildMenu();
go(current);

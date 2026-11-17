// Halaman pengalihan login (TikTok/Instagram) untuk aplikasi desktop SynergyCorp AI.
// Aman: tidak ada jaringan (CSP connect-src 'none'), teks hanya lewat .value/.textContent (tanpa innerHTML),
// kode dihapus dari bilah alamat & riwayat begitu dibaca, halaman tidak tampil bila dibingkai situs lain.
(function () {
  'use strict';
  if (window.top !== window.self) return; // anti-clickjacking: jangan tampil di dalam iframe
  var p = new URLSearchParams(window.location.search);
  var code = p.get('code') || '';
  var state = p.get('state') || '';
  var err = p.get('error') || '';
  // bersihkan kode dari bilah alamat dan riwayat browser
  try { window.history.replaceState(null, '', window.location.pathname); } catch (e) { /* abaikan */ }
  var ok = /^[\w.\-~*!%:/+=]{8,2048}$/;
  var okState = /^[\w\-]{0,128}$/;
  var kotak = document.getElementById('kode');
  var pesan = document.getElementById('pesan');
  var status = document.getElementById('status');
  var tombol = document.getElementById('salin');
  if (err) {
    pesan.textContent = 'Login dibatalkan atau ditolak (' + err.slice(0, 60) + '). Tutup halaman ini dan tekan Hubungkan lagi di aplikasi.';
    kotak.hidden = true; tombol.hidden = true;
  } else if (!ok.test(code) || !okState.test(state)) {
    pesan.textContent = 'Tidak ada kode login yang sah di alamat ini. Tekan Hubungkan lagi di aplikasi.';
    kotak.hidden = true; tombol.hidden = true;
  } else {
    // format yang dibaca aplikasi: ?code=...&state=... (state dicocokkan aplikasi → tautan palsu ditolak)
    kotak.value = '?code=' + encodeURIComponent(code) + '&state=' + encodeURIComponent(state);
  }
  tombol.addEventListener('click', function () {
    kotak.select();
    var done = function () { status.textContent = 'Tersalin.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(kotak.value).then(done, function () { status.textContent = 'Tekan Ctrl+C.'; });
    else status.textContent = 'Tekan Ctrl+C.';
  });
  document.getElementById('isi').hidden = false;
})();

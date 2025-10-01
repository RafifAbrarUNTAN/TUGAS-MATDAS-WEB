/* === VARIABEL GLOBAL === */
// Variabel untuk menyimpan data stack (tumpukan)
let stack = [];

/* === FUNGSI NAVIGASI === */
// Fungsi untuk menampilkan section/halaman tertentu
function showSection(sectionName) {
    // Sembunyikan halaman utama
    document.getElementById('home-section').style.display = 'none';
    
    // Cari semua section konten dan sembunyikan
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active'); // Hapus class 'active' untuk menyembunyikan
    });
    
    // Tampilkan section yang dipilih dengan menambahkan class 'active'
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Fungsi untuk kembali ke halaman utama
function showHome() {
    // Sembunyikan semua content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Tampilkan home section
    document.getElementById('home-section').style.display = 'block';
}

// Fungsi untuk menampilkan modal kredit
function showCredits() {
    document.getElementById('credit-modal').classList.add('active');
}

// Fungsi untuk menutup modal kredit
function closeCredits() {
    document.getElementById('credit-modal').classList.remove('active');
}

// Fungsi untuk menampilkan program tertentu
function showProgram(programName) {
    // Update button states - hapus class active dari semua tombol
    document.querySelectorAll('.program-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Tambahkan class active ke tombol yang diklik
    event.target.classList.add('active');

    // Sembunyikan semua program demo
    document.querySelectorAll('.program-demo').forEach(demo => {
        demo.classList.remove('active');
    });

    // Tampilkan program yang dipilih
    document.getElementById(programName + '-program').classList.add('active');
}

/* === ALGORITMA BINARY SEARCH === */
// Fungsi untuk melakukan pencarian binary search
function performBinarySearch() {
    // Ambil nilai yang dicari dari input user dan ubah ke integer
    const searchValue = parseInt(document.getElementById('search-value').value);
    // Array data yang sudah terurut (syarat binary search)
    const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    
    // Validasi: cek apakah input adalah angka yang valid
    if (isNaN(searchValue)) {
        document.getElementById('search-result').innerHTML = '<span style="color: #ff6b6b;">❌ Masukkan angka yang valid!</span>';
        return; // Keluar dari fungsi jika input tidak valid
    }

    // Inisialisasi variabel untuk binary search
    let left = 0; // Indeks paling kiri
    let right = array.length - 1; // Indeks paling kanan
    let steps = []; // Array untuk menyimpan langkah-langkah pencarian
    let found = false; // Flag apakah data ditemukan
    let position = -1; // Posisi data jika ditemukan

    // Loop utama binary search - berjalan selama left <= right
    while (left <= right) {
        // Hitung indeks tengah menggunakan rumus matematika: (left + right) / 2
        let mid = Math.floor((left + right) / 2);
        // Catat langkah untuk ditampilkan ke user
        steps.push(`Langkah ${steps.length + 1}: left=${left}, right=${right}, mid=${mid}, array[${mid}]=${array[mid]}`);
        
        // Logika perbandingan: apakah elemen tengah sama dengan yang dicari?
        if (array[mid] === searchValue) {
            found = true; // Data ditemukan
            position = mid; // Simpan posisinya
            steps.push(`✅ Ditemukan! ${searchValue} berada di indeks ${mid}`);
            break; // Keluar dari loop karena sudah ketemu
        } 
        // Jika elemen tengah lebih kecil, cari di bagian kanan
        else if (array[mid] < searchValue) {
            left = mid + 1; // Pindahkan batas kiri
            steps.push(`   ${array[mid]} < ${searchValue}, cari di bagian kanan`);
        } 
        // Jika elemen tengah lebih besar, cari di bagian kiri
        else {
            right = mid - 1; // Pindahkan batas kanan
            steps.push(`   ${array[mid]} > ${searchValue}, cari di bagian kiri`);
        }
    }

    // Jika tidak ditemukan setelah loop selesai
    if (!found) {
        steps.push(`❌ ${searchValue} tidak ditemukan dalam array`);
    }

    // Tampilkan hasil pencarian
    document.getElementById('search-result').innerHTML = found ? 
        `<span style="color: #51cf66;">✅ Angka ${searchValue} ditemukan di indeks ${position}</span>` :
        `<span style="color: #ff6b6b;">❌ Angka ${searchValue} tidak ditemukan</span>`;
    
    // Tampilkan langkah-langkah pencarian
    document.getElementById('search-steps').innerHTML = '<strong>Langkah-langkah:</strong><br>' + steps.join('<br>');
}

/* === ALGORITMA BUBBLE SORT === */
// Fungsi untuk melakukan pengurutan dengan bubble sort
function performBubbleSort() {
    // Ambil input dari user
    const input = document.getElementById('sort-input').value;
    // Validasi: cek apakah input tidak kosong
    if (!input.trim()) {
        document.getElementById('sort-result').innerHTML = '<span style="color: #ff6b6b;">❌ Masukkan angka yang dipisah koma!</span>';
        return;
    }

    // Parsing input: pisahkan dengan koma, ubah ke integer, filter yang valid
    let array = input.split(',') // Pisahkan string berdasarkan koma
                   .map(num => parseInt(num.trim())) // Ubah setiap elemen ke integer
                   .filter(num => !isNaN(num)); // Ambil hanya yang berupa angka
    
    // Validasi: cek apakah ada angka yang valid
    if (array.length === 0) {
        document.getElementById('sort-result').innerHTML = '<span style="color: #ff6b6b;">❌ Format input tidak valid!</span>';
        return;
    }

    // Inisialisasi untuk tracking proses
    let steps = [`Array awal: [${array.join(', ')}]`]; // Catat langkah-langkah
    let originalArray = [...array]; // Simpan salinan array asli menggunakan spread operator

    // Loop luar: iterasi sebanyak n-1 kali (n = panjang array)
    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false; // Flag untuk cek apakah ada pertukaran
        steps.push(`\nIterasi ${i + 1}:`);
        
        // Loop dalam: bandingkan elemen bersebelahan
        // Setiap iterasi, elemen terbesar akan "menggelembung" ke kanan
        for (let j = 0; j < array.length - i - 1; j++) {
            // Logika perbandingan: jika elemen kiri > elemen kanan, tukar
            if (array[j] > array[j + 1]) {
                // Tukar posisi menggunakan destructuring assignment
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true; // Tandai bahwa ada pertukaran
                steps.push(`  Tukar ${array[j + 1]} dan ${array[j]} → [${array.join(', ')}]`);
            }
        }
        
        // Optimasi: jika tidak ada pertukaran, array sudah terurut
        if (!swapped) {
            steps.push(`  Tidak ada pertukaran, array sudah terurut`);
            break; // Keluar dari loop lebih awal
        }
    }

    // Tampilkan hasil sorting
    document.getElementById('sort-result').innerHTML = 
        `<strong>Hasil:</strong> [${originalArray.join(', ')}] → <span style="color: #51cf66;">[${array.join(', ')}]</span>`;
    
    // Tampilkan langkah-langkah sorting
    document.getElementById('sort-steps').innerHTML = '<strong>Proses Sorting:</strong><br>' + steps.join('<br>');
}

/* === OPERASI STACK (TUMPUKAN) === */
// Fungsi untuk menambahkan elemen ke stack (PUSH operation)
function pushToStack() {
    // Ambil referensi input dan nilai yang dimasukkan user
    const input = document.getElementById('stack-input');
    const value = input.value.trim(); // Hapus spasi di awal/akhir
    
    // Validasi: cek apakah input tidak kosong
    if (!value) {
        document.getElementById('stack-info').innerHTML = '<span style="color: #ff6b6b;">❌ Masukkan elemen untuk di-push!</span>';
        return;
    }

    // Operasi PUSH: tambahkan elemen ke atas stack (LIFO - Last In First Out)
    stack.push(value);
    input.value = ''; // Kosongkan input field
    updateStackVisual(); // Update tampilan visual stack
    // Tampilkan pesan sukses dengan informasi ukuran stack
    document.getElementById('stack-info').innerHTML = 
        `<span style="color: #51cf66;">✅ "${value}" berhasil di-push ke stack</span><br>
        <strong>Ukuran stack:</strong> ${stack.length}`;
}

// Fungsi untuk mengeluarkan elemen dari stack (POP operation)
function popFromStack() {
    // Cek apakah stack kosong
    if (stack.length === 0) {
        document.getElementById('stack-info').innerHTML = '<span style="color: #ff6b6b;">❌ Stack kosong, tidak ada elemen untuk di-pop!</span>';
        return;
    }

    // Operasi POP: keluarkan elemen teratas dari stack
    const poppedValue = stack.pop();
    updateStackVisual(); // Update tampilan visual
    // Tampilkan pesan sukses
    document.getElementById('stack-info').innerHTML = 
        `<span style="color: #51cf66;">✅ "${poppedValue}" berhasil di-pop dari stack</span><br>
        <strong>Ukuran stack:</strong> ${stack.length}`;
}

// Fungsi untuk mengosongkan seluruh stack
function clearStack() {
    stack = []; // Reset array stack menjadi kosong
    updateStackVisual(); // Update tampilan visual
    document.getElementById('stack-info').innerHTML = '<span style="color: #51cf66;">✅ Stack berhasil dikosongkan</span>';
}

// Fungsi untuk memperbarui tampilan visual stack
function updateStackVisual() {
    const visual = document.getElementById('stack-visual');
    visual.innerHTML = '<div class="stack-label">Stack (LIFO):</div>';
    
    // Jika stack kosong, tampilkan pesan
    if (stack.length === 0) {
        visual.innerHTML += '<div style="color: rgba(255,255,255,0.5); font-style: italic;">Stack kosong</div>';
        return;
    }

    // Tampilkan stack dari atas ke bawah (urutan terbalik)
    // Indeks tertinggi = elemen teratas stack
    for (let i = stack.length - 1; i >= 0; i--) {
        const item = document.createElement('div');
        item.className = 'stack-item';
        // Tandai elemen teratas dengan "← TOP"
        item.textContent = `${stack[i]} ${i === stack.length - 1 ? '← TOP' : ''}`;
        visual.appendChild(item);
    }
}

/* === FUNGSI FAKTORIAL REKURSIF === */
// Fungsi untuk menghitung faktorial menggunakan rekursi
function calculateFactorial() {
    // Ambil input dan konversi ke integer
    const input = parseInt(document.getElementById('factorial-input').value);
    
    // Validasi: cek apakah input adalah angka non-negatif
    if (isNaN(input) || input < 0) {
        document.getElementById('factorial-result').innerHTML = '<span style="color: #ff6b6b;">❌ Masukkan angka non-negatif!</span>';
        return;
    }

    // Batasi input maksimal untuk mencegah overflow dan performa
    if (input > 10) {
        document.getElementById('factorial-result').innerHTML = '<span style="color: #ff6b6b;">❌ Masukkan angka maksimal 10!</span>';
        return;
    }

    let steps = []; // Array untuk menyimpan langkah-langkah rekursi
    
    // Fungsi rekursif untuk menghitung faktorial
    // Parameter depth untuk indentasi tampilan langkah
    function factorial(n, depth = 0) {
        const indent = '  '.repeat(depth); // Buat indentasi berdasarkan kedalaman rekursi
        
        // Base case: faktorial 0 dan 1 adalah 1
        if (n === 0 || n === 1) {
            steps.push(`${indent}factorial(${n}) = 1 (base case)`);
            return 1;
        } 
        // Recursive case: n! = n × (n-1)!
        else {
            steps.push(`${indent}factorial(${n}) = ${n} × factorial(${n-1})`);
            // Panggil fungsi dirinya sendiri dengan n-1 (rekursi)
            const result = n * factorial(n - 1, depth + 1);
            steps.push(`${indent}factorial(${n}) = ${n} × ${result/n} = ${result}`);
            return result;
        }
    }

    // Hitung faktorial dan simpan hasilnya
    const result = factorial(input);
    
    // Tampilkan hasil
    document.getElementById('factorial-result').innerHTML = 
        `<span style="color: #51cf66;">✅ ${input}! = ${result}</span>`;
    
    // Tampilkan langkah-langkah rekursi
    document.getElementById('factorial-steps').innerHTML = 
        '<strong>Proses Rekursif:</strong><br>' + steps.join('<br>');
}

/* === EVENT LISTENERS === */
// Inisialisasi tampilan stack saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateStackVisual(); // Tampilkan stack kosong saat pertama kali load
});

// Event listener untuk menutup modal jika klik di luar content
document.getElementById('credit-modal').addEventListener('click', function(e) {
    // Jika yang diklik adalah background modal (bukan content), tutup modal
    if (e.target === this) {
        closeCredits();
    }
});
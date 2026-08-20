/* =================================================
   1. DATA JADWAL
================================================= */


/*
    Tanggal ini menjadi titik awal sistem.

    5 September 2026
    = Siklus A

    12 September
    = Siklus B

    19 September
    = Siklus A

    dst...
*/

const referenceDate = new Date(
    "2026-09-05T00:00:00+07:00"
);


/* =================================================
   SIKLUS A
================================================= */

const scheduleA = {

    sabtu: [

        {
            start: "14:00",
            end: "15:00",
            subject: "Micro Teaching",
            lecturer: "Saefudin, S.Pd., M.Pd."
        },

        {
            start: "15:00",
            end: "16:00",
            subject: "Bahasa Arab",
            lecturer: "M. Abduh Al Manar, M.Pd."
        },

        {
            start: "16:00",
            end: "16:30",
            subject: "ISTIRAHAT!!!",
            lecturer: "Waktu Istirahat",
            break: true
        },

        {
            start: "16:30",
            end: "17:30",
            subject: "Pembelajaran Fiqih",
            lecturer: "Rahmatullah Noor Hidayat, MA."
        }

    ],


    minggu: [

        {
            start: "10:00",
            end: "11:00",
            subject: "Pengembangan Minat dan Bakat",
            lecturer: "Tety Srihayati, S.Pd., M.Pd."
        },

        {
            start: "11:00",
            end: "12:00",
            subject: "Komunikasi Pembelajaran",
            lecturer: "Ahdan Abdul Ghani, S.Pd."
        }

    ]

};


/* =================================================
   SIKLUS B
================================================= */

const scheduleB = {

    sabtu: [

        {
            start: "14:00",
            end: "15:00",
            subject: "Pembelajaran PAI",
            lecturer: "Nurhasanah, S.Pd."
        },

        {
            start: "15:00",
            end: "16:00",
            subject: "Pendidikan Jasmani",
            lecturer: "M. Dede Haris Saputra, S.T."
        },

        {
            start: "16:00",
            end: "16:30",
            subject: "ISTIRAHAT!!!",
            lecturer: "Waktu Istirahat",
            break: true
        },

        {
            start: "16:30",
            end: "17:30",
            subject: "Penelitian Tindakan Kelas",
            lecturer: "Yandra, S.Pd.I, M.Pd."
        }

    ],


    minggu: [

        {
            start: "10:00",
            end: "11:00",
            subject: "Metode Pengembangan Berpikir",
            lecturer: "Aries Setiawan, SE., MM. / Eni Nuraeni, S.Pd."
        },

        {
            start: "11:00",
            end: "12:00",
            subject: "Kesehatan Gizi Anak",
            lecturer: "Sri Widiyastuti, S.Pd., M.Pd."
        }

    ]

};


/* =================================================
   2. FUNGSI TANGGAL
================================================= */


/*
    Mengambil tanggal sekarang
    berdasarkan waktu Jakarta.
*/

function getToday() {

    const now = new Date();

    const jakartaDate =
        new Intl.DateTimeFormat(
            "en-CA",
            {
                timeZone: "Asia/Jakarta"
            }
        ).format(now);

    return new Date(jakartaDate);
}


/*
    Mengubah tanggal menjadi:

    2026-09-05

    supaya gampang dibandingkan.
*/

function dateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


/*
    Menambahkan beberapa hari
    ke sebuah tanggal.
*/

function addDays(date, jumlahHari) {

    const result =
        new Date(date);

    result.setDate(
        result.getDate() + jumlahHari
    );

    return result;
}


/* =================================================
   3. MENENTUKAN SIKLUS
================================================= */

function getCycle(date) {

    /*
        Selisih waktu antara tanggal sekarang
        dengan tanggal awal.

        Contoh:

        5 September
        = 0 hari

        12 September
        = 7 hari

        19 September
        = 14 hari
    */

    const difference =
        date - referenceDate;


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /*
        Setiap 14 hari berganti siklus.

        0 - 13   = A
        14 - 27  = B
        28 - 41  = A
        dst.
    */

    const cycleNumber =
        Math.floor(days / 7);


    /*
        Karena kita hanya kuliah Sabtu-Minggu,
        kita menentukan siklus berdasarkan
        minggu keberapa.

        Genap = A
        Ganjil = B
    */

    return cycleNumber % 2 === 0
        ? "A"
        : "B";
}


/* =================================================
   4. MENGAMBIL JADWAL SESUAI TANGGAL
================================================= */

function getSchedule(date) {

    const day =
        date.getDay();


    const cycle =
        getCycle(date);


    const schedule =
        cycle === "A"
            ? scheduleA
            : scheduleB;


    /*
        getDay():

        Minggu = 0
        Senin  = 1
        Selasa = 2
        Rabu   = 3
        Kamis  = 4
        Jumat  = 5
        Sabtu  = 6
    */


    if (day === 6) {

        return schedule.sabtu;

    }


    if (day === 0) {

        return schedule.minggu;

    }


    return [];

}


/* =================================================
   5. NAMA TANGGAL
================================================= */

function formatDate(date) {

    return new Intl.DateTimeFormat(
        "id-ID",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(date);

}


/* =================================================
   6. RENDER JADWAL KE HTML
================================================= */

function renderSchedule() {

    const container =
        document.getElementById(
            "scheduleContainer"
        );


    container.innerHTML = "";


    const today =
        getToday();


    /*
        Kita cari hari Senin
        dari minggu sekarang.
    */

    const monday =
        addDays(
            today,
            -(today.getDay() + 6) % 7
        );


    /*
        Kita tampilkan 2 minggu.

        Minggu pertama
        Minggu kedua
    */

    for (
        let week = 0;
        week < 2;
        week++
    ) {


        const weekStart =
            addDays(
                monday,
                week * 7
            );


        const saturday =
            addDays(
                weekStart,
                5
            );


        const sunday =
            addDays(
                weekStart,
                6
            );


        const cycle =
            getCycle(saturday);


        /*
            Buat container minggu
        */

        const weekElement =
            document.createElement(
                "div"
            );


        weekElement.className =
            "week";


        /*
            Header minggu
        */

        weekElement.innerHTML = `

            <div class="week-header">

                <h3>
                    Minggu ${week + 1}
                    • Siklus ${cycle}
                </h3>

                <span>
                    ${formatDate(saturday)}
                    -
                    ${formatDate(sunday)}
                </span>

            </div>

        `;


        /*
            Masukkan Sabtu
            dan Minggu
        */

        createDay(
            saturday,
            weekElement
        );


        createDay(
            sunday,
            weekElement
        );


        container.appendChild(
            weekElement
        );

    }


    /*
        Update badge siklus
    */

    document.getElementById(
        "cycleBadge"
    ).textContent =
        `Siklus ${getCycle(today)}`;

}


/* =================================================
   7. MEMBUAT HARI
================================================= */

function createDay(
    date,
    parent
) {

    const today =
        getToday();


    const dayElement =
        document.createElement(
            "div"
        );


    dayElement.className =
        "day";


    /*
        Kalau tanggal ini sama
        dengan hari ini,
        kasih class "today".
    */

    if (
        dateKey(date) ===
        dateKey(today)
    ) {

        dayElement.classList.add(
            "today"
        );

    }


    /*
        Header hari
    */

    dayElement.innerHTML = `

        <div class="day-header">

            <strong>
                <i class="bi bi-calendar-event"></i>

                ${formatDate(date)}
            </strong>

            <span class="today-badge">
                HARI INI
            </span>

        </div>

    `;


    /*
        Tempat tabel jadwal
    */

    const scheduleContainer =
        document.createElement(
            "div"
        );


    scheduleContainer.className =
        "schedule";


    const schedules =
        getSchedule(date);


    /*
        Kalau tidak ada jadwal
    */

    if (
        schedules.length === 0
    ) {

        scheduleContainer.innerHTML = `

            <div class="empty">
                Tidak ada perkuliahan.
            </div>

        `;

    }


    /*
        Kalau ada jadwal
    */

    schedules.forEach(
        item => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "row";


            /*
                Tandai kalau istirahat
            */

            if (item.break) {

                row.classList.add(
                    "break"
                );

            }


            /*
                Data ini nanti
                dipakai JavaScript
                untuk mencari kelas aktif.
            */

            row.dataset.date =
                dateKey(date);

            row.dataset.start =
                item.start;

            row.dataset.end =
                item.end;


            row.innerHTML = `

                <div class="time">
                    ${item.start}
                    -
                    ${item.end}
                </div>

                <div class="subject">
                    ${item.subject}
                </div>

                <div class="lecturer">
                    ${item.lecturer}
                </div>

            `;


            scheduleContainer.appendChild(
                row
            );

        }
    );


    dayElement.appendChild(
        scheduleContainer
    );


    parent.appendChild(
        dayElement
    );

}


/* =================================================
   8. JAM REALTIME
================================================= */

function updateClock() {

    const now =
        new Date();


    /*
        Jam Indonesia
    */

    const time =
        new Intl.DateTimeFormat(
            "id-ID",
            {
                timeZone: "Asia/Jakarta",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        ).format(now);


    document.getElementById(
        "clock"
    ).textContent =
        `${time} WIB`;


    /*
        Tanggal
    */

    document.getElementById(
        "date"
    ).textContent =
        formatDate(
            getToday()
        );

}


/* =================================================
   9. MENGUBAH JAM MENJADI MENIT
================================================= */

function timeToMinutes(time) {

    const [
        hour,
        minute
    ] = time
        .split(":")
        .map(Number);


    return (
        hour * 60
    ) + minute;

}


/* =================================================
   10. JAM SEKARANG
================================================= */

function getCurrentMinutes() {

    const now =
        new Date();


    const parts =
        new Intl.DateTimeFormat(
            "en-GB",
            {
                timeZone: "Asia/Jakarta",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        )
        .format(now)
        .split(":");


    const hour =
        Number(parts[0]);


    const minute =
        Number(parts[1]);


    return (
        hour * 60
    ) + minute;

}


/* =================================================
   11. UPDATE KELAS YANG SEDANG BERLANGSUNG
================================================= */

function updateLiveClass() {

    const today =
        getToday();


    const schedules =
        getSchedule(today);


    const currentMinutes =
        getCurrentMinutes();


    let activeClass =
        null;


    /*
        Cari kelas yang waktunya
        sedang berlangsung.
    */

    schedules.forEach(
        item => {

            if (item.break) {
                return;
            }


            const start =
                timeToMinutes(
                    item.start
                );


            const end =
                timeToMinutes(
                    item.end
                );


            if (
                currentMinutes >= start &&
                currentMinutes < end
            ) {

                activeClass =
                    item;

            }

        }
    );


    /*
        Ambil card live
    */

    const liveCard =
        document.getElementById(
            "liveCard"
        );


    /*
        Kalau ada kelas aktif
    */

    if (activeClass) {

        liveCard.classList.add(
            "show"
        );


        document.getElementById(
            "status"
        ).textContent =
            `🟢 Sedang berlangsung: ${activeClass.subject}`;


        document.getElementById(
            "liveSubject"
        ).textContent =
            activeClass.subject;


        document.getElementById(
            "liveLecturer"
        ).textContent =
            activeClass.lecturer;


        /*
            Hitung progress
        */

        const start =
            timeToMinutes(
                activeClass.start
            );


        const end =
            timeToMinutes(
                activeClass.end
            );


        const total =
            end - start;


        const elapsed =
            currentMinutes - start;


        const progress =
            (
                elapsed / total
            ) * 100;


        document.getElementById(
            "progressBar"
        ).style.width =
            `${progress}%`;


        document.getElementById(
            "livePercent"
        ).textContent =
            `${Math.floor(progress)}%`;


        document.getElementById(
            "liveStart"
        ).textContent =
            activeClass.start;


        document.getElementById(
            "liveEnd"
        ).textContent =
            activeClass.end;


        /*
            Cari baris tabel
            yang sesuai dengan kelas aktif.
        */

        document
            .querySelectorAll(".row.active")
            .forEach(row => {

                row.classList.remove(
                    "active"
                );

            });


        const activeRow =
            document.querySelector(
                `.row[data-date="${dateKey(today)}"][data-start="${activeClass.start}"]`
            );


        if (activeRow) {

            activeRow.classList.add(
                "active"
            );

        }

    }

    /*
        Kalau tidak ada kelas
    */

    else {

        liveCard.classList.remove(
            "show"
        );


        document.getElementById(
            "status"
        ).textContent =
            "🎓 Tidak ada kelas yang sedang berlangsung";

    }

}


/* =================================================
   12. PROGRAM UTAMA
================================================= */


/*
    Jalankan pertama kali
*/

renderSchedule();

updateClock();

updateLiveClass();


/*
    Jam diperbarui setiap 1 detik
*/

setInterval(
    updateClock,
    1000
);


/*
    Status kelas juga diperiksa
    setiap 1 detik
*/

setInterval(
    updateLiveClass,
    1000
);

// Swiper初期化
window.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        slidesPerView: 1,
        centeredSlides: true,
    });

    // メインビジュアル画像切り替え処理
    const slides = document.querySelectorAll('.mainvisual .slide');
    if (slides.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 4000);
    }
});

// ヘッダーと下部固定表示のスクロール制御
window.addEventListener("load", function () {
    const header = document.querySelector(".site-header");
    const fixedBottom = document.querySelector(".bottom-fixed");
    const nav = document.querySelector(".main-nav");
    const hamburger = document.getElementById("hamburger");
    const overlay = document.querySelector(".overlay");

    const scrollCheck = () => {
        if (!header || !fixedBottom) return;

        if (window.scrollY > 50) {
            header.classList.add("show-header");
            header.classList.remove("hide-on-load");

            fixedBottom.classList.add("show-fixed");
            fixedBottom.classList.remove("hide-on-load");
        } else {
            header.classList.remove("show-header");
            header.classList.add("hide-on-load");

            fixedBottom.classList.remove("show-fixed");
            fixedBottom.classList.add("hide-on-load");
        }

        // ▼ メニューを閉じてマスクも外す
        if (window.scrollY <= 0 && window.innerWidth <= 768) {
            nav?.classList.remove("active");
            hamburger?.classList.remove("open");
            overlay?.classList.remove("active");
        }
    };

    scrollCheck();
    window.addEventListener("scroll", scrollCheck);
});

// サムネイルクリックでメイン画像切り替え
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.querySelector(".profile-photo img");
    const thumbnails = document.querySelectorAll(".profile-gallery .thumb");

    thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", function () {
            mainImage.src = this.src;
            thumbnails.forEach((t) => t.classList.remove("is-active"));
            this.classList.add("is-active");
        });
    });
});

// Swiper連携（セラピスト詳細ページ用）
const thumbsSwiper = new Swiper('.profile-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});

const mainSwiper = new Swiper('.profile-main', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: thumbsSwiper,
    },
});

// ハンバーガーメニュー制御（クリックのみ、スクロールでは閉じない）
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector(".main-nav");
    let overlay = document.querySelector(".overlay");

    // overlayがなければ作成して追加
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);
    }

    // メニュー開閉処理
    const toggleMenu = () => {
        nav?.classList.toggle("active");
        overlay.classList.toggle("active");
        hamburger?.classList.toggle("open");
    };

    // ハンバーガークリックで開閉
    hamburger?.addEventListener("click", toggleMenu);
    overlay?.addEventListener("click", toggleMenu);

    // ウィンドウリサイズ時にPC幅ならリセット
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            nav?.classList.remove("active");
            overlay?.classList.remove("active");
            hamburger?.classList.remove("open");
        }
    });
});

// フェード表示（スクロール時）
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.fade-section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.2
    });

    targets.forEach(target => observer.observe(target));
});
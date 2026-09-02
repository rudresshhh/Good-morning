/* =========================================================
   CONFIGURATION
   Edit everything in this object to personalize the letter.
   No other part of the file needs to change.
========================================================= */
const content = {

  girlfriendName: "Rituuu",

  goodMorning: {
    title: "Goodddd Morninggggg, Shonulayyy ❤️",
    message: "I hope your morning starts with a smile, even a small one."
  },

  todo: {
    title: "Today's Lil Things 🌸",
    subtitle: "Nothing big. Just a few tiny reminders for you.",
    items: [
      "Drink bhot saara paani 💧",
      "Eat mast mast yummiee bhot saara khana🥐",
      "Take care of yourself, you health and ,me☁️",
      "Ingor faltu log and faltu baate dont let yourself down 😊",
      "And dont forget me keep texting me calling me and miss me khupp saara✨"
    ]
  },

apology: {
    title: "About last few days...",
    message1: "I know last few days were bad days for both of uss, and I've been thinking about it since.",
    message2: "I'm sorry for the things I said and I did. That's on me and you are totally innocent bebuu!I was the one who created the mess",
    message3: "I don't want to make excuses. I just want you to know that I care about how you felt, and I never want an argument to make you feel less loved or something else",
    message4: "Please dont get me wrong you will be never unloved by me, for me its always you and you and only youu januuu!Just the energy differs thats it!! no hate no grivences against you bebuuu.",
    closing: "You are my sweet cutu lil babieee n?? why would i do this all to you?? But still, I'm sorry. ❤️"
  },


   love: {
    title: "And one last thing...",
    main: "I Loveeeeeee Youuuuuuu Jaannnuuuuuuuuu",
    message: "I just fucking love you soo much that entire universe even multiverse will end up in it!.",
    final: "You are everything to me!!"
  },


  photo: {
    enabled: true,
    path: "us.jpg", // put us.jpg in the SAME folder as index.html
    caption: "Gods finest creation ❤️"
  },

  yourName: "Rud",

  // Optional background song.
  // 1. Set enabled to true.
  // 2. Put your audio file in the SAME folder as index.html (mp3 or ogg), e.g. song.mp3
  // 3. Set path below to match, e.g. "song.mp3"
  // Music never autoplays — a small note appears and only starts playing
  // once she taps it, so the browser doesn't block it and it never
  // surprises her.
  music: {
    enabled: true,
    path: "song.mp3",
    label: "our song 🎵" // text shown next to the play control
  }
};

/* =========================================================
   HERO — populate text
========================================================= */
document.getElementById("nameSlot").textContent = content.girlfriendName;
document.getElementById("morningTitle").textContent = content.goodMorning.title;
document.getElementById("morningMessage").textContent = content.goodMorning.message;

/* =========================================================
   TODO — build cards from config
========================================================= */
document.getElementById("todoTitle").textContent = content.todo.title;
document.getElementById("todoSubtitle").textContent = content.todo.subtitle;

const todoListEl = document.getElementById("todoList");

content.todo.items.forEach((item, i) => {
  const li = document.createElement("li");
  li.className = "todo-card reveal fade-up";
  li.dataset.revealOrder = i + 1;

  const btn = document.createElement("button");
  btn.className = "checkbox-btn";
  btn.type = "button";
  btn.setAttribute("aria-pressed", "false");
  btn.setAttribute("aria-label", `Mark "${item}" as done`);

  const text = document.createElement("span");
  text.className = "todo-card__text";
  text.textContent = item;

  const spark = document.createElement("span");
  spark.className = "todo-card__spark";
  spark.textContent = "✨";
  spark.setAttribute("aria-hidden", "true");

  btn.addEventListener("click", () => {
    const isChecked = li.classList.toggle("checked");
    btn.classList.toggle("checked", isChecked);
    btn.setAttribute("aria-pressed", String(isChecked));

    if (isChecked) {
      spark.classList.remove("show");
      // restart the spark animation
      void spark.offsetWidth;
      spark.classList.add("show");
    }
  });

  li.appendChild(btn);
  li.appendChild(text);
  li.appendChild(spark);
  todoListEl.appendChild(li);
});

/* =========================================================
   PHOTO MEMORY — show only if enabled
========================================================= */
if (content.photo.enabled) {
  const photoSection = document.getElementById("photo");
  photoSection.hidden = false;
  document.getElementById("memoryPhoto").src = content.photo.path;
  document.getElementById("photoCaption").textContent = content.photo.caption;
}

/* =========================================================
   APOLOGY — populate paragraphs
========================================================= */
document.getElementById("apologyTitle").textContent = content.apology.title;
document.getElementById("apologyP1").textContent = content.apology.message1;
document.getElementById("apologyP2").textContent = content.apology.message2;
document.getElementById("apologyP3").textContent = content.apology.message3;
document.getElementById("apologyP4").textContent = content.apology.message4;
document.getElementById("apologyClosing").textContent = content.apology.closing;

/* =========================================================
   FINAL LOVE SECTION
========================================================= */
document.getElementById("loveTitle").textContent = content.love.title;

const loveMainEl = document.getElementById("loveMain");
loveMainEl.textContent = content.love.main + " ";
const pulseHeart = document.createElement("span");
pulseHeart.className = "pulse-heart";
pulseHeart.textContent = "❤️";
loveMainEl.appendChild(pulseHeart);

document.getElementById("loveMessage").textContent = content.love.message;
document.getElementById("loveFinal").textContent = content.love.final;
document.getElementById("loveSignature").textContent = `— ${content.yourName}`;

/* =========================================================
   REVEAL ON SCROLL (IntersectionObserver)
========================================================= */
const revealEls = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const order = parseInt(el.dataset.revealOrder || "0", 10);
        const delay = order * 220; // ms, staggered sequential reveal
        setTimeout(() => el.classList.add("visible"), delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  revealEls.forEach(el => revealObserver.observe(el));
}

/* =========================================================
   HERO — floating dust particles (kept sparse and slow)
========================================================= */
if (!prefersReducedMotion) {
  const particleField = document.getElementById("heroParticles");
  const particleCount = window.innerWidth < 480 ? 10 : 18;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const left = Math.random() * 100;
    const duration = 14 + Math.random() * 10;
    const delay = Math.random() * 14;
    const size = 2 + Math.random() * 2;
    p.style.left = `${left}%`;
    p.style.bottom = `${Math.random() * 30}%`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${delay}s`;
    particleField.appendChild(p);
  }
}

/* =========================================================
   HERO — twinkling stars (new ambient layer)
========================================================= */
if (!prefersReducedMotion) {
  const starField = document.getElementById("heroStars");
  const starCount = window.innerWidth < 480 ? 30 : 55;

  for (let i = 0; i < starCount; i++) {
    const s = document.createElement("span");
    s.className = "star";
    const size = 1 + Math.random() * 1.6;
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 70}%`;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.animationDuration = `${2.5 + Math.random() * 3.5}s`;
    s.style.animationDelay = `${Math.random() * 4}s`;
    starField.appendChild(s);
  }
}

/* =========================================================
   CURSOR SPOTLIGHT — soft light follows the pointer (desktop only)
========================================================= */
if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const spotlight = document.getElementById("spotlight");
  let ticking = false;

  document.addEventListener("mousemove", (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        spotlight.style.setProperty("--x", `${e.clientX}px`);
        spotlight.style.setProperty("--y", `${e.clientY}px`);
        spotlight.classList.add("active");
        ticking = false;
      });
      ticking = true;
    }
  });

  document.addEventListener("mouseleave", () => {
    spotlight.classList.remove("active");
  });
}

/* =========================================================
   FINAL SECTION — sparse floating hearts
========================================================= */
if (!prefersReducedMotion) {
  const heartField = document.getElementById("loveHearts");
  const heartCount = window.innerWidth < 480 ? 5 : 8;

  for (let i = 0; i < heartCount; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = "❤";
    const left = 8 + Math.random() * 84;
    const duration = 10 + Math.random() * 8;
    const delay = Math.random() * 10;
    h.style.left = `${left}%`;
    h.style.animationDuration = `${duration}s`;
    h.style.animationDelay = `${delay}s`;
    heartField.appendChild(h);
  }
}

/* =========================================================
   SCROLL CUE — click to advance
========================================================= */
document.getElementById("scrollCue").addEventListener("click", () => {
  document.getElementById("todo").scrollIntoView({ behavior: "smooth" });
});

/* =========================================================
   RESTART — back to the top
========================================================= */
document.getElementById("restartBtn").addEventListener("click", () => {
  document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
});

/* =========================================================
   OPTIONAL MUSIC — never autoplays, always her choice to press play
========================================================= */
if (content.music.enabled && content.music.path) {
  const audio = new Audio(content.music.path);
  audio.loop = true;
  audio.preload = "none";
  audio.volume = 0; // we fade this in on play, see fadeVolume below

  // Wrapper holds the little note + button together so it reads as
  // "here's a song" rather than an unlabeled icon.
  const wrap = document.createElement("div");
  wrap.className = "music-widget";

  const label = document.createElement("span");
  label.className = "music-widget__label";
  label.textContent = content.music.label || "play a song";

  const btn = document.createElement("button");
  btn.className = "music-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", `Play ${content.music.label || "background music"}`);
  btn.textContent = "♪";

  wrap.appendChild(label);
  wrap.appendChild(btn);
  document.body.appendChild(wrap);

  function fadeVolume(target, duration = 900) {
    const start = audio.volume;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      audio.volume = start + (target - start) * t;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  let playing = false;

  btn.addEventListener("click", () => {
    if (playing) {
      fadeVolume(0, 500);
      setTimeout(() => audio.pause(), 500);
      btn.textContent = "♪";
      btn.classList.remove("music-toggle--playing");
      btn.setAttribute("aria-label", `Play ${content.music.label || "background music"}`);
      playing = false;
      return;
    }

    const playPromise = audio.play();
    fadeVolume(0.55, 1200);

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay/decoding was blocked or the file failed to load —
        // fail quietly rather than breaking the page.
        wrap.classList.add("music-widget--error");
        label.textContent = "song unavailable";
      });
    }

    btn.textContent = "❚❚";
    btn.classList.add("music-toggle--playing");
    btn.setAttribute("aria-label", `Pause ${content.music.label || "background music"}`);
    playing = true;
  });
}

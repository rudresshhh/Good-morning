/* =========================================================
   CONFIGURATION
   Edit everything in this object to personalize the letter.
   No other part of the file needs to change.
========================================================= */
const content = {

  girlfriendName: "Rituuu",

  goodMorning: {
    title: "Goodddd Morninggggg, Babduuuuu ❤️",
    message: "I hope your morning starts with a smile after this."
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
    title: "About Yesterday...",
    message1: "I know yesterday was a bad day for both of uss, and I've been thinking about it since.",
    message2: "I'm sorry for the things I said and I did. That's on me and you are totally innocent bebuu!I was the one who created the mess",
    message3: "I don't want to make excuses. I just want you to know that I care about how you felt, and I never want an argument to make you feel less loved or something else",
    message4: "Please dont get me wrong you will be never unloved by me, for me its always you and you and only youu januuu!Just the energy differs thats it!! no hate no grivences against you bebuuu.",
    closing: "You are my sweet cutu lil babieee n?? why would i do this all to you?? But still, I'm sorry. ❤️"
  },

  love: {
    title: "And one last thing...",
    main: "I Loveeeeeee Youuuuuuu Jaannnuuuuuuuuuuuu",
    message: "I just fucking love you soo much that entire universe even multiverse will end up in it!.",
    final: "You are everything to me!!"
  },

  photo: {
    enabled: true,
    path: "us.jpg", // put us.jpg in the SAME folder as index.html
     
    caption: "Gods finest creation ❤️"
  },

  yourName: "Rud",

  // Optional: set to an mp3 path to enable the tiny music control.
  // Music never autoplays — it only starts if she taps the button.
     music: {
    enabled: false,
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
   OPTIONAL MUSIC — never autoplays
========================================================= */
if (content.music.enabled && content.music.path) {
  const audio = new Audio(content.music.path);
  audio.loop = true;

  const btn = document.createElement("button");
  btn.className = "music-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Play background music");
  btn.textContent = "♪";

  let playing = false;
  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      btn.textContent = "♪";
      btn.setAttribute("aria-label", "Play background music");
    } else {
      audio.play();
      btn.textContent = "❚❚";
      btn.setAttribute("aria-label", "Pause background music");
    }
    playing = !playing;
  });

  document.body.appendChild(btn);
}

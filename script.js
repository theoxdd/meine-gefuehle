/* ============================================================
   OPTIONEN
   Carlo = 0, Ich = 100, Freundin = 55
   ============================================================ */
const options = {
  carlo: {
    value: 0,
    emoji: '💔',
    title: 'Das tut mir weh',
    text: 'Paartanz bedeutet für mich Nähe und halt etwas was Paare machen. Der Gedanke, dass du diesen Moment gerade mit ihm teilst, löst bei mir echten Schmerz aus, nicht Eifersucht, sondern das Gefühl etwas wichtiges zu verlieren. Ich wollte, dass du das weißt, denn dieses Gefühl wird nicht weggehen. Wenn du mit Carlo tanzt, fühle ich mich ausgeschlossen und verletzt, diese körperliche Nähe mit ihm ist einfach eine Grenze von mir.',
    fill: 'linear-gradient(90deg, #f7c8c8, #e86060)',
    thumbColor: '#e86060',
    thumbEmoji: '😢',
    sparkles: ['💔', '😔', '💔', '😔'],
  },
  ich: {
    value: 100,
    emoji: '🌸',
    title: 'Das wäre wunderschön',
    text: 'Wenn wir zusammen tanzen würden, wäre das für mich ein wirklich besonderer Moment. Ich würde mich gesehen und nah fühlen – und einfach glücklich, diesen Abend mit dir zusammen zu erleben.',
    fill: 'linear-gradient(90deg, #f4c0d8, #e882b0)',
    thumbColor: '#e882b0',
    thumbEmoji: '💖',
    sparkles: ['🌸', '💖', '✨', '🌟', '💖', '🌸', '✨'],
  },
  freundin: {
    value: 55,
    emoji: '🤍',
    title: 'Das ist okay für mich',
    text: 'Wenn du mit einer Freundin tanzt oder jemand anderem, löst das bei mir keinen Konflikt aus. Ich kann damit viel besser umgehen und fühle mich dabei wohler. Es ist natürlich Schade nicht dabei zu sein, aber ich würde mich entspannt fühlen.',
    fill: 'linear-gradient(90deg, #b8d8f5, #7ab8f5)',
    thumbColor: '#7ab8f5',
    thumbEmoji: '😊',
    sparkles: ['🤍', '😊', '🌸', '🤍'],
  },
};

/* ============================================================
   DOM
   ============================================================ */
const cards     = document.querySelectorAll('.card');
const resultEl  = document.getElementById('result');
const emojiEl   = document.getElementById('result-emoji');
const titleEl   = document.getElementById('result-title');
const textEl    = document.getElementById('result-text');
const fillEl    = document.getElementById('meter-fill');
const thumbEl   = document.getElementById('meter-thumb');
const thumbFace = document.getElementById('thumb-face');
const scoreEl   = document.getElementById('meter-score');
const sparklesEl= document.getElementById('sparkles');

/* ============================================================
   CLICK HANDLER
   ============================================================ */
cards.forEach(card => {
  card.addEventListener('click', () => {
    const key  = card.dataset.option;
    const data = options[key];

    // Active card highlight
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Fill result panel
    emojiEl.textContent = data.emoji;
    titleEl.textContent = data.title;
    textEl.textContent  = data.text;

    // Show panel
    resultEl.classList.remove('hidden');

    // Animate meter after paint
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const pct = data.value + '%';
      fillEl.style.width      = pct;
      fillEl.style.background = data.fill;
      thumbEl.style.left      = pct;
      thumbEl.style.borderColor = data.thumbColor;
      thumbFace.textContent   = data.thumbEmoji;

      animateCount(scoreEl, 0, data.value, 900);
    }));

    // Sparkles
    sparklesEl.innerHTML = '';
    data.sparkles.forEach((s, i) => {
      const span = document.createElement('span');
      span.textContent = s;
      span.style.animationDelay = (i * 0.07) + 's';
      sparklesEl.appendChild(span);
    });

    // Smooth scroll to result
    setTimeout(() => {
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  });
});

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCount(el, from, to, ms) {
  const start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / ms, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * ease) + ' / 100';
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

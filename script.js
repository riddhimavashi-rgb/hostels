// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Weekly meal planner ----------
const plans = {
  Mon: [
    { emoji: "🥣", title: "Breakfast", food: "Oats with banana and peanuts", tag: "High energy" },
    { emoji: "🍛", title: "Lunch", food: "Dal, 2 rotis, sabzi, curd", tag: "Mess friendly" },
    { emoji: "🍎", title: "Snack", food: "Apple + roasted chana", tag: "Under ₹30" },
    { emoji: "🍲", title: "Dinner", food: "Veg khichdi with salad", tag: "Light" }
  ],
  Tue: [
    { emoji: "🥪", title: "Breakfast", food: "Veg sandwich + milk", tag: "Quick" },
    { emoji: "🍚", title: "Lunch", food: "Rajma rice with cucumber", tag: "Protein rich" },
    { emoji: "🥜", title: "Snack", food: "Peanut chikki + fruit", tag: "Under ₹30" },
    { emoji: "🍳", title: "Dinner", food: "Egg curry / paneer + 2 rotis", tag: "Protein" }
  ],
  Wed: [
    { emoji: "🥞", title: "Breakfast", food: "Besan chilla + mint chutney", tag: "Protein" },
    { emoji: "🍛", title: "Lunch", food: "Chole, rice, onion salad", tag: "Filling" },
    { emoji: "🍌", title: "Snack", food: "Banana + handful of nuts", tag: "Energy" },
    { emoji: "🥗", title: "Dinner", food: "Mixed veg soup + toast", tag: "Light" }
  ],
  Thu: [
    { emoji: "🍚", title: "Breakfast", food: "Poha with peanuts", tag: "Quick" },
    { emoji: "🍛", title: "Lunch", food: "Sambar rice + vegetable poriyal", tag: "Fibre rich" },
    { emoji: "🍊", title: "Snack", food: "Orange / seasonal fruit", tag: "Vitamin C" },
    { emoji: "🍲", title: "Dinner", food: "Dal tadka + roti", tag: "Mess friendly" }
  ],
  Fri: [
    { emoji: "🥣", title: "Breakfast", food: "Idli with sambar", tag: "Light" },
    { emoji: "🍚", title: "Lunch", food: "Curd rice + veg curry", tag: "Cooling" },
    { emoji: "🌽", title: "Snack", food: "Boiled corn / sprouts chaat", tag: "Under ₹30" },
    { emoji: "🍳", title: "Dinner", food: "Veg pulao + raita", tag: "Balanced" }
  ],
  Sat: [
    { emoji: "🥞", title: "Breakfast", food: "Dosa with chutney", tag: "Weekend treat" },
    { emoji: "🍛", title: "Lunch", food: "Mixed dal, rice, salad", tag: "Balanced" },
    { emoji: "🍇", title: "Snack", food: "Fruit bowl", tag: "Vitamins" },
    { emoji: "🌯", title: "Dinner", food: "Veg wrap / egg roll at home", tag: "Fun & healthy" }
  ],
  Sun: [
    { emoji: "🍳", title: "Breakfast", food: "Boiled eggs / paneer bhurji + toast", tag: "Protein" },
    { emoji: "🍲", title: "Lunch", food: "Veg biryani + raita", tag: "Treat meal" },
    { emoji: "🥛", title: "Snack", food: "Buttermilk + roasted makhana", tag: "Light" },
    { emoji: "🥗", title: "Dinner", food: "Soup + salad, early", tag: "Reset day" }
  ]
};

const tabsEl = document.getElementById("dayTabs");
const cardsEl = document.getElementById("mealCards");

function showDay(day) {
  document.querySelectorAll(".tab").forEach(t =>
    t.classList.toggle("active", t.textContent === day)
  );
  cardsEl.innerHTML = plans[day].map(m => `
    <div class="card">
      <div class="emoji">${m.emoji}</div>
      <h3>${m.title}</h3>
      <p>${m.food}</p>
      <span class="tag">${m.tag}</span>
    </div>`).join("");
}

Object.keys(plans).forEach(day => {
  const b = document.createElement("button");
  b.className = "tab";
  b.textContent = day;
  b.addEventListener("click", () => showDay(day));
  tabsEl.appendChild(b);
});
showDay("Mon");

// ---------- Tips carousel ----------
const tips = [
  { emoji: "💧", text: "Keep a water bottle on your study table and finish at least 8 glasses a day." },
  { emoji: "🥜", text: "Swap packaged chips for roasted chana, peanuts or makhana at night." },
  { emoji: "🌙", text: "Avoid heavy meals right before sleep. Eat dinner 2 hours before bed." },
  { emoji: "🍳", text: "Don't skip breakfast. It keeps you focused during morning classes." },
  { emoji: "🥗", text: "Add one fruit or raw salad to your day, even when mess food is limited." }
];
let current = 0;
const slideEl = document.getElementById("slide");
const dotsEl = document.getElementById("dots");

tips.forEach((_, i) => {
  const d = document.createElement("span");
  d.className = "dot";
  d.addEventListener("click", () => { current = i; renderSlide(); });
  dotsEl.appendChild(d);
});

function renderSlide() {
  slideEl.innerHTML = `<div class="emoji">${tips[current].emoji}</div><p>${tips[current].text}</p>`;
  document.querySelectorAll(".dot").forEach((d, i) =>
    d.classList.toggle("active", i === current)
  );
}
function next() { current = (current + 1) % tips.length; renderSlide(); }
function prev() { current = (current - 1 + tips.length) % tips.length; renderSlide(); }

document.getElementById("nextBtn").addEventListener("click", next);
document.getElementById("prevBtn").addEventListener("click", prev);
renderSlide();
setInterval(next, 5000); // auto-slide

// ---------- Water tracker ----------
let water = 0;
const waterCount = document.getElementById("waterCount");
const waterBar = document.getElementById("waterBar");

function updateWater() {
  waterCount.textContent = water;
  waterBar.style.width = Math.min(water / 8 * 100, 100) + "%";
}
document.getElementById("addWater").addEventListener("click", () => {
  if (water < 8) water++;
  updateWater();
});
document.getElementById("resetWater").addEventListener("click", () => {
  water = 0;
  updateWater();
});

// ---------- Checklist ----------
const checks = document.querySelectorAll(".check");
const checkMsg = document.getElementById("checkMsg");
checks.forEach(c => c.addEventListener("change", () => {
  const done = [...checks].filter(x => x.checked).length;
  checkMsg.textContent =
    done === checks.length ? "🎉 Perfect day! Keep it up." :
    done > 0 ? `${done} of ${checks.length} done. Nice going!` : "";
}));

// ---------- Feedback form ----------
document.getElementById("feedbackForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  document.getElementById("formMsg").textContent = `Thanks, ${name}! Your tip has been noted. 🌱`;
  e.target.reset();
});

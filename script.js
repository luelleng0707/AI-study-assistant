// 💼 List of All Available Functions
const allFunctions = [
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "todo", label: "To-Do", icon: "✅" },
  { id: "quotes", label: "Quotes", icon: "💬" },
  { id: "upload", label: "Upload", icon: "📤" },
  { id: "flashcards", label: "Cards", icon: "🧠" },
  { id: "pomodoro", label: "Pomodoro", icon: "🍅" },
  { id: "chatdoc", label: "ChatDoc", icon: "📄" }
];

// ✅ Functions selected by default
let selectedFunctions = ["calendar", "todo", "quotes"];

// 🔧 Get DOM elements up front so all functions can access
const sidebarButtons = document.getElementById("sidebar-buttons");
const menuOverlay = document.getElementById("menu-overlay");
const menuList = document.getElementById("menu-list");

// 🎨 Theme colors for selected cards
const appThemes = {
  calendar:   { bg: "#E0E7FF", border: "#6366F1", text: "#4338CA" },   // indigo
  todo:       { bg: "#DCFCE7", border: "#22C55E", text: "#15803D" },   // green
  quotes:     { bg: "#FCE7F3", border: "#EC4899", text: "#9D174D" },   // pink
  upload:     { bg: "#E0F2FE", border: "#38BDF8", text: "#0284C7" },   // sky
  flashcards: { bg: "#FEF9C3", border: "#EAB308", text: "#B45309" },   // yellow
  pomodoro:   { bg: "#FECACA", border: "#EF4444", text: "#B91C1C" },   // red
  chatdoc:    { bg: "#D1FAE5", border: "#10B981", text: "#047857" }    // emerald
};

// 🚀 Render visible buttons on sidebar
function renderSidebarButtons() {
  sidebarButtons.innerHTML = "";
  selectedFunctions.forEach(id => {
    const func = allFunctions.find(f => f.id === id);
    if (func) {
      const theme = appThemes[func.id];

      const btn = document.createElement("button");
      btn.className = "w-full py-2 flex items-center justify-center rounded-lg text-lg transition";
      btn.innerHTML = func.icon;
      btn.title = func.label;

      // Apply background/border if widget is open
      const isOpen = openWidgets.some(w => w.id === id);
      if (isOpen) {
        btn.style.backgroundColor = theme.bg;
        btn.style.border = `2px solid ${theme.border}`;
      } else {
        btn.style.backgroundColor = "transparent";
        btn.style.border = "2px solid transparent";
      }

      btn.onclick = () => openWindow(func.id, func.label);
      sidebarButtons.appendChild(btn);
    }
  });
}


// 🎛️ Show the toggle menu list with colored cards
function renderChecklistMenu() {
  menuList.innerHTML = "";
  allFunctions.forEach(func => {
    const isSelected = selectedFunctions.includes(func.id);
    const theme = appThemes[func.id];

    const card = document.createElement("div");
    card.className = "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition hover:scale-105";
    card.style.backgroundColor = isSelected ? theme.bg : "#F4F4F5"; // default gray
    card.style.border = isSelected ? `2px solid ${theme.border}` : "2px solid transparent";

    const icon = document.createElement("div");
    icon.innerText = func.icon;
    icon.className = "text-xl";

    const label = document.createElement("span");
    label.innerText = func.label;
    label.className = "text-sm font-medium";
    label.style.color = isSelected ? theme.text : "#333";

    card.onclick = () => {
      if (isSelected) {
        selectedFunctions = selectedFunctions.filter(id => id !== func.id);
      } else {
        selectedFunctions.push(func.id);
      }
      renderSidebarButtons();
      renderChecklistMenu();
    };

    card.appendChild(icon);
    card.appendChild(label);
    menuList.appendChild(card);
  });
}

// 🎯 Toggle visibility of checklist menu
document.getElementById("toggle-menu").onclick = () => {
  menuOverlay.classList.toggle("hidden");
};

// 🔓 Open window
let openWidgets = [];
function openWindow(id, title) {
  if (openWidgets.find(w => w.id === id)) return;

  const widget = document.createElement("div");
  widget.className = "app-window absolute top-24 bg-white/90 text-black rounded-xl shadow-xl z-20 overflow-hidden flex flex-col";
  widget.setAttribute("data-id", id);

  const header = document.createElement("div");
  header.className = "p-3 bg-gray-200 rounded-t-xl flex justify-between cursor-move unselectable";
  header.innerHTML = `
    <span>${title}</span>
    <button class="close-btn">❌</button>
  `;

  const body = document.createElement("div");
  body.className = "p-4 overflow-auto h-full flex-1";
  body.innerHTML = `<p>Loading ${title}...</p>`;

  const loader = window[id + "App"];
  if (typeof loader === "function") {
    loader(body);
  }

  widget.appendChild(header);
  widget.appendChild(body);
  document.body.appendChild(widget);

  openWidgets.push({ id, element: widget });
  layoutWidgets();

  // ❌ Close widget
  header.querySelector(".close-btn").onclick = () => {
    widget.remove();
    openWidgets = openWidgets.filter(w => w.id !== id);
    layoutWidgets();
  };

  // 🖱️ Make widget draggable
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = widget.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    widget.style.zIndex = 9999; // bring to front
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const widgetWidth = widget.offsetWidth;
  const widgetHeight = widget.offsetHeight;
  const sidebarWidth = 100;
  const maxX = window.innerWidth - widgetWidth;
  const maxY = window.innerHeight - widgetHeight;

  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  newX = Math.max(sidebarWidth + 8, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  widget.style.left = `${newX}px`;
  widget.style.top = `${newY}px`;
});

}

function layoutWidgets() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const sidebarWidth = document.getElementById("sidebar").offsetWidth + 32; // 16px margin on each side
  const spacing = 16;
  const maxWidth = 400;
  const maxHeight = 300;

  let x = sidebarWidth;
  let y = 100;
  let rowMaxHeight = 0;

  openWidgets.forEach(widgetObj => {
    const widget = widgetObj.element;
    const widgetWidth = Math.min(maxWidth, screenWidth / 2.5);
    const widgetHeight = maxHeight;

    // If widget would overflow horizontally, wrap to next row
    if (x + widgetWidth + spacing > screenWidth) {
      x = sidebarWidth;
      y += rowMaxHeight + spacing;
      rowMaxHeight = 0;
    }

    // If widget would overflow vertically, you can choose to:
    // A. hide/disable opening more
    // B. scale down others
    // C. make scrollable container — choose what fits your style

    widget.style.width = `${widgetWidth}px`;
    widget.style.height = `${widgetHeight}px`;
    widget.style.left = `${x}px`;
    widget.style.top = `${y}px`;

    x += widgetWidth + spacing;
    rowMaxHeight = Math.max(rowMaxHeight, widgetHeight);
  });
}


// // ❌ Close window
// function closeWindow() {
//   appWindow.classList.add("hidden");
// }

// // ✖️ Make close button actually work
// document.getElementById("close-btn").onclick = closeWindow;

// 🟢 Initial render on load
renderSidebarButtons();
renderChecklistMenu();

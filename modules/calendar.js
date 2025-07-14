// 📅 Google Calendar Widget (Simple iframe embed, no API)

function calendarApp(container) {
  container.innerHTML = `
    <div class="rounded-xl shadow-lg border bord w-full h-full">
<iframe src="https://calendar.google.com/calendar/embed?height=400&wkst=2&ctz=Asia%2FShanghai&showPrint=0&mode=WEEK&title=The%20ultimate%20calendar%20for%20my%20dumb%20ass&src=bGluaG5ndXllbmxpenp5QGdtYWlsLmNvbQ&src=bzEyM25ka2FsamliYWVqNWNxYWljMjNubmc4ZWU4cjRAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19lNDc1ZTFmYWQwYzBjOWJjZGFlOTA3NWQ4ZjQ5ZDAxZjJiMWIzOWRmMTFlMzc5NzI5ZmE5ZmFhNDg2MTJiZmViQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=dmkudmlldG5hbWVzZSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cHBuNzk0N0BueXUuZWR1&color=%23039be5&color=%237cb342&color=%23795548&color=%230b8043&color=%233f51b5" style="border-width:0" width="800" height="400" frameborder="0" scrolling="no"></iframe>    </div>
  `;
}

// 🧩 Register the widget to the sidebar
if (typeof registerWidget === 'function') {
  registerWidget('calendar', {
    icon: '📅',
    label: 'Calendar',
    onClick(container) {
      calendarApp(container);
    }
  });
}

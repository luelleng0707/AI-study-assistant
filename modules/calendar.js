const CLIENT_ID = '1094689951976-def8br3q5356okfq19d0fd1bupmuhf6r.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

function calendarApp(container) {
  container.innerHTML = `
    <div class="flex justify-between mb-2">
      <button id="signin" class="px-3 py-1 bg-blue-600 text-white rounded">Sign In</button>
      <button id="signout" class="px-3 py-1 bg-red-500 text-white rounded">Sign Out</button>
    </div>
    <div class="relative h-[220px] overflow-y-auto bg-white text-black rounded-md p-2 border" id="calendar-dayview">
      <div id="calendar-events" class="relative w-full"></div>
    </div>
  `;

  gapi.load('client:auth2', () => {
  gapi.client.init({
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {
    const auth = gapi.auth2.getAuthInstance();
    auth.isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(auth.isSignedIn.get());

    document.getElementById("signin").onclick = () => auth.signIn();
    document.getElementById("signout").onclick = () => auth.signOut();
  }).catch(error => {
    console.error("Google API init failed", error);
    alert("Google API failed to load: " + JSON.stringify(error, null, 2));
  });
});

}

function updateSigninStatus(isSignedIn) {
  console.log("Signin status changed:", isSignedIn);
  if (isSignedIn) {
    listTodayEvents();
  } else {
    document.getElementById("calendar-events").innerHTML =
      "<p class='text-gray-500'>Please sign in to see events.</p>";
  }
}


function listTodayEvents() {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

  gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: startOfDay,
    timeMax: endOfDay,
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  }).then(response => {
    const container = document.getElementById("calendar-events");
    container.innerHTML = '';

    // Draw hourly layout
    for (let i = 0; i < 24; i++) {
      const hourBlock = document.createElement('div');
      hourBlock.className = 'relative border-t h-10 text-xs text-gray-600 pl-2';
      hourBlock.innerText = `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? 'AM' : 'PM'}`;
      hourBlock.dataset.hour = i;
      container.appendChild(hourBlock);
    }

    // Render events
    const events = response.result.items || [];
    events.forEach(event => {
      const start = event.start.dateTime ? new Date(event.start.dateTime) : null;
      if (!start) return;

      const hour = start.getHours();
      const minutes = start.getMinutes();
      const offset = (hour * 60 + minutes) / 6; // scale: 0.5px per minute * 12

      const el = document.createElement('div');
      el.className = 'absolute left-24 right-2 bg-indigo-300 text-indigo-900 text-xs rounded px-2 py-1';
      el.style.top = `${offset}px`;
      el.innerText = `${event.summary || 'Untitled'} @ ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      container.appendChild(el);
    });

    addNowLine(container);
  });
}

function addNowLine(container) {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const offset = minutes / 6; // same scale as event blocks

  const line = document.createElement("div");
  line.className = "absolute w-full border-t-2 border-purple-500";
  line.style.top = `${offset}px`;
  container.appendChild(line);
}

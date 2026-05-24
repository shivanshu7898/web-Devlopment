
const API_KEY = "";
let tempC = null, feelsC = null, unit = 'C';
 
const icons = {
  "clear sky":"☀️","few clouds":"🌤️","scattered clouds":"⛅","broken clouds":"☁️",
  "overcast clouds":"☁️","light rain":"🌦️","moderate rain":"🌧️","heavy intensity rain":"⛈️",
  "rain":"🌦️","shower rain":"🌧️","thunderstorm":"⛈️","snow":"❄️","light snow":"🌨️",
  "mist":"🌫️","haze":"🌫️","fog":"🌫️","drizzle":"🌦️"
};
function getIcon(d) {
  d = d.toLowerCase();
  for (const [k,v] of Object.entries(icons)) if (d.includes(k)) return v;
  return "🌡️";
}
function toF(c) { return (c*9/5+32).toFixed(1); }
 
function switchUnit(u) {
  unit = u;
  document.getElementById('btnC').classList.toggle('active', u==='C');
  document.getElementById('btnF').classList.toggle('active', u==='F');
  if (tempC !== null) {
    document.getElementById('Temperature').textContent = u==='C' ? tempC.toFixed(1) : toF(tempC);
    document.getElementById('feels').textContent = (u==='C' ? feelsC.toFixed(1) : toF(feelsC)) + `°${u}`;
  }
}
 
function showErr(msg) {
  const e = document.getElementById('errMsg');
  e.textContent = msg; e.style.display = 'block';
  document.getElementById('weatherDiv').style.display = 'none';
}
 
async function get() {
  const city = document.getElementById('cityname').value.trim();
  if (!city) { showErr('Pehle sheher ka naam likho!'); return; }
  document.getElementById('errMsg').style.display = 'none';
  const btn = document.getElementById('btn');
  btn.textContent = '...'; btn.disabled = true;
 
  try {
    const geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
    const gd = await geo.json();
    if (!gd.length) throw new Error(`"${city}" nahi mila`);
 
    const { lat, lon } = gd[0];
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const d = await res.json();
 
    tempC = d.main.temp - 273.15;
    feelsC = d.main.feels_like - 273.15;
    const desc = d.weather[0].description;
 
    document.getElementById('cityName').textContent = d.name;
    document.getElementById('desc').textContent = desc;
    document.getElementById('icon').textContent = getIcon(desc);
    document.getElementById('Temperature').textContent = unit==='C' ? tempC.toFixed(1) : toF(tempC);
    document.getElementById('humidity').textContent = d.main.humidity + '%';
    document.getElementById('wind').textContent = (d.wind.speed * 3.6).toFixed(1) + ' km/h';
    document.getElementById('feels').textContent = (unit==='C' ? feelsC.toFixed(1) : toF(feelsC)) + `°${unit}`;
    document.getElementById('visibility').textContent = (d.visibility/1000).toFixed(1) + ' km';
 
    const w = document.getElementById('weatherDiv');
    w.style.display = 'none'; void w.offsetWidth; w.style.display = 'block';
  } catch(e) {
    showErr(e.message || 'Kuch gadbad ho gayi, dobara try karo');
  } finally {
    btn.textContent = 'Dekho'; btn.disabled = false;
  }
}
 
document.getElementById('cityname').addEventListener('keydown', e => { if (e.key==='Enter') get(); });

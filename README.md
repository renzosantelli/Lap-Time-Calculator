# 🏁 Lap Time Calculator

A lightweight web app to log your lap times, compare them and see how you're improving, session by session. Built for sim racing (GT7, ACC...) but it works with any lap time you type in.

**[🔗 Live demo](https://renzosantelli.github.io/Lap-Time-Calculator/)** · **[👤 My GitHub profile](https://github.com/renzosantelli)**

> ⚠️ The interface is in Spanish.

---

## ✨ What you can do

- **Create sessions** and name them (a circuit, a car, whatever you want).
- **Log lap times** in `m:ss.sss` format (example: `1:32.654`).
- **Get instant stats** for each session: fastest lap, slowest lap and average lap.
- **See your telemetry** in a bar chart: one bar per lap, the fastest lap is the tallest.
- **Compare your last lap against your best lap** with a green/red progress bar (faster or slower, and by how much).
- **Check the dashboard** with your 4 most recent sessions, including how much faster your best lap is compared to your average.
- **Browse your full history** of sessions and jump back into any of them to keep logging laps.
- **Reset a session** to clear all its laps in one click.

## 🚫 What you can't do (yet)

- **Save data between visits:** everything lives in memory, so refreshing or closing the tab erases all sessions.
- **Delete or edit a single lap, or delete a session** (only the whole-session reset exists).
- **Log a lap with the Enter key:** you have to click *Registrar*.
- **Use it comfortably on a phone:** the layout isn't responsive yet.
- **Import or export your data.**
- **Type times freely:** there is no input validation yet, so only `m:ss.sss` with a dot works. Anything else (letters, commas, empty input) gives wrong results.
- **See more than 4 sessions on the dashboard:** the rest are only in the history.

## 🛠️ Built with

| Technology | Used for |
| --- | --- |
| **HTML5** | Structure of the three views (dashboard, active session, history) |
| **CSS3** | Layout with Flexbox and Grid, dark theme, bar chart and progress bars |
| **JavaScript (vanilla)** | All the logic: DOM manipulation, sessions, stats, chart |
| **Git & GitHub** | Version control |
| **GitHub Pages** | Hosting |

No frameworks, no libraries: everything is written from scratch.

## 🚀 Run it locally

1. Clone the repo:
   ```bash
   git clone https://github.com/renzosantelli/Lap-Time-Calculator.git
   ```
2. Open `index.html` in your browser. That's it, no installation needed.

## 🗺️ Roadmap (v2)

- [ ] Persistent data
- [ ] Input validation and handling of invalid entries
- [ ] Log laps with Enter
- [ ] Delete individual laps
- [ ] Responsive design for mobile
- [ ] Import / export history

## 📚 About this project

My first real JavaScript project, made while learning to code. I built it to solve a real need: tracking my own lap times when I race.

---

Made by [Renzo](https://github.com/renzosantelli)

<p align="center">
  <a href="https://wtformat.com">
    <img src="https://raw.githubusercontent.com/rosslh/wtformat.com/master/icon.png" height="50px" width="50px" alt="WTFormat icon">
  </a>
</p>

<h1 align="center">WTFormat</h1>

<p align="center">
  <a href="https://wtformat.com">WTFormat</a> generates date format codes for <a href="https://date-fns.org/">date-fns</a>, <a href="http://momentjs.com/">Moment.js</a>, <a href="https://day.js.org/en/">Day.js</a>, and <a href="https://moment.github.io/luxon/">Luxon</a>. Type a date the way you want it to look, and get back the corresponding format string for each library.
</p>

<p align="center">
  <img src="https://img.shields.io/uptimerobot/status/m792388136-54c69a8ccd79b274ed4f8105?up_message=online&style=flat&label=Status" alt="Uptime Robot status">
  <img src="https://img.shields.io/uptimerobot/ratio/m792388136-54c69a8ccd79b274ed4f8105?style=flat&label=Uptime%20(1mo)" alt="Uptime Robot ratio (30 days)">
  <a href="https://mapledeploy.ca"><img src="https://mapledeploy.ca/api/badge/shields" alt="Hosted in Canada with MapleDeploy"></a>
</p>

## How it works

Each JavaScript date library uses its own format tokens. `Sat, Jun 24` is `ddd, MMM D` in Moment.js, `EEE, MMM d` in date-fns, and `ccc, LLL d` in Luxon. Memorizing these is tedious, and looking them up breaks your flow.

WTFormat skips the lookup. You type the date as you want it rendered, click "generate", and the app returns the matching format code for every supported library side by side. Copy the one you need and paste it into your project.

## Built with

[Nuxt.js](https://nuxt.com/), [Vue](https://vuejs.org/), and [TypeScript](https://www.typescriptlang.org/).

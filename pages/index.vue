<template>
  <div class="mainContent">
    <div class="header">
      <h1 class="wtformat">
        <span class="wtf">WTF</span>ormat!?
      </h1>
      <p>
        A simple utility for generating
        <a href="http://momentjs.com/docs/#/displaying/format/">moment.js</a> date format codes. By
        <a href="https://rosshill.ca">Ross Hill</a>.
      </p>
    </div>
    <div class="getFormat">
      <h2>Get format</h2>
      <p>
        Enter the following date in your preferred format:
        <br>
        <br>
        <code id="shownDate">
          {{ time && moment(time).format('dddd, MMMM D, YYYY h:mm:ss A') }}
        </code>
      </p>
      <br>
      <input
        id="input"
        v-model="userInput"
        type="text"
        :placeholder="time && moment(time).format('YYYY-MM-DD')"
      >
      <button class="generate" @click="formats = getFormats(moment(time), userInput)">
        Generate
      </button>
    </div>
    <div class="formatOutput">
      <h2>Moment format code:</h2>
      <ul id="output">
        <li v-if="!formats.length">
          Enter a date and click generate to see your date format!
        </li>
        <li v-for="format in formats" :key="format">
          <code>
            {{ format }}
          </code>
        </li>
      </ul>
    </div>
    <div class="why">
      <h2>What is it?</h2>
      <p>
        Ever find yourself asking, <em>what moment.js date format is this?</em>
      </p>
      <p>
        WTFormat provides an easy way to generate the code to pass into
        <code>moment().format</code> that results in your desired date-time format.
      </p>
      <p>
        <strong>Note</strong>: at this time, only English day & month names are supported.
      </p>
      <h2>How do I use it?</h2>
      <ol>
        <li>Look at the date-time given</li>
        <li>Write that date-time in the format you want moment to output</li>
        <li>Click "generate"</li>
      </ol>
      <p>
        It's that easy!
      </p>
    </div>
    <div class="examples">
      <h2>Examples</h2>
      <table>
        <tr>
          <th>Format</th>
          <th>Code</th>
        </tr>
        <tr>
          <td>
            Thu. September 6, 2012 at 8:45 AM
          </td>
          <td>
            <code>
              ddd. MMMM D, YYYY [at] h:mm A
            </code>
          </td>
        </tr>
        <tr>
          <td>
            2012-09-06, 8 h 45
          </td>
          <td>
            <code>
              YYYY-MM-DD, H [h] mm
            </code>
          </td>
        </tr>
        <tr>
          <td>
            Sep. 6th '12
          </td>
          <td>
            <code>
              MMM. Do 'YY
            </code>
          </td>
        </tr>
        <tr>
          <td>The 6th of September, 2012</td>
          <td>
            <code>
              [The] Do [of] MMMM, YYYY
            </code>
          </td>
        </tr>
      </table>
    </div>
    <div />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import { evaluateDate } from '../js/main';
import { dates } from '../js/constants';

interface DataInterface {
  time: Date,
  userInput: string,
  formats: string[]
}

let time: Date;
const data: DataInterface = {
  time,
  userInput: '',
  formats: []
};

export default Vue.extend({
  asyncData: async () => {
    return { time: moment(dates[Math.floor(Math.random() * dates.length)], 'X').toDate() };
  },

  data: () => data,

  methods: {
    getFormats: evaluateDate,
    moment
  }
});
</script>

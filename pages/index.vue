<template>
  <div class="root">
    <div class="header">
      <div class="contentWrapper">
        <h1 class="wtformat">
          <span class="wtf">WTF</span>ormat!?
        </h1>
        <p>
          A simple utility for generating
          <a href="https://date-fns.org/" target="_blank" rel="noopener noreferrer">date-fns</a>,
          <a href="http://momentjs.com/" target="_blank" rel="noopener noreferrer">Moment.js</a>,
          and <a href="https://day.js.org/en/" target="_blank" rel="noopener noreferrer">Day.js</a>
          format codes. By <a href="https://rosshill.ca">Ross Hill</a>.
        </p>
      </div>
    </div>
    <div class="mainContent contentWrapper">
      <div>
        <h2>Enter this date in your preferred format:</h2>
        <p>
          <code>
            {{ typeof window !== "undefined" && time
              ? moment(time).format("h:mm:ss A, dddd, MMMM D, [Q]Q, YYYY")
              : '\xa0'.repeat(32)
            }}
          </code>
        </p>
        <form onsubmit="return false;">
          <fieldset>
            <input
              ref="userInput"
              v-model="userInput"
              type="text"
              :placeholder="typeof window !== 'undefined' && time ? `e.g. ${moment(time).format('YYYY-MM-DD')}` : ''"
            >
            <button
              class="button"
              @click="getFormats(time, userInput, formats); $refs.userInput.focus();"
            >
              Generate Codes
            </button>
            <!-- <button class="button" @click="generateDates()">
              Generate
            </button> -->
          </fieldset>
        </form>
      </div>
      <div>
        <h2>Format codes:</h2>
        <p v-if="![...formats.moment, ...formats.dateFns, ...formats.dayJs].length">
          Enter a date and click generate to see your date format!
        </p>
        <table v-if="[...formats.moment, ...formats.dateFns, ...formats.dayJs].length">
          <tbody>
            <tr>
              <td>date-fns</td>
              <td>
                <code v-for="format in formats.dateFns" :key="format">{{ format }}</code>
              </td>
            </tr>
            <tr>
              <td>Moment</td>
              <td>
                <code v-for="format in formats.moment" :key="format">{{ format }}</code>
              </td>
            </tr>
            <tr>
              <td>Day.js</td>
              <td>
                <code v-for="format in formats.dayJs" :key="format">{{ format }}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import moment from 'moment';

import { evaluateDate /*, generateDates */ } from '../js/main';
import { dates } from '../js/constants';

interface FormatsInterface {
  moment: string[];
  dateFns: string[];
  dayJs: string[];
}

interface DataInterface {
  window?: Window;
  time?: Date;
  userInput: string;
  formats: FormatsInterface;
}

const time = undefined;
const data: DataInterface = {
  window: typeof window !== 'undefined' ? window : undefined,
  time,
  userInput: '',
  formats: { moment: [], dateFns: [], dayJs: [] }
};

export default Vue.extend({
  asyncData: () => {
    return {
      time: moment(
        dates[Math.floor(Math.random() * dates.length)],
        'X'
      ).toDate()
    };
  },

  data: () => data,

  methods: {
    getFormats (time: Date, userInput: string, formats: FormatsInterface) {
      formats.dateFns = evaluateDate(time, userInput, 'dateFns');
      formats.moment = evaluateDate(time, userInput, 'moment');
      formats.dayJs = evaluateDate(time, userInput, 'dayJs');
    },
    moment
    // , generateDates
  }
});
</script>

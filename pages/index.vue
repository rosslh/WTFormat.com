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
      <button class="generate" @click="getFormats(time, userInput, formats)">
        Generate Codes
      </button>
    </div>
    <div class="formatOutput">
      <h2>Format codes:</h2>
      <div v-if="!formats.moment.concat(formats.dateFns).length">
        Enter a date and click generate to see your date format!
      </div>
      <table>
        <tbody>
          <tr>
            <td>Moment</td>
            <td>
              <code v-for="format in formats.moment" :key="format">
                {{ format }}
              </code>
            </td>
          </tr>
          <tr>
            <td>date-fns</td>
            <td>
              <code v-for="format in formats.dateFns" :key="format">
                {{ format }}
              </code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

import { evaluateDate } from '../js/main';
import { dates } from '../js/constants.js';

interface FormatsInterface {
  moment: string[],
  dateFns: string[],
}

interface DataInterface {
  time: Date,
  userInput: string,
  formats: FormatsInterface
}

const time = new Date();
const data: DataInterface = {
  time,
  userInput: '',
  formats: { moment: [], dateFns: [] }
};

export default Vue.extend({
  asyncData: async () => {
    return { time: moment(dates[Math.floor(Math.random() * dates.length)], 'X').toDate() };
  },

  data: () => data,

  methods: {
    getFormats: (time: Date, userInput: string, formats: FormatsInterface) => {
      formats.moment = evaluateDate(time, userInput, 'moment');
      formats.dateFns = evaluateDate(time, userInput, 'dateFns');
    },
    moment
  }
});
</script>

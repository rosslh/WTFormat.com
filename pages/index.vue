<template>
  <div class="root">
    <div class="header">
      <div class="contentWrapper">
        <h1 class="wtformat"><span class="wtf">WTF</span>ormat!?</h1>
        <p>
          A simple utility for generating
          <a
            href="https://date-fns.org/"
            target="_blank"
            rel="noopener noreferrer"
            >date-fns</a
          >,
          <a
            href="http://momentjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            >Moment.js</a
          >,
          <a
            href="https://day.js.org/en/"
            target="_blank"
            rel="noopener noreferrer"
            >Day.js</a
          >, and
          <a
            href="https://moment.github.io/luxon/"
            target="_blank"
            rel="noopener noreferrer"
            >Luxon</a
          >
          format codes. By <a href="https://rosshill.ca">Ross Hill</a>.
        </p>
      </div>
    </div>
    <div class="toolContent contentWrapper">
      <div>
        <h2>Enter this date in your preferred format:</h2>
        <p>
          <code>
            {{
              typeof window !== "undefined" && time
                ? moment(time).format("h:mm:ss A, dddd, MMMM D, [Q]Q, YYYY")
                : "\xa0".repeat(32)
            }}
          </code>
        </p>
        <form onsubmit="return false;">
          <fieldset>
            <input
              ref="userInput"
              v-model="userInput"
              type="text"
              :placeholder="
                typeof window !== 'undefined' && time
                  ? `e.g. ${moment(time).format('YYYY-MM-DD')}`
                  : ''
              "
            />
            <button
              class="button"
              @click="handleClick(userInput, formats, time)"
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
        <p
          class="noFormats"
          v-if="
            ![
              ...formats.moment,
              ...formats.dateFns,
              ...formats.dayJs,
              ...formats.luxon
            ].length
          "
        >
          Enter a date and click generate to see your date format!
        </p>
        <table
          v-if="
            [
              ...formats.moment,
              ...formats.dateFns,
              ...formats.dayJs,
              ...formats.luxon
            ].length
          "
        >
          <tbody>
            <tr>
              <td>date-fns</td>
              <td>
                <code v-for="format in formats.dateFns" :key="format">{{
                  format
                }}</code>
              </td>
            </tr>
            <tr>
              <td>Moment.js</td>
              <td>
                <code v-for="format in formats.moment" :key="format">{{
                  format
                }}</code>
              </td>
            </tr>
            <tr>
              <td>Day.js</td>
              <td>
                <code v-for="format in formats.dayJs" :key="format">{{
                  format
                }}</code>
              </td>
            </tr>
            <tr>
              <td>Luxon</td>
              <td>
                <code v-for="format in formats.luxon" :key="format">{{
                  format
                }}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="contentWrapper starOnGitHub">
      If you found this tool useful, please consider giving it a star on GitHub!
      <a
        class="githubButton"
        href="https://github.com/rosslh/wtformat"
        rel="noopener"
        target="_blank"
        aria-label="Star rosslh/wtformat on GitHub"
        ><svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          class="octicon octicon-star"
          aria-hidden="true"
        >
          <path
            d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
          ></path>
        </svg>
        &nbsp;
        <span>Star</span>
      </a>
    </div>
    <Article />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import { evaluateDate /*, generateDates */ } from "../js/main";
import { dates } from "../js/constants";
import Article from "~/components/Article/Article.vue";

interface FormatsInterface {
  moment: string[];
  dateFns: string[];
  dayJs: string[];
  luxon: string[];
}

interface DataInterface {
  window?: Window;
  time?: Date;
  userInput: string;
  formats: FormatsInterface;
}

const time = undefined;
const data: DataInterface = {
  window: typeof window !== "undefined" ? window : undefined,
  time,
  userInput: "",
  formats: { moment: [], dateFns: [], dayJs: [], luxon: [] }
};

const getFormats = (
  time: Date,
  userInput: string,
  formats: FormatsInterface
) => {
  formats.dateFns = evaluateDate(time, userInput, "dateFns");
  formats.moment = evaluateDate(time, userInput, "moment");
  formats.dayJs = evaluateDate(time, userInput, "dayJs");
  formats.luxon = evaluateDate(time, userInput, "luxon");
};

export default Vue.extend({
  asyncData: () => {
    return {
      time: moment(
        dates[Math.floor(Math.random() * dates.length)],
        "X"
      ).toDate()
    };
  },

  data: () => data,

  methods: {
    getFormats,
    moment,
    handleClick(userInput: string, formats: FormatsInterface, time?: Date) {
      if (time) {
        getFormats(time, userInput, formats);
        (this.$refs.userInput as HTMLInputElement).focus();
      }
    }
    // generateDates
  },

  components: {
    Article
  }
});
</script>

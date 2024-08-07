<template>
  <div class="contentWrapper articleContent">
    <h2>What is this tool?</h2>
    <p>
      Formatting dates is a common task in web development. Date formatting
      libraries usually require two inputs: a <strong>date</strong> and a
      <strong>format code</strong>. Figuring out the correct format code for a
      desired date format can be challenging and time-consuming. For example,
      achieving the date format <code>{{ formattedDate }}</code> in Moment.js
      requires the format code <code>ddd, MMM D</code>.
    </p>
    <p>
      WTFormat simplifies this process. This user-friendly tool gives you a date
      which you then rewrite in your desired format. When you click "generate",
      WTFormat outputs the corresponding format code for various popular date
      libraries, including date-fns, Moment.js, Day.js, and Luxon. This
      eliminates the need to memorize or search for format codes, saving you
      time and effort.
    </p>

    <h3>Who can benefit from WTFormat?</h3>
    <ul>
      <p>
        <b>Front-End Developers:</b> Quickly implement consistent date formats
        without needing to look up format codes.
      </p>
      <p>
        <b>Full-Stack Developers:</b> Seamlessly transition between projects
        using different date libraries.
      </p>
      <p>
        <b>Beginners:</b> Learn how different libraries handle date formatting
        through an easy-to-understand interface.
      </p>
      <p>
        <b>Project Managers:</b> Communicate desired date formats clearly and
        effectively to developers.
      </p>
    </ul>
    <h3>Conclusion</h3>
    <p>
      WTFormat is a valuable tool for developers of all skill levels. It
      streamlines the date formatting process, saving time and reducing
      frustration. By making date formatting easier, WTFormat contributes to
      increased productivity and improved code quality. As web development
      continues to evolve, tools like WTFormat play a crucial role in
      simplifying common tasks and allowing developers to focus on creating
      innovative and engaging web experiences.
    </p>
  </div>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    formattedDate() {
      return moment().format("ddd, MMM D");
    },
  },
};
</script>

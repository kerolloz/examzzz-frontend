<script lang="ts">
  import api, { type ScoreDTO } from "../services/api";
  let scores = api.scores.getAll();
  const exams = api.exams.getAll();

  function getScoreClass(row: ScoreDTO) {
    return row.score >= row.totalScore / 2 ? "" : "negative";
  }

  function searchByExam(e) {
    const examId = e.target.value;
    scores = api.scores.getAll({ examId });
  }
</script>

<div>
  <h1>Score Dashboard</h1>

  <div class="ui form">
    <div class="field">
      <label for="exam">Exam</label>
      <select id="exam" class="ui search dropdown" on:change={searchByExam}>
        <option value="">Select Exam</option>
        {#await exams then exams}
          {#each exams as exam}
            <option value={exam.id}>{exam.name}</option>
          {/each}
        {/await}
      </select>
    </div>
  </div>

  <table
    class="ui inverted center aligned unstackable striped celled structured table"
  >
    <thead>
      <tr>
        <th rowspan="2">Exam</th>
        <th colspan="3">Student</th>
        <th rowspan="2">Total Score</th>
      </tr>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Score</th>
      </tr>
    </thead>
    {#await scores then scores}
      <tbody>
        {#each scores as score}
          <tr class={getScoreClass(score)}>
            <td>{score.exam.name}</td>
            <td>{score.student.name}</td>
            <td>{score.student.age}</td>
            <td>{score.score}</td>
            <td>{score.totalScore}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">
            <b>Total: </b>
            {scores.length}
          </td>
        </tr>
      </tfoot>
    {:catch error}
      <p>
        Something went wrong:
        {error.message}
      </p>
    {/await}
  </table>
</div>

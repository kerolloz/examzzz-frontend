<script>
  import ExamQuestion from "../components/ExamQuestion.svelte";
  import api from "../services/api";

  export let examId;

  const examQuestions = api.exams.questions.getAll(examId);
  const exam = api.exams.getAll().then((exams) => {
    return exams.find((exam) => exam.id.toString() === examId.toString());
  });
</script>

<div class="exam-questions">
  {#await exam}
    <p>Loading exam..</p>
  {:then exam}
    <h1 class="ui header">
      <i class="code icon" />
      <div class="content">Exam ~ {exam.name}</div>
      <div class="sub header">Duration: {exam.duration} Minutes</div>
    </h1>
  {/await}

  {#await examQuestions}
    <p>Loading Questions..</p>
  {:then examQuestions}
    <h5 class="ui dividing header">
      Number of Questions: {examQuestions.length}
    </h5>

    {#each examQuestions as examQuestion}
      <ExamQuestion {examQuestion} />
    {/each}
  {/await}
</div>

<style scoped>
  .exam-questions {
    font-size: larger;
  }
</style>

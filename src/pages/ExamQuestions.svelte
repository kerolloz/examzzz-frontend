<script>
  import { navigate } from "svelte-routing";
  import ExamQuestion from "../components/ExamQuestion.svelte";
  import { shuffle } from "../helpers/shuffle";
  import api from "../services/api";

  export let examId;
  let timer = 120;

  const examQuestions = api.exams.questions.getAll(examId).then((questions) => {
    return shuffle(questions);
  });
  const exam = api.exams.getAll().then((exams) => {
    const foundExam = exams.find(
      (exam) => exam.id.toString() === examId.toString()
    );
    timer = foundExam.duration;
    const interval = setInterval(() => {
      timer--;
      if (timer === 0) {
        clearInterval(interval);
        submitExam();
      }
    }, 1000 * 60);
    return foundExam;
  });

  function submitExam() {
    navigate("/thanks");
  }
</script>

<div class="exam-questions">
  {#await exam}
    <p>Loading exam..</p>
  {:then exam}
    <h1 class="ui header">
      <i class="code icon" />
      <div class="content">Exam ~ {exam.name}</div>
    </h1>
    <div class="ui medium grey inverted tag label">
      <div class="sub header">Duration: {exam.duration} Minutes</div>
    </div>
  {/await}

  {#await examQuestions}
    <p>Loading Questions..</p>
  {:then examQuestions}
    <div class="ui medium teal inverted tag label">
      <div class="sub header">Number of Questions: {examQuestions.length}</div>
    </div>
    <h5 class="ui medium dividing header">
      Remaining time: {timer} Minute(s)
      <br />
    </h5>

    {#each examQuestions as examQuestion}
      <ExamQuestion {examQuestion} />
    {/each}
  {/await}

  <button
    class="big blue basic ui animated button"
    type="submit"
    on:click|preventDefault={submitExam}
  >
    <div class="visible content">Finish Exam</div>
    <div class="hidden content">
      <i class="check square icon" />
    </div>
  </button>
</div>

<style scoped>
  .exam-questions {
    font-size: mediumr;
  }
</style>

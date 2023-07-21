<script>
  // import * as jq from "jquery";
  import api from "../services/api";

  export let examId;

  function saveSelectedAnswer(answer, examQuestionId) {
    api.exams.questions.answer(examQuestionId, answer);
  }

  const examQuestions = api.exams.questions.getAll(examId);
</script>

<div class="exam-questions">
  <h1>Exam questions</h1>
  {#await examQuestions}
    <p>Loading Questions..</p>
  {:then examQuestions}
    {#each examQuestions as examQuestion}
      <div class="grouped fields question-element">
        <p>{examQuestion.id}</p>
        <label for="">{examQuestion.question.text}</label>
        {#each examQuestion.question.answers as answer}
          <div class="field answer-element">
            <div class="ui radio checkbox">
              <input
                type="radio"
                name="a-{examQuestion.id}"
                value={answer}
                on:change={() => saveSelectedAnswer(answer, examQuestion.id)}
              />
              <label for="">{answer}</label>
            </div>
          </div>
        {/each}
      </div>
    {/each}
  {/await}
</div>

<style scoped>
  .exam-questions {
    font-size: larger;
  }
  .question-element {
    margin: 25px;
  }
  .answer-element {
    margin: 10px;
  }
</style>

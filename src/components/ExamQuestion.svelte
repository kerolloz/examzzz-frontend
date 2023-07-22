<script lang="ts">
  import colors from "../assets/colors.json";
  import api, { type ExamQuestionDTO } from "../services/api";
  import { colorsIndex } from "../stores/auth";

  export let examQuestion: ExamQuestionDTO;

  colorsIndex.update((n) => n + 1);

  const i = $colorsIndex;

  function saveSelectedAnswer(answer, examQuestionId) {
    api.exams.questions.answer(examQuestionId, answer);
  }
</script>

<div class="ui big segment {colors[i % colors.length]}">
  <div class="grouped fields question-element">
    <p>
      <label for="">{examQuestion.question.text}</label>
    </p>
    <div>
      {#if examQuestion.question.imageUrl}
        <img src={examQuestion.question.imageUrl} alt="" />
      {/if}
    </div>

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
</div>

<style scoped>
  .question-element {
    margin: 5px;
  }
  .answer-element {
    margin: 10px;
  }
</style>

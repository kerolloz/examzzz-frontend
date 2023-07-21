<script>
  import api from "../services/api";

  const exams = api.exams.getAll();
</script>

<div>
  <h1>Exams</h1>
  <ul>
    {#await exams}
      <p>Loading exams...</p>
    {:then exams}
      {#each exams as exam}
        <li>
          <a href="/exams/{exam.id}">{exam.name}: {exam.duration}</a>
        </li>
      {/each}
    {:catch error}
      <p class="text-red-600 text-xl text-center">
        Something went wrong.
        <br /> Couldn't fetch articles!<br />
        <span class="text-gray-500 text-sm">{error.message}</span>
      </p>
    {/await}
  </ul>
</div>

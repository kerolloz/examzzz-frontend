<script>
  import { Link } from "svelte-routing";
  import api from "../services/api";

  const exams = api.exams.getAll();
</script>

<div>
  <h1>Exams</h1>

  {#await exams}
    <p>Loading exams...</p>
  {:then exams}
    <div class="ui large relaxed divided list">
      {#each exams as exam}
        <div class="item">
          <i class=" large code middle aligned icon" />
          <div class="content">
            <Link class="header" to="/exams/{exam.id}">{exam.name}</Link>
            <div class="description">Duration: {exam.duration} Minutes</div>
          </div>
        </div>
      {/each}
    </div>
  {:catch error}
    <p>Something went wrong.</p>
    <p>Couldn't fetch Exams!</p>
    <p>{error.message}</p>
  {/await}
</div>

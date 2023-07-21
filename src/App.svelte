<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import Exams from "./pages/Exams.svelte";
  import Register from "./pages/Register.svelte";
  import { userStore } from "./stores/auth";
  export let url = "";
</script>

<main class="main-wrapper">
  <div class="ui middle aligned grid vertical stripe middle-content">
    <div class="ui container">
      {#if $userStore}
        <p>Logged in as "{$userStore.name}".</p>
      {/if}
      <Router {url}>
        <Route path="/">
          <Register />
        </Route>
        <Route path="/exams">
          <Exams />
        </Route>
      </Router>
    </div>
  </div>
</main>

<style>
  .main-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .middle-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

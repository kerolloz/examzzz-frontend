<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import Register from "./components/Register.svelte";
  export let url = "";
</script>

<main class="main-wrapper">
  <div class="ui middle aligned grid vertical stripe middle-content">
    <div class="ui container">
      <Router {url}>
        <Route path="/">
          <Register />
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

<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import AdminLogin from "./pages/AdminLogin.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import ExamQuestions from "./pages/ExamQuestions.svelte";
  import Exams from "./pages/Exams.svelte";
  import Register from "./pages/Register.svelte";
  import ThanksPage from "./pages/ThanksPage.svelte";
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
        <Route path="/exams/:examId" let:params>
          <ExamQuestions examId={params.examId} />
        </Route>
        <Route path="thanks">
          <ThanksPage />
        </Route>
        <Route path="administrator">
          <AdminLogin />
        </Route>
        <Route path="dashboard">
          <Dashboard />
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

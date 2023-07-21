<script lang="ts">
  import { navigate } from "svelte-routing";
  import api from "../services/api";
  import { saveToken, saveUser } from "../stores/auth";

  function register(e) {
    const name = e.target.name.value;
    const age = e.target.age.value;
    api.users
      .signup({ name, age })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          saveToken(data.data.token);
          saveUser(data.data.user);
          return navigate("/exams");
        }
        console.error("Error response", response.data, response.status);
      })
      .catch(console.error);
  }
</script>

<main class="register-form">
  <div class="ui blue inverted segment register-form-container">
    <center>
      <h1>Welcome To The Final Exam</h1>
      <h2>Please fill in the form below to start the exam</h2>
      <br />
    </center>
    <form class="ui big inverted form" on:submit|preventDefault={register}>
      <div class="field">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          minlength="3"
          maxlength="100"
          required
        />
      </div>
      <div class="field">
        <label for="age">Age</label>
        <input
          required
          type="number"
          name="age"
          placeholder="Age"
          min="1"
          max="100"
        />
      </div>

      <button class="ui button" type="submit">Start Exam</button>
    </form>
  </div>
</main>

<style scoped>
  .register-form-container {
    padding: 50px;
  }
</style>

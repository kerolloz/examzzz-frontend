<script>
  import { navigate } from "svelte-routing";
  import api from "../services/api";
  import { removeUser, saveToken } from "../stores/auth";

  function loginAdmin(e) {
    const username = e.target.username.value;
    const password = e.target.password.value;
    api.admins
      .login({ username, password })
      .then((response) => {
        if (response) {
          const token = response;
          saveToken(token);
          removeUser();
          navigate("/dashboard");
        }
        console.error("Error response", response);
      })
      .catch(console.error);
  }
</script>

<div class="ui inverted segment">
  <form
    class="ui big inverted form admin-form"
    on:submit|preventDefault={loginAdmin}
  >
    <div class="required field">
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="Username"
        required
      />
    </div>
    <div class="required field">
      <label for="password"> Password</label>
      <input required id="password" type="password" placeholder="Password" />
    </div>
    <button class="ui inverted button" type="submit">Login</button>
  </form>
</div>

<style scoped>
  .admin-form {
    padding: 20px;
  }
  .required.field {
    margin-bottom: 50px;
  }

  .required.field > label {
    margin-bottom: 20px;
  }
</style>

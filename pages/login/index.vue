<template>
  <div class="container d-flex justify-content-center align-items-center vh-100 bg-light">
    <div
      class="card shadow-lg d-flex flex-row rounded-4 overflow-hidden"
      style="width: 800px"
    >
      <div class="card-body w-50 p-5 bg-white">
        <h2 class="mb-4 fw-bold text-center text-primary">Welcome Back 👋</h2>
        <form @submit.prevent="Login">
          <div class="mb-4">
            <label for="email" class="form-label">Email Address</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control rounded-pill px-4 py-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control rounded-pill px-4 py-2"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 shadow-sm">
            Masuk
          </button>
        </form>
      </div>
      <div
        class="w-50 d-flex flex-column align-items-center justify-content-center bg-primary text-white p-4 position-relative"
      >
        <h1 class="mb-3">CALL EVENT</h1>
        <p class="text-center px-3">
          Organize and join the most exciting events. Let’s make it happen!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "LOGIN" });

definePageMeta({
  layout: "login",
});

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

const Login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert("Password atau email Anda salah");
  } else {
    navigateTo("../");
  }
};
</script>

<style scoped>
input:focus,
button:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  outline: none;
}

button:hover {
  background-color: #0d6efdcc;
  transition: 0.3s ease;
}

.bg-light {
  background-color: #f8f9fa !important;
}
</style>

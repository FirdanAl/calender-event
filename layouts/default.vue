<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar bg-primary text-white p-3">
      <h4 class="text-white mb-4 d-flex align-items-center">
        <i class="bi bi-calendar-event-fill me-2"></i>EventCal
      </h4>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <NuxtLink to="/" class="nav-link nav-custom" exact-active-class="active">
            <i class="bi bi-speedometer2 me-2"></i> Dashboard
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink
            to="/events/new"
            class="nav-link nav-custom"
            exact-active-class="active"
          >
            <i class="bi bi-calendar-plus me-2"></i> Events
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink to="/reports" class="nav-link nav-custom" exact-active-class="active">
            <i class="bi bi-bar-chart-line me-2"></i> Reports
          </NuxtLink>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link nav-custom" @click.prevent="handleLogout">
            <i class="bi bi-box-arrow-right me-2"></i> Logout
          </a>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content flex-grow-1 p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const router = useRouter();

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    router.push("/login");
  } else {
    console.error("Logout gagal:", error.message);
  }
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.main-content {
  margin-left: 240px;
  min-height: 100vh;
}

.nav-custom {
  color: white;
  transition: background-color 0.2s ease;
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
}

.nav-custom:hover {
  background-color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
  color: #ffffff;
}

.nav-custom.active {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}
</style>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
</style>

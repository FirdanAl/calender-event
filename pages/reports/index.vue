<template>
  <div class="container mt-4">
    <h2 class="mb-4">Event List</h2>

    <div class="row mb-3 g-2">
      <div class="col-md-4">
        <input
          v-model="filters.title"
          class="form-control"
          placeholder="Filter by title"
        />
      </div>
      <div class="col-md-3">
        <input type="date" v-model="filters.startDate" class="form-control" />
      </div>
      <div class="col-md-3">
        <input type="date" v-model="filters.endDate" class="form-control" />
      </div>
      <div class="col-md-1">
        <button @click="fetchEvents" class="btn btn-primary w-100">
          <i class="bi bi-funnel-fill"></i>
        </button>
      </div>
      <div class="col-md-1">
        <button @click="clearFilters" class="btn btn-outline-secondary w-100">
          <i class="bi bi-x-circle"></i>
        </button>
      </div>
    </div>

    <table class="table table-striped table-bordered align-middle">
      <thead class="table-dark">
        <tr>
          <th>Title</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Location</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in paginatedEvents" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ formatDate(event.start_time) }}</td>
          <td>{{ formatDate(event.end_time) }}</td>
          <td>{{ event.location }}</td>
          <td>
            <span
              :class="{
                'badge bg-danger': isPast(event.end_time),
                'badge bg-success': !isPast(event.end_time),
              }"
            >
              <i :class="isPast(event.end_time) ? 'bi bi-x-circle' : 'bi bi-clock'"></i>
              {{ isPast(event.end_time) ? "Past" : "Upcoming" }}
            </span>
          </td>
        </tr>
        <tr v-if="paginatedEvents.length === 0">
          <td colspan="5" class="text-center">No events found.</td>
        </tr>
      </tbody>
    </table>

    <nav v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <a class="page-link" href="#" @click.prevent="page--">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="p in totalPages"
          :key="p"
          :class="{ active: page === p }"
        >
          <a class="page-link" href="#" @click.prevent="page = p">{{ p }}</a>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPages }">
          <a class="page-link" href="#" @click.prevent="page++">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const events = ref([]);
const page = ref(1);
const perPage = 10;

const filters = ref({
  title: "",
  startDate: "",
  endDate: "",
});

const fetchEvents = async () => {
  let query = supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.value.title) {
    query = query.ilike("title", `%${filters.value.title}%`);
  }
  if (filters.value.startDate) {
    query = query.gte("start_time", filters.value.startDate);
  }
  if (filters.value.endDate) {
    query = query.lte("end_time", filters.value.endDate);
  }

  const { data, error } = await query;
  if (!error) {
    events.value = data;
    page.value = 1;
  }
};

const clearFilters = () => {
  filters.value.title = "";
  filters.value.startDate = "";
  filters.value.endDate = "";
  fetchEvents();
};

onMounted(fetchEvents);

const paginatedEvents = computed(() => {
  const start = (page.value - 1) * perPage;
  return events.value.slice(start, start + perPage);
});

const totalPages = computed(() => Math.ceil(events.value.length / perPage));

const formatDate = (date) =>
  new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const isPast = (endTime) => new Date(endTime) < new Date();
</script>

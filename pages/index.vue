<template>
  <div>
    <h3>Event Calendar</h3>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <strong>April 2025</strong>
      <NuxtLink to="/events/new" class="btn btn-primary">+ Add Event</NuxtLink>
    </div>
    <vue-cal style="height: 400px" :events="events" default-view="month" />
    <div class="row mt-4">
      <div class="col-md-6">
        <h5>Upcoming Events</h5>
        <ul class="list-group">
          <li class="list-group-item" v-for="event in upcomingEvents" :key="event.id">
            {{ event.title }} <br />
            <small>{{ new Date(event.start_time).toLocaleString() }}</small>
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <h5>Past Events</h5>
        <ul class="list-group">
          <li class="list-group-item" v-for="event in pastEvents" :key="event.id">
            {{ event.title }} <br />
            <small>{{ new Date(event.start_time).toLocaleString() }}</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal'
const supabase = useSupabaseClient();
const events = ref([]);
const now = new Date();
onMounted(async () => {
  const { data } = await supabase.from("events").select("*");
  events.value = data.map((event) => ({
    ...event,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    title: event.title,
  }));
});
const upcomingEvents = computed(() =>
  events.value.filter((e) => new Date(e.start_time) > now)
);
const pastEvents = computed(() =>
  events.value.filter((e) => new Date(e.start_time) <= now)
);
</script>

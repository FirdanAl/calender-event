<template>
  <div>
    <h3>Add New Event</h3>
    <form @submit.prevent="submitEvent">
      <div class="mb-2">
        <label>Event Name *</label>
        <input v-model="form.title" class="form-control" required />
      </div>
      <div class="mb-2 row">
        <div class="col">
          <label>Start Date and Time *</label>
          <input
            v-model="form.start_time"
            type="datetime-local"
            class="form-control"
            required
          />
        </div>
        <div class="col">
          <label>End Date and Time *</label>
          <input
            v-model="form.end_time"
            type="datetime-local"
            class="form-control"
            required
          />
        </div>
      </div>
      <div class="mb-2">
        <label>Location *</label>
        <input v-model="form.location" class="form-control" required />
      </div>
      <div class="mb-2">
        <label>Description</label>
        <textarea v-model="form.description" class="form-control"></textarea>
      </div>
      <div class="mb-2">
        <label>Proposal URL (Opsional)</label>
        <input v-model="form.proposal_url" type="url" class="form-control" placeholder="https://example.com/proposal.pdf" />
      </div>
      <div class="d-flex justify-content-end">
        <NuxtLink to="/" class="btn btn-secondary me-2">Cancel</NuxtLink>
        <button class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
 definePageMeta({
    middleware: 'auth',  
  })
const supabase = useSupabaseClient();
const form = reactive({
  title: "",
  start_time: "",
  end_time: "",
  location: "",
  description: "",
  proposal_url: "", 
});

const submitEvent = async () => {
  await supabase.from("events").insert([form]);
  navigateTo("/");
};
</script>

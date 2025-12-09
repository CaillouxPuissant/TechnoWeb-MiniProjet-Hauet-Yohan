// Fetch and insert navbar.html into the placeholder div
fetch('navbar.html')
  .then(r => r.text())
  .then(html => { document.getElementById('navbar_placeholder').innerHTML = html; })
  .catch(() => { /* optional: ignore if missing */ });

const { createApp } = Vue;

createApp({
  data() {
    return {
      superheros: [],
      searchQuery: '',
      showPowers: false,
    };
  },
  computed: {
    filteredSuperheros() {
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) return this.superheros;
      return this.superheros.filter(h => h.name.toLowerCase().includes(q));
    }
  },
  mounted() {
    axios.get('https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/all.json')
      .then(response => {
        // the dataset contains powerstats nested in each hero; keep as-is
        this.superheros = response.data;
      })
      .catch(error => { console.error('Erreur récupération:', error); });
  },
  methods: {
    resetSearch() {
      this.searchQuery = '';
      this.showPowers = false;
    }
  }
}).mount('#app');

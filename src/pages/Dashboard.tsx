import React, { useEffect, useMemo, useState } from 'react';
import { getHeroes } from '../api/heroApi';
import { Hero } from '../types/Hero';
import HeroCard from '../components/HeroCard';
import SearchBar from '../components/SearchBar';

export default function Dashboard() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPowers, setShowPowers] = useState(false);
  const [universFilter, setUniversFilter] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'alpha'>('date');

  const universOptions = React.useMemo(() => {
    const setU = new Set<string>()
    heroes.forEach(h => { if (h.univers) setU.add(h.univers) })
    return Array.from(setU).sort()
  }, [heroes])

  useEffect(() => {
    getHeroes()
      .then(data => {
        setHeroes(data.heroes || data); // support both {heroes:[]} and []
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = heroes.slice();
    if (q) {
      list = list.filter(h => (h.nom || '').toLowerCase().includes(q) || (h.alias || '').toLowerCase().includes(q));
    }
    if (universFilter) {
      const uf = universFilter.trim().toLowerCase()
      list = list.filter(h => ((h.univers || '').toLowerCase()) === uf);
    }
    if (sortBy === 'alpha') {
      list.sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list;
  }, [heroes, searchQuery, universFilter, sortBy]);

  return (
    <main className="container my-4">
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-white" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-white mt-3">Chargement des super-héros...</p>
        </div>
      )}
      {error && <div className="alert alert-danger" role="alert">❌ Erreur : {error}</div>}

      {!loading && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onReset={() => { setSearchQuery(''); setShowPowers(false); setUniversFilter(''); setSortBy('date'); }}
            showPowers={showPowers}
            onToggleShowPowers={() => setShowPowers(s => !s)}
            onUniversFilter={(u) => setUniversFilter(u)}
            universOptions={universOptions}
            universValue={universFilter}
            onSort={(s) => setSortBy(s === 'alpha' ? 'alpha' : 'date')}
          />

          {filtered.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white mb-0">
                  🦸 {filtered.length} super-héros trouvé{filtered.length > 1 ? 's' : ''}
                </h2>
              </div>
              <ul className="list-group">
                {filtered.map(hero => (
                  <HeroCard key={hero._id} hero={hero} showPowers={showPowers} />
                ))}
              </ul>
            </>
          ) : (
            <div className="alert alert-info text-center mt-4" style={{background: 'rgba(200, 220, 255, 0.7)', border: 'none', borderRadius: '1rem'}}>
              <h4>🔍 Aucun héros trouvé</h4>
              <p>Essayez d'ajuster vos critères de recherche ou vérifiez l'orthographe.</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}

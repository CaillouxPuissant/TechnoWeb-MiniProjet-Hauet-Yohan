import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Hero } from '../types/Hero'
import { getHeroById } from '../api/heroApi'

export default function HeroDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [hero, setHero] = React.useState<Hero | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!id) return
    setLoading(true)
    getHeroById(id)
      .then(h => {
        setHero(h)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <main className="container my-4">
      <div className="text-center py-5">
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="text-white mt-3">Chargement des détails...</p>
      </div>
    </main>
  )
  if (error) return (
    <main className="container my-4">
      <div className="alert alert-danger">❌ Erreur : {error}</div>
      <button onClick={() => navigate(-1)} className="btn btn-secondary">← Retour</button>
    </main>
  )
  if (!hero) return (
    <main className="container my-4">
      <div className="alert alert-warning">⚠️ Aucun héros trouvé</div>
      <button onClick={() => navigate(-1)} className="btn btn-secondary">← Retour</button>
    </main>
  )

  const apiUrl = ((import.meta as any).env?.VITE_API_URL as string) || ''
  const apiBase = apiUrl.replace(/\/api\/?$/, '')
  const imageSrc = hero.image
    ? hero.image.startsWith('http')
      ? hero.image
      : `${apiBase}${hero.image}`
    : undefined

  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'><rect width='100%' height='100%' fill='%23667eea'/><text x='50%' y='50%' fill='white' font-family='Arial, Helvetica, sans-serif' font-size='32' font-weight='bold' dominant-baseline='middle' text-anchor='middle'>${hero.nom}</text></svg>`
  )}`

  const created = hero.createdAt ? new Date(hero.createdAt).toLocaleString() : null

  return (
    <main className="container my-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-4"
      >
        ← Retour
      </button>

      {hero && (
        <div className="row gap-4">
          <div className="col-md-4">
            <img 
              src={imageSrc || placeholder}
              className="rounded" 
              alt={hero.nom}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = placeholder }}
              width="100%"
              style={{objectFit: 'cover', maxHeight: '500px'}}
            />
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <h1 className="mb-2">{hero.nom}</h1>
                {hero.alias && <p className="text-muted fs-5"><strong>Alias:</strong> {hero.alias}</p>}

                {hero.univers && hero.univers.toLowerCase() !== 'autre' && (
                  <span className="badge me-2">{hero.univers}</span>
                )}
              </div>
            </div>

            {hero.description && (
              <div className="card mb-3">
                <div className="card-header"><h4 className="mb-0">📖 Description</h4></div>
                <div className="card-body">
                  <p>{hero.description}</p>
                </div>
              </div>
            )}

            <div className="card mb-3">
              <div className="card-header"><h4 className="mb-0">⚡ Pouvoirs</h4></div>
              <div className="card-body">
                {hero.pouvoirs && hero.pouvoirs.length > 0 ? (
                  hero.pouvoirs.map((p, i) => {
                    const parts = p.split(':');
                    const label = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : '';
                    const value = parseInt(parts[1]) || 0;
                    let colorClass = 'bg-danger';
                    if (value >= 80) colorClass = 'bg-success';
                    else if (value >= 60) colorClass = 'bg-info';
                    else if (value >= 40) colorClass = 'bg-warning';
                    return (
                      <div key={i} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="fw-bold">{label}</label>
                          <span className="badge bg-secondary">{value}%</span>
                        </div>
                        <div className="progress" style={{height: '10px'}}>
                          <div 
                            className={`progress-bar ${colorClass}`} 
                            style={{width: `${value}%`}}
                            role="progressbar"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-muted">Aucun pouvoir listé.</p>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h4 className="mb-0">ℹ️ Informations</h4></div>
              <div className="card-body">
                {hero.origine && (
                  <div className="mb-3">
                    <strong>Origine:</strong> {hero.origine}
                  </div>
                )}
                {hero.premiereApparition && (
                  <div className="mb-3">
                    <strong>Première apparition:</strong> {hero.premiereApparition}
                  </div>
                )}
                {created && (
                  <div className="mb-3">
                    <strong>Ajouté le:</strong> {created}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
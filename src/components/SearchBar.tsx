import React from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  onReset?: () => void
  showPowers: boolean
  onToggleShowPowers: () => void
  onUniversFilter?: (univers: string) => void
  onSort?: (sort: string) => void
  universOptions?: string[]
  universValue?: string
}

export default function SearchBar({ value, onChange, onReset, showPowers, onToggleShowPowers, onUniversFilter, onSort, universOptions, universValue }: Props) {
  return (
    <div className="card mb-4" style={{background: 'rgba(255, 255, 255, 0.95)'}}>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">🔍 Rechercher</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control site-search"
                placeholder="Rechercher un super-héros..."
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{borderRadius: '0.75rem 0 0 0.75rem'}}
              />
              <button 
                onClick={() => onReset && onReset()} 
                className="btn btn-secondary"
                style={{borderRadius: '0 0.75rem 0.75rem 0'}}
              >
                🔄 Réinitialiser
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">🌍 Univers</label>
            <select
              value={universValue || ''}
              onChange={(e) => onUniversFilter && onUniversFilter(e.target.value)}
              className="form-select"
            >
              <option value="">Tous les univers</option>
              {(universOptions || []).map((u: string) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">📊 Tri</label>
            <select
              onChange={(e) => onSort && onSort(e.target.value)}
              className="form-select"
            >
              <option value="date">Tri par date</option>
              <option value="alpha">Tri alphabétique</option>
            </select>
          </div>

          <div className="col-12">
            <div className="form-check">
              <input 
                type="checkbox" 
                checked={showPowers} 
                onChange={onToggleShowPowers}
                className="form-check-input"
                id="showPowersCheck"
                style={{width: '1.25em', height: '1.25em', cursor: 'pointer'}}
              />
              <label className="form-check-label" htmlFor="showPowersCheck" style={{cursor: 'pointer'}}>
                <strong>⚡ Afficher les pouvoirs</strong>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
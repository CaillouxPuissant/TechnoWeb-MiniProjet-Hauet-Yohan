import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../types/Hero';

interface Props {
  hero: Hero;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  showPowers?: boolean;
}

export default function HeroCard({ hero, onEdit, onDelete, showActions = true, showPowers = false }: Props) {
  const navigate = useNavigate();
  const apiUrl = ((import.meta as any).env?.VITE_API_URL as string) || '';
  const apiBase = apiUrl.replace(/\/api\/?$/, '');
  const imageSrc = hero.image
    ? hero.image.startsWith('http')
      ? hero.image
      : `${apiBase}${hero.image}`
    : undefined;

  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='20' dominant-baseline='middle' text-anchor='middle'>${hero.nom}</text></svg>`
  )}`

  return (
    <li className="list-group-item list-group-item-action d-flex align-items-center flex-wrap">
      <img 
        src={imageSrc || placeholder}
        alt={hero.nom}
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = placeholder }}
        className="rounded-circle me-3" 
        width="50" 
        height="50"
        style={{objectFit: 'cover'}}
      />
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">{hero.nom}</h5>
          {hero.alias && <small className="text-muted">{hero.alias}</small>}
          {hero.univers && hero.univers.toLowerCase() !== 'autre' && (
            <span className="badge bg-primary ms-2">{hero.univers}</span>
          )}
        </div>
        <div>
          <button
            onClick={() => navigate(`/hero/${hero._id}`)}
            className="btn btn-sm btn-outline-primary"
          >
            Détails
          </button>
        </div>
      </div>
      {showPowers && hero.pouvoirs && hero.pouvoirs.length > 0 && (
        <div className="w-100 mt-2">
          <small className="text-muted">
            {hero.pouvoirs.slice(0, 3).map((p, i) => {
              const formatted = p.split(':').map((s, idx) => 
                idx === 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s
              ).join(': ');
              return formatted;
            }).join(' — ')}
          </small>
        </div>
      )}
    </li>
  );
}
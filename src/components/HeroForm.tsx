import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Hero } from '../types/Hero';

const validationSchema = Yup.object({
  nom: Yup.string().required('Nom requis'),
  alias: Yup.string(),
  univers: Yup.string().required('Univers requis'),
  pouvoirs: Yup.string().required('Au moins un pouvoir requis'),
  description: Yup.string(),
  origine: Yup.string(),
  premiereApparition: Yup.string()
});

interface Props {
  initialValues?: Partial<Hero>;
  onSubmit: (values: FormData) => Promise<void>;
}

export default function HeroForm({ initialValues, onSubmit }: Props) {
  const [preview, setPreview] = React.useState<string>();

  const formik = useFormik({
    initialValues: {
      nom: initialValues?.nom || '',
      alias: initialValues?.alias || '',
      univers: initialValues?.univers || '',
      pouvoirs: initialValues?.pouvoirs?.join(', ') || '',
      description: initialValues?.description || '',
      origine: initialValues?.origine || '',
      premiereApparition: initialValues?.premiereApparition || '',
      image: null as File | null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'pouvoirs') {
          formData.append(key, JSON.stringify(values[key].split(',').map(p => p.trim())));
        } else if (key === 'image' && values.image) {
          formData.append('image', values.image);
        } else {
          formData.append(key, values[key]);
        }
      });
      await onSubmit(formData);
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nom</label>
        <input
          type="text"
          {...formik.getFieldProps('nom')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {formik.touched.nom && formik.errors.nom && (
          <div className="text-red-600 text-sm">{formik.errors.nom}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Alias</label>
        <input
          type="text"
          {...formik.getFieldProps('alias')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Univers</label>
        <select
          {...formik.getFieldProps('univers')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Sélectionner...</option>
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
          <option value="Autre">Autre</option>
        </select>
        {formik.touched.univers && formik.errors.univers && (
          <div className="text-red-600 text-sm">{formik.errors.univers}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Pouvoirs (séparés par des virgules)</label>
        <input
          type="text"
          {...formik.getFieldProps('pouvoirs')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {formik.touched.pouvoirs && formik.errors.pouvoirs && (
          <div className="text-red-600 text-sm">{formik.errors.pouvoirs}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...formik.getFieldProps('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Origine</label>
        <input
          type="text"
          {...formik.getFieldProps('origine')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Première apparition</label>
        <input
          type="text"
          {...formik.getFieldProps('premiereApparition')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          accept="image/*"
        />
        {preview && (
          <img src={preview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
        )}
        {initialValues?.image && !preview && (
          <img 
            src={`http://localhost:4000${initialValues.image}`} 
            alt="Current" 
            className="mt-2 h-32 object-cover rounded" 
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {initialValues ? 'Mettre à jour' : 'Créer'}
      </button>
    </form>
  );
}
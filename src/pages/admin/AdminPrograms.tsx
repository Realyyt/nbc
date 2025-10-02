import { useEffect, useMemo, useState } from 'react';
import { affiliateProgramsApi, type AffiliateProgram } from '../../services/affiliatePrograms';

type SortKey = 'title' | 'platform' | 'priceType' | 'created_at' | 'rating';

const emptyForm: Omit<AffiliateProgram, 'id'> = {
  title: '',
  description: '',
  platform: 'other',
  imageUrl: '',
  affiliateLink: '',
  price: undefined,
  rating: undefined,
  instructor: '',
  mode: 'online',
  priceType: 'paid',
  isPublished: true,
};

const Toast = ({ message, type }: { message: string; type: 'success' | 'error' }) => (
  <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
    {message}
  </div>
);

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}
    />
  </button>
);

const fieldError = (msg?: string) => msg ? <p className="text-xs text-red-600 mt-1">{msg}</p> : null;

const AdminPrograms = () => {
  const [programs, setPrograms] = useState<AffiliateProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<AffiliateProgram, 'id'>>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [q, setQ] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [edit, setEdit] = useState<AffiliateProgram | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const validate = (data: Omit<AffiliateProgram, 'id'>) => {
    const errors: Record<string, string> = {};
    if (!data.title.trim()) errors.title = 'Title is required';
    if (!data.affiliateLink.trim()) errors.affiliateLink = 'Affiliate link is required';
    if (data.rating !== undefined && (data.rating < 0 || data.rating > 5)) errors.rating = 'Rating must be 0-5';
    if (data.price !== undefined && Number.isNaN(Number(data.price))) errors.price = 'Price must be a number';
    return errors;
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const load = async () => {
    try {
      setLoading(true);
      const data = await affiliateProgramsApi.listAdmin();
      setPrograms(data);
      setError(null);
    } catch (e) {
      setError('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      setSubmitting(true);
      await affiliateProgramsApi.create(form);
      setForm(emptyForm);
      await load();
      showToast('Program created', 'success');
    } catch (e) {
      showToast('Failed to create program', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this program?')) return;
    const prev = programs;
    setPrograms(programs.filter(p => p.id !== id));
    try {
      await affiliateProgramsApi.remove(id);
      showToast('Program deleted', 'success');
    } catch (e) {
      setPrograms(prev);
      showToast('Delete failed', 'error');
    }
  };

  const handlePublishToggle = async (p: AffiliateProgram, next: boolean) => {
    const prev = programs;
    setPrograms(programs.map(x => x.id === p.id ? { ...x, isPublished: next } : x));
    try {
      await affiliateProgramsApi.update(p.id, { isPublished: next });
      showToast(next ? 'Published' : 'Unpublished', 'success');
    } catch (e) {
      setPrograms(prev);
      showToast('Update failed', 'error');
    }
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let data = programs.filter(p =>
      !needle || p.title.toLowerCase().includes(needle) ||
      (p.description || '').toLowerCase().includes(needle) ||
      (p.platform || '').toLowerCase().includes(needle)
    );
    data = data.sort((a: any, b: any) => {
      const A = (a as any)[sortKey] ?? '';
      const B = (b as any)[sortKey] ?? '';
      const cmp = (A > B ? 1 : A < B ? -1 : 0);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [programs, q, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const SortHeader = ({ name, keyName }: { name: string; keyName: SortKey }) => (
    <button
      type="button"
      onClick={() => {
        if (sortKey === keyName) {
          setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
          setSortKey(keyName);
          setSortDir('asc');
        }
      }}
      className="flex items-center gap-1 text-left"
    >
      <span>{name}</span>
      {sortKey === keyName && <span className="text-xs text-gray-500">{sortDir === 'asc' ? '▲' : '▼'}</span>}
    </button>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="pt-32 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Affiliate Programs</h1>
          <p className="text-gray-600 mt-1">Create, curate, and publish world‑class affiliate programs</p>
        </div>
        <div className="flex items-center gap-2">
          <input value={q} onChange={e=>{ setQ(e.target.value); setPage(1); }} placeholder="Search by title, platform…" className="input w-64" />
          <select value={sortKey} onChange={e=>setSortKey(e.target.value as SortKey)} className="input">
            <option value="created_at">Sort by Created</option>
            <option value="title">Sort by Title</option>
            <option value="platform">Sort by Platform</option>
            <option value="priceType">Sort by Price Type</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <button type="button" onClick={()=>setSortDir(sortDir==='asc'?'desc':'asc')} className="btn">{sortDir==='asc'?'Asc':'Desc'}</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input className="input w-full" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
            {fieldError(formErrors.title)}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <input className="input w-full" value={form.platform || ''} onChange={e=>setForm({...form, platform:e.target.value})} placeholder="udemy/coursera/google/other" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Affiliate Link</label>
            <input className="input w-full" value={form.affiliateLink} onChange={e=>setForm({...form, affiliateLink:e.target.value})} required />
            {fieldError(formErrors.affiliateLink)}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input className="input w-full" value={form.imageUrl || ''} onChange={e=>setForm({...form, imageUrl:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (NGN)</label>
            <input className="input w-full" inputMode="decimal" value={(form.price as any) || ''} onChange={e=>setForm({...form, price: e.target.value ? Number(e.target.value) : undefined})} />
            {fieldError(formErrors.price)}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
            <input className="input w-full" inputMode="decimal" value={(form.rating as any) || ''} onChange={e=>setForm({...form, rating: e.target.value ? Number(e.target.value) : undefined})} />
            {fieldError(formErrors.rating)}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
            <input className="input w-full" value={form.instructor || ''} onChange={e=>setForm({...form, instructor:e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
              <select className="input w-full" value={form.mode} onChange={e=>setForm({...form, mode: e.target.value})}>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Type</label>
              <select className="input w-full" value={form.priceType} onChange={e=>setForm({...form, priceType: e.target.value})}>
                <option value="paid">Paid</option>
                <option value="free">Free</option>
                <option value="sponsorship">Sponsorship</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="input w-full" rows={4} value={form.description || ''} onChange={e=>setForm({...form, description:e.target.value})} />
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="aspect-video w-full bg-gray-100 rounded overflow-hidden flex items-center justify-center">
            {form.imageUrl ? (
              <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm">Image preview</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Published</span>
            <Toggle checked={!!form.isPublished} onChange={v=>setForm({...form, isPublished: v})} />
          </div>
          <button disabled={submitting} className="btn btn-primary">{submitting ? 'Saving…' : 'Create Program'}</button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-4 py-3"><SortHeader name="Title" keyName="title" /></th>
                <th className="px-4 py-3"><SortHeader name="Platform" keyName="platform" /></th>
                <th className="px-4 py-3"><SortHeader name="Type" keyName="priceType" /></th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3"><SortHeader name="Rating" keyName="rating" /></th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageData.map(p => (
                <tr key={p.id} className="text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        {p.imageUrl ? <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">No image</span>}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{p.title}</div>
                        <div className="text-gray-500 line-clamp-1 max-w-md">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.platform || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${p.priceType==='free'?'bg-green-50 text-green-700':p.priceType==='sponsorship'?'bg-purple-50 text-purple-700':'bg-blue-50 text-blue-700'}`}>{p.priceType}</span>
                  </td>
                  <td className="px-4 py-3">{typeof p.price==='number' ? `₦${p.price.toLocaleString()}` : (p.price || '—')}</td>
                  <td className="px-4 py-3">{p.rating ?? '—'}</td>
                  <td className="px-4 py-3"><Toggle checked={!!p.isPublished} onChange={(v)=>handlePublishToggle(p, v)} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a className="btn btn-secondary" href={p.affiliateLink} target="_blank">Open</a>
                      <button className="btn" onClick={()=>setEdit(p)}>Edit</button>
                      <button className="btn btn-danger" onClick={()=>handleDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No programs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
          <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
          <div className="flex gap-2">
            <button className="btn" disabled={page===1} onClick={()=>setPage(p=>Math.max(1, p-1))}>Previous</button>
            <button className="btn" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages, p+1))}>Next</button>
          </div>
        </div>
      </div>

      {edit && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={()=>setEdit(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6" onClick={e=>e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Edit Program</h3>
            <EditForm program={edit} onClose={()=>setEdit(null)} onSaved={async()=>{ setEdit(null); await load(); showToast('Program updated', 'success'); }} onError={()=>showToast('Update failed', 'error')} />
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

const EditForm = ({ program, onClose, onSaved, onError }: { program: AffiliateProgram; onClose: ()=>void; onSaved: ()=>void; onError: ()=>void }) => {
  const [state, setState] = useState<AffiliateProgram>(program);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!state.title.trim()) errs.title = 'Title is required';
    if (!state.affiliateLink.trim()) errs.affiliateLink = 'Affiliate link is required';
    if (state.rating !== undefined && (state.rating < 0 || state.rating > 5)) errs.rating = 'Rating must be 0-5';
    if (state.price !== undefined && Number.isNaN(Number(state.price))) errs.price = 'Price must be a number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSaving(true);
      const { id, ...updates } = state as any;
      await affiliateProgramsApi.update(state.id, updates);
      onSaved();
    } catch (e) {
      onError();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input className="input w-full" value={state.title} onChange={e=>setState({...state, title:e.target.value})} />
        {fieldError(errors.title)}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Platform</label>
        <input className="input w-full" value={state.platform || ''} onChange={e=>setState({...state, platform:e.target.value})} />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Affiliate Link</label>
        <input className="input w-full" value={state.affiliateLink} onChange={e=>setState({...state, affiliateLink:e.target.value})} />
        {fieldError(errors.affiliateLink)}
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input className="input w-full" value={state.imageUrl || ''} onChange={e=>setState({...state, imageUrl:e.target.value})} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price (NGN)</label>
        <input className="input w-full" value={(state.price as any) || ''} onChange={e=>setState({...state, price: e.target.value ? Number(e.target.value) : undefined})} />
        {fieldError(errors.price)}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
        <input className="input w-full" value={(state.rating as any) || ''} onChange={e=>setState({...state, rating: e.target.value ? Number(e.target.value) : undefined})} />
        {fieldError(errors.rating)}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mode</label>
        <select className="input w-full" value={state.mode} onChange={e=>setState({...state, mode: e.target.value})}>
          <option value="online">Online</option>
          <option value="physical">Physical</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price Type</label>
        <select className="input w-full" value={state.priceType} onChange={e=>setState({...state, priceType: e.target.value})}>
          <option value="paid">Paid</option>
          <option value="free">Free</option>
          <option value="sponsorship">Sponsorship</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea className="input w-full" rows={4} value={state.description || ''} onChange={e=>setState({...state, description:e.target.value})} />
      </div>
      <div className="md:col-span-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Published</span>
          <Toggle checked={!!state.isPublished} onChange={v=>setState({...state, isPublished: v})} />
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button disabled={saving} className="btn btn-primary">{saving? 'Saving…' : 'Save changes'}</button>
        </div>
      </div>
    </form>
  );
};

export default AdminPrograms;



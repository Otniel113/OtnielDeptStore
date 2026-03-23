import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Controller/StoreContext';
import { transactionAPI } from '../api-routes/api';

export default function AdminPage() {
  const {
    categories,
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    createCategory,
    updateCategory,
    deleteCategory,
    logout,
  } = useStore();

  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('products');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Report states
  const [reportOption, setReportOption] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [fetchingReport, setFetchingReport] = useState(false);

  async function handleFetchReport(option = reportOption) {
    setFetchingReport(true);
      try {
      let data = null;
      if (option === 'today') {
        data = await transactionAPI.getReportToday();
      } else {
        if (!startDate || !endDate) {
          setFetchingReport(false);
          return;
        }
        data = await transactionAPI.getReport(startDate, endDate);
      }
      setReportData(data);
    } catch (err) {
      alert(err.message || 'Failed to fetch report');
    } finally {
      setFetchingReport(false);
    }
  }

  function switchTab(tab) {
    setCurrentTab(tab);
    if (tab === 'report') {
      handleFetchReport(reportOption);
    }
  }


  function openModal(id = null) {
    setError('');
    if (id !== null) {
      setIsEditing(true);
      setEditId(id);
      if (currentTab === 'products') {
        const item = products.find(p => p.id === id);
        setFormData({ name: item.name, category_id: item.category_id, price: item.price, stock: item.stock });
      } else {
        const item = categories.find(c => c.id === id);
        setFormData({ name: item.name, description: item.description });
      }
    } else {
      setIsEditing(false);
      setEditId(null);
      if (currentTab === 'products') {
        setFormData({ name: '', category_id: categories[0]?.id || '', price: '', stock: '' });
      } else {
        setFormData({ name: '', description: '' });
      }
    }
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setFormData({});
    setEditId(null);
    setIsEditing(false);
    setError('');
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (currentTab === 'products') {
        const data = {
          name: formData.name,
          category_id: Number(formData.category_id),
          price: Number(formData.price),
          stock: Number(formData.stock),
        };
        if (isEditing) {
          await updateProduct(editId, data);
        } else {
          await createProduct(data);
        }
      } else {
        const data = {
          name: formData.name,
          description: formData.description || '',
        };
        if (isEditing) {
          await updateCategory(editId, data);
        } else {
          await createCategory(data);
        }
      }
      closeModal();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      if (currentTab === 'products') {
        await deleteProduct(id);
      } else {
        await deleteCategory(id);
      }
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  const pageTitle = currentTab.charAt(0).toUpperCase() + currentTab.slice(1);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-sidebar border-b-2 md:border-b-0 md:border-r-2 border-border flex flex-col shrink-0">
        <div className="h-16 flex items-center justify-between px-6 border-b-2 border-border">
          <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
            The Waroenkz Admin
          </h1>
          <button onClick={handleLogout} className="md:hidden text-muted hover:text-danger hover:font-bold transition-all" aria-label="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        <nav className="p-2 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto overflow-y-hidden md:flex-1 no-scrollbar">
          <button
            onClick={() => switchTab('products')}
            className={`flex-1 md:w-full text-center md:text-left px-4 py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:bg-background/50 focus:bg-background md:border-l-4 md:border-b-0 border-b-4 whitespace-nowrap ${
              currentTab === 'products' ? 'bg-sidebar border-gold-start' : 'border-transparent'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => switchTab('categories')}
            className={`flex-1 md:w-full text-center md:text-left px-4 py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:bg-background/50 focus:bg-background md:border-l-4 md:border-b-0 border-b-4 whitespace-nowrap ${
              currentTab === 'categories' ? 'bg-sidebar border-gold-start' : 'border-transparent'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => switchTab('report')}
            className={`flex-1 md:w-full text-center md:text-left px-4 py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:bg-background/50 focus:bg-background md:border-l-4 md:border-b-0 border-b-4 whitespace-nowrap ${
              currentTab === 'report' ? 'bg-sidebar border-gold-start' : 'border-transparent'
            }`}
          >
            Report
          </button>
        </nav>

        <div className="p-4 border-t-2 border-border hidden md:block">
          <button onClick={handleLogout} className="flex items-center gap-2 text-muted hover:text-danger hover:font-bold transition-all font-mono text-sm uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-background min-w-0 overflow-hidden">
        <header className="h-16 border-b-2 border-border flex items-center justify-between px-4 md:px-8 bg-background shrink-0">
          <h2 className="font-serif text-xl md:text-2xl font-bold">{pageTitle}</h2>
          {currentTab !== 'report' && (
            <button onClick={() => openModal()} className="px-3 py-2 md:px-4 md:py-2 btn-gold rounded-md font-mono text-xs md:text-sm font-bold uppercase tracking-wide shadow-sm flex items-center gap-2">
              <span>+ Add New</span>
            </button>
          )}
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          {currentTab === 'report' ? (
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded border-2 font-bold ${reportOption === 'today' ? 'bg-sidebar border-gold-start' : 'border-border bg-card'}`}
                  onClick={() => { setReportOption('today'); handleFetchReport('today'); }}
                >
                  Today
                </button>
                <button
                  className={`px-4 py-2 rounded border-2 font-bold ${reportOption === 'custom' ? 'bg-sidebar border-gold-start' : 'border-border bg-card'}`}
                  onClick={() => { setReportOption('custom'); setReportData(null); }}
                >
                  Custom Range
                </button>
              </div>

              {reportOption === 'custom' && (
                <div className="flex flex-col md:flex-row gap-4 md:items-end bg-card p-4 border-2 border-border rounded-xl">
                  <div className="flex-1 md:flex-none md:w-48">
                    <label className="block text-sm font-bold uppercase mb-1">Start Date</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border-2 border-border rounded bg-background" />
                  </div>
                  <div className="flex-1 md:flex-none md:w-48">
                    <label className="block text-sm font-bold uppercase mb-1">End Date</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border-2 border-border rounded bg-background" />
                  </div>
                  <button onClick={() => handleFetchReport('custom')} className="w-full md:w-auto px-6 py-2 btn-gold rounded font-bold shadow-sm">
                    Fetch Report
                  </button>
                </div>
              )}

              {fetchingReport ? (
                <div className="bg-card border-2 border-border rounded-xl p-8 text-center text-muted font-sans font-semibold">
                  Loading...
                </div>
              ) : reportData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm flex flex-col justify-center">
                    <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-2">Total Revenue</h3>
                    <span className="font-serif text-3xl font-bold text-foreground">
                      Rp {Number(reportData.total_revenue || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm flex flex-col justify-center">
                    <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-2">Total Transactions</h3>
                    <span className="font-serif text-3xl font-bold text-foreground">
                      {reportData.total_transaction || 0}
                    </span>
                  </div>
                  <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm flex flex-col justify-center">
                    <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-2">Most Sold Product</h3>
                    {reportData.most_sold_product && reportData.most_sold_product.name ? (
                      <div>
                        <span className="font-serif text-2xl font-bold text-foreground block mb-1">
                          {reportData.most_sold_product.name}
                        </span>
                        <span className="font-sans text-sm font-semibold text-muted">
                          {reportData.most_sold_product.sold_qty} sold
                        </span>
                      </div>
                    ) : (
                      <span className="font-serif text-xl font-bold text-muted">N/A</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-card border-2 border-border rounded-xl p-8 text-center text-muted font-sans font-semibold">
                  No reports found.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card border-2 border-border rounded-xl shadow-card overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[600px] md:min-w-full">
                <thead className="bg-sidebar border-b-2 border-border font-mono uppercase tracking-wider text-muted">
                {currentTab === 'products' ? (
                  <tr>
                    <th className="px-6 py-4 font-bold">ID</th>
                    <th className="px-6 py-4 font-bold w-1/4">Name</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold text-right">Price</th>
                    <th className="px-6 py-4 font-bold text-right">Stock</th>
                    <th className="px-6 py-4 font-bold text-center">Actions</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="px-6 py-4 font-bold">ID</th>
                    <th className="px-6 py-4 font-bold w-1/4">Name</th>
                    <th className="px-6 py-4 font-bold">Description</th>
                    <th className="px-6 py-4 font-bold text-center">Actions</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-border/20 font-sans font-semibold">
                {currentTab === 'products'
                  ? products.map(item => (
                      <tr key={item.id} className="hover:bg-sidebar/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-muted">#{item.id}</td>
                        <td className="px-6 py-4 font-serif text-lg text-foreground">{item.name}</td>
                        <td className="px-6 py-4">
                          <span className="bg-sidebar px-2 py-1 rounded font-mono text-xs font-bold uppercase tracking-wide">{item.category_name}</span>
                        </td>
                        <td className="px-6 py-4 text-right font-mono">{item.price.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-mono">{item.stock}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => openModal(item.id)} className="p-2 text-muted hover:text-foreground hover:bg-white rounded-md border border-transparent hover:border-border transition-all">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-danger hover:bg-danger/10 rounded-md transition-colors">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : categories.map(item => (
                      <tr key={item.id} className="hover:bg-sidebar/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-muted">#{item.id}</td>
                        <td className="px-6 py-4 font-serif text-lg text-foreground">{item.name}</td>
                        <td className="px-6 py-4 text-muted">{item.description}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => openModal(item.id)} className="p-2 text-muted hover:text-foreground hover:bg-white rounded-md border border-transparent hover:border-border transition-all">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-danger hover:bg-danger/10 rounded-md transition-colors">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card w-full max-w-lg rounded-xl border-2 border-border shadow-elevated p-6 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl font-bold">{isEditing ? 'Edit Item' : 'Add New Item'}</h3>
              <button onClick={closeModal} className="text-muted hover:text-foreground">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-semibold">{error}</div>
              )}
              {currentTab === 'products' ? (
                <>
                  <div>
                    <label className="block text-sm font-bold uppercase mb-1">Name</label>
                    <input type="text" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full p-3 border-2 border-border rounded bg-background" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold uppercase mb-1">Category</label>
                      <select value={formData.category_id || ''} onChange={e => handleChange('category_id', e.target.value)} className="w-full p-3 border-2 border-border rounded bg-background" required>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase mb-1">Price</label>
                      <input type="number" value={formData.price || ''} onChange={e => handleChange('price', e.target.value)} className="w-full p-3 border-2 border-border rounded bg-background" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase mb-1">Stock</label>
                    <input type="number" value={formData.stock ?? ''} onChange={e => handleChange('stock', e.target.value)} className="w-full p-3 border-2 border-border rounded bg-background" required />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold uppercase mb-1">Name</label>
                    <input type="text" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full p-3 border-2 border-border rounded bg-background" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase mb-1">Description</label>
                    <textarea value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} className="w-full p-3 border-2 border-border rounded bg-background" rows="3"></textarea>
                  </div>
                </>
              )}

              <div className="flex gap-4 mt-8 pt-4 border-t border-dashed border-border">
                <button type="button" onClick={closeModal} className="flex-1 py-3 border-2 border-border rounded-lg font-bold hover:bg-sidebar transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 btn-gold rounded-lg font-bold shadow-sm transition-transform active:scale-[0.98] disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

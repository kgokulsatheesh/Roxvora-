import { useMemo, useState } from 'react';
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import Button from '../../../components/common/Button/Button';

const categories = [
  { id: 1, name: 'Women', slug: 'women', products: 120, status: true },
  { id: 2, name: 'Men', slug: 'men', products: 80, status: true },
  { id: 3, name: 'Kids', slug: 'kids', products: 45, status: true },
  { id: 4, name: 'Accessories', slug: 'accessories', products: 60, status: true },
];

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return categories;

    return categories.filter(({ name, slug }) =>
      `${name} ${slug}`.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-secondary font-bold text-primary">Categories</h1>
          <p className="mt-1 text-sm text-secondary">
            Organize products into easy-to-browse collections.
          </p>
        </div>
        <Button variant="primary" className="self-start sm:self-auto">
          <FiPlus className="h-5 w-5" aria-hidden="true" />
          Add Category
        </Button>
      </div>

      <section className="card overflow-hidden" aria-label="Category list">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-md">
            <span className="sr-only">Search categories</span>
            <FiSearch
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search by name or slug..."
              className="input-field w-full pl-10"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <p className="text-sm text-secondary" aria-live="polite">
            Showing <span className="font-semibold text-primary">{filteredCategories.length}</span>
            {' '}of {categories.length} categories
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-neutral-50">
              <tr className="text-left text-xs uppercase tracking-wide text-secondary">
                <th scope="col" className="px-5 py-3 font-semibold">Name</th>
                <th scope="col" className="px-5 py-3 font-semibold">Slug</th>
                <th scope="col" className="px-5 py-3 font-semibold">Products</th>
                <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="transition-colors hover:bg-neutral-50">
                  <th scope="row" className="px-5 py-4 text-left font-medium text-primary">
                    {category.name}
                  </th>
                  <td className="px-5 py-4 text-sm text-secondary">{category.slug}</td>
                  <td className="px-5 py-4 text-sm text-secondary">{category.products}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`badge badge-${category.status ? 'success' : 'default'} badge-sm`}
                    >
                      {category.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="btn btn-ghost btn-icon-sm"
                        aria-label={`Edit ${category.name} category`}
                      >
                        <FiEdit2 aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-icon-sm text-error hover:text-error"
                        aria-label={`Delete ${category.name} category`}
                      >
                        <FiTrash2 aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center">
                    <p className="font-medium text-primary">No categories found</p>
                    <p className="mt-1 text-sm text-secondary">
                      Try a different name or slug.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;

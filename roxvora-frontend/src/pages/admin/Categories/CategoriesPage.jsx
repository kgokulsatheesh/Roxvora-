
import Button from '../../../components/common/Button/Button';
import { FiPlus } from 'react-icons/fi';


const CategoriesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-secondary font-bold text-primary">Categories</h1>
        <Button variant="primary">
          <FiPlus className="w-5 h-5" />
          Add Category
        </Button>
      </div>

      <div className="card">
        <div className="p-4 border-b">
          <input
            type="search"
            placeholder="Search categories..."
            className="input-field max-w-md"
            size="sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary border-b">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Slug</th>
                <th className="pb-3 font-medium">Products</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[
                { id: 1, name: 'Women', slug: 'women', products: 120, status: true },
                { id: 2, name: 'Men', slug: 'men', products: 80, status: true },
                { id: 3, name: 'Kids', slug: 'kids', products: 45, status: true },
                { id: 4, name: 'Accessories', slug: 'accessories', products: 60, status: true },
              ].map((cat) => (
                <tr key={cat.id} className="hover:bg-neutral-50">
                  <td className="py-4 font-medium text-primary">{cat.name}</td>
                  <td className="py-4 text-secondary">{cat.slug}</td>
                  <td className="py-4 text-secondary">{cat.products}</td>
                  <td className="py-4">
                    <span className={`badge badge-${cat.status ? 'success' : 'default'} badge-sm`}>
                      {cat.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="btn btn-ghost btn-icon-sm">Edit</button>
                    <button className="btn btn-ghost btn-icon-sm text-error hover:text-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
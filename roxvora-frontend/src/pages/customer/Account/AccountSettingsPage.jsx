import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from "../../../store/slices/authSlice";
import Button from "../../../components/common/Button/Button";

const AccountSettingsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [newsletter, setNewsletter] = useState(user?.newsletter ?? true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handleSave = () => {
    dispatch(setUser({ ...user, newsletter }));
    toast.success('Preferences saved');
  };

  return (
    <section aria-labelledby="settings-heading" className="max-w-2xl">
      <h2 id="settings-heading" className="text-xl font-secondary font-bold text-primary mb-6">
        Preferences
      </h2>

      <div className="card p-6 space-y-6">
        <fieldset>
          <legend className="font-semibold text-primary mb-4">Notifications</legend>

          <label className="flex items-center justify-between gap-4 py-3 cursor-pointer">
            <span>
              <span className="block text-sm font-medium text-primary">Newsletter</span>
              <span className="block text-sm text-secondary">New arrivals and private sales.</span>
            </span>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="w-5 h-5 rounded text-secondary focus:ring-secondary"
            />
          </label>

          <label className="flex items-center justify-between gap-4 py-3 cursor-pointer border-t border-neutral-100">
            <span>
              <span className="block text-sm font-medium text-primary">Order updates</span>
              <span className="block text-sm text-secondary">Email updates on order status.</span>
            </span>
            <input
              type="checkbox"
              checked={orderUpdates}
              onChange={(e) => setOrderUpdates(e.target.checked)}
              className="w-5 h-5 rounded text-secondary focus:ring-secondary"
            />
          </label>

          <label className="flex items-center justify-between gap-4 py-3 cursor-pointer border-t border-neutral-100">
            <span>
              <span className="block text-sm font-medium text-primary">SMS alerts</span>
              <span className="block text-sm text-secondary">Delivery updates by text message.</span>
            </span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-secondary focus:ring-secondary"
            />
          </label>
        </fieldset>

        <div className="pt-4 border-t border-neutral-100">
          <Button variant="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccountSettingsPage;
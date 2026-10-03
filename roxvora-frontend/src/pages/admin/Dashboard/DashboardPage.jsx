import DashboardOverview from '@components/admin/dashboard/DashboardOverview';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-secondary font-bold text-primary">Dashboard</h1>
      <DashboardOverview />
    </div>
  );
};

export default DashboardPage;
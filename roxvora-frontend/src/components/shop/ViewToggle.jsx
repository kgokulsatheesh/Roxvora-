const ViewToggle = ({
  viewMode = 'grid',
  onChange,
  className = '',
}) => {
  const modes = [
    { value: 'grid', icon: 'grid', label: 'Grid' },
    { value: 'list', icon: 'list', label: 'List' },
  ];

  const icons = {
    grid: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    list: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  };

  return (
    <div className={`flex items-center gap-1 bg-neutral-100 rounded-lg p-1 ${className}`} role="group" aria-label="View mode">
      {modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          className={`p-2 rounded transition-colors ${viewMode === mode.value ? 'bg-white text-primary shadow-sm' : 'text-neutral-500 hover:text-primary'}`}
          onClick={() => onChange?.(mode.value)}
          aria-label={`${mode.label} view`}
          aria-pressed={viewMode === mode.value}
        >
          {icons[mode.icon]}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
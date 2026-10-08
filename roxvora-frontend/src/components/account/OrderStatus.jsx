import { FiCheck, FiClock, FiTruck, FiPackage, FiXCircle } from 'react-icons/fi';

const STATUS_CONFIG = {
    pending: {
        label: 'Pending',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        ring: 'ring-yellow-200',
        icon: FiClock,
    },
    confirmed: {
        label: 'Confirmed',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        ring: 'ring-blue-200',
        icon: FiCheck,
    },
    processing: {
        label: 'Processing',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        ring: 'ring-indigo-200',
        icon: FiPackage,
    },
    shipped: {
        label: 'Shipped',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        ring: 'ring-purple-200',
        icon: FiTruck,
    },
    delivered: {
        label: 'Delivered',
        color: 'text-green-600',
        bg: 'bg-green-50',
        ring: 'ring-green-200',
        icon: FiCheck,
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-red-600',
        bg: 'bg-red-50',
        ring: 'ring-red-200',
        icon: FiXCircle,
    },
};

const ORDERED_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

/**
 * OrderStatus
 *
 * Props:
 *   status   {string}   — current order status key
 *   timeline {Array}    — array of { status, date, description } events
 */
const OrderStatus = ({ status, timeline = [] }) => {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.confirmed;
    const Icon = config.icon;

    // Only show the step-by-step tracker for non-cancelled orders.
    const isCancelled = status === 'cancelled';
    const currentStepIndex = ORDERED_STEPS.indexOf(status);

    return (
        <div>
            {/* Status badge */}
            <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${config.color} ${config.bg} ring-1 ${config.ring} mb-6`}
            >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {config.label}
            </div>

            {/* Step tracker */}
            {!isCancelled && (
                <ol className="relative flex flex-col gap-0" aria-label="Order progress">
                    {ORDERED_STEPS.map((step, index) => {
                        const stepConfig = STATUS_CONFIG[step];
                        const StepIcon = stepConfig.icon;
                        const isDone = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        const isLast = index === ORDERED_STEPS.length - 1;

                        // Find the matching timeline entry for this step
                        const event = timeline.find((t) => t.status === step);

                        return (
                            <li key={step} className="flex gap-4">
                                {/* Icon + connecting line */}
                                <div className="flex flex-col items-center">
                                    <span
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ring-2 flex-shrink-0
                      ${isDone
                                                ? `${stepConfig.bg} ${stepConfig.ring} ${stepConfig.color}`
                                                : 'bg-neutral-100 ring-neutral-200 text-neutral-400'
                                            }`}
                                        aria-hidden="true"
                                    >
                                        <StepIcon className="w-4 h-4" />
                                    </span>
                                    {!isLast && (
                                        <span
                                            className={`w-0.5 flex-1 my-1 ${isDone && index < currentStepIndex ? 'bg-neutral-300' : 'bg-neutral-100'}`}
                                            style={{ minHeight: '24px' }}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>

                                {/* Text */}
                                <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                                    <p
                                        className={`text-sm font-semibold ${isDone ? 'text-primary' : 'text-neutral-400'}`}
                                    >
                                        {stepConfig.label}
                                        {isCurrent && (
                                            <span className="ml-2 text-xs font-normal text-secondary">(Current)</span>
                                        )}
                                    </p>
                                    {event && (
                                        <>
                                            <p className="text-sm text-secondary mt-0.5">{event.description}</p>
                                            <p className="text-xs text-neutral-400 mt-0.5">
                                                {new Date(event.date).toLocaleDateString('en-IN', {
                                                    dateStyle: 'medium',
                                                })}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            )}

            {/* Cancelled timeline */}
            {isCancelled && timeline.length > 0 && (
                <ol className="space-y-3" aria-label="Order timeline">
                    {timeline.map((event, i) => {
                        const ec = STATUS_CONFIG[event.status] ?? STATUS_CONFIG.confirmed;
                        const Ic = ec.icon;
                        return (
                            <li key={i} className="flex items-start gap-3">
                                <span
                                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${ec.bg} ${ec.color}`}
                                    aria-hidden="true"
                                >
                                    <Ic className="w-3.5 h-3.5" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-primary">{event.description}</p>
                                    <p className="text-xs text-neutral-400 mt-0.5">
                                        {new Date(event.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            )}
        </div>
    );
};

export default OrderStatus;

import { FiCheck } from 'react-icons/fi';

const CheckoutStepper = ({ steps = [], currentStep = 0 }) => (
    <nav aria-label="Checkout steps">
        <ol className="flex items-center gap-0">
            {steps.map((step, index) => {
                const isDone = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                    <li key={step.id} className="flex items-center flex-1">
                        <div className="flex items-center gap-3">
                            <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-colors ${isDone ? 'bg-green-500 text-white' : isCurrent ? 'bg-primary text-white' : 'bg-neutral-200 text-secondary'
                                    }`}
                                aria-current={isCurrent ? 'step' : undefined}
                            >
                                {isDone ? <FiCheck className="w-4 h-4" aria-hidden="true" /> : index + 1}
                            </span>
                            <span className={`text-sm font-medium hidden sm:block ${isCurrent ? 'text-primary' : isDone ? 'text-green-600' : 'text-secondary'}`}>
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-3 transition-colors ${isDone ? 'bg-green-300' : 'bg-neutral-200'}`} aria-hidden="true" />
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);

export default CheckoutStepper;

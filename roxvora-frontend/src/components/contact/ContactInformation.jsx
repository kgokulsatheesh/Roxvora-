import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';


const ContactInformation = ({
  info = [
    { icon: FiMapPin, title: 'Visit Us', details: '123 Fashion Ave, New York, NY 10001' },
    { icon: FiPhone, title: 'Call Us', details: '+1 (555) 123-4567' },
    { icon: FiMail, title: 'Email Us', details: 'support@roxvora.com' },
    { icon: FiClock, title: 'Business Hours', details: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM' },
  ],
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`} role="list">
      {info.map((item, index) => (
        <div key={index} className="text-center p-6 bg-neutral-50 rounded-xl" role="listitem">
          <div className="text-3xl mb-3 text-primary" aria-hidden="true">
            <item.icon className="w-8 h-8 mx-auto" aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
          <p className="text-secondary">{item.details}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactInformation;
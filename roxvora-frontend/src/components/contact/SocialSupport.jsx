import { FiMail, FiMessageCircle } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';


const SocialSupport = ({
  className = '',
}) => {
  const socialLinks = [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com/roxvora' },
    { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com/roxvora' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/roxvora' },
    { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com/roxvora' },
  ];

  const supportOptions = [
    { icon: FiMessageCircle, label: 'Live Chat', description: 'Available Mon-Fri 9AM-6PM', action: 'Start Chat' },
    { icon: FiMail, label: 'Email Support', description: 'Response within 24 hours', action: 'Email Us' },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <h3 className="font-semibold text-primary mb-4">Follow Us</h3>
        <div className="flex gap-4" role="list" aria-label="Social media">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-secondary hover:text-white transition-all"
              aria-label={social.label}
              role="listitem"
            >
              <social.icon className="w-6 h-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-primary mb-4">Support Channels</h3>
        <div className="space-y-4">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                <option.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-primary">{option.label}</h4>
                <p className="text-sm text-secondary">{option.description}</p>
              </div>
              <button type="button" className="btn btn-primary btn-sm">{option.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialSupport;
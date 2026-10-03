import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';


const SocialLinks = () => {
  const socials = [
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <div className="flex gap-3" role="list" aria-label="Social media links">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-800 text-primary-300 hover:bg-secondary hover:text-white transition-all duration-300"
          aria-label={social.label}
          role="listitem"
        >
          <social.icon className="w-5 h-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
import { Link } from 'react-router-dom';

const FooterLinks = ({ title, links }) => {
  return (
    <nav aria-labelledby={`${title.toLowerCase()}-heading`}>
      <h3
        id={`${title.toLowerCase()}-heading`}
        className="font-secondary font-semibold text-lg mb-4 text-white"
      >
        {title}
      </h3>
      <ul className="space-y-3" role="list">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className="text-white/60 hover:text-secondary transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterLinks;
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.facebook.com/unilavras",
    icon: <FaFacebook />,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/unilavras",
    icon: <FaInstagram />,
    label: "Instagram",
  },
  {
    href: "https://br.linkedin.com/school/unilavras-centro-universitario/",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white flex flex-col items-center justify-center p-5 relative z-10">
      <ul className="flex gap-5 list-none p-0 m-0 ">
        {socialLinks.map((link) => (
          <li
            key={link.label}
            className="text-2xl cursor-pointer transition-transform transform hover:scale-110 hover:text-primary"
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white no-underline transition-colors"
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <span className="text-center mt-2">
        UNILAVRAS - UNIPARK <br />
        &copy; Todos os direitos reservados - 2024
      </span>
    </footer>
  );
};

export default Footer;

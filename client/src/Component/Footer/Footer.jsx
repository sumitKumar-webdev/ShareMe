import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-700 bg-gray-900 py-3 text-gray-300">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-4 md:flex-row">
        <p className="text-center text-xs text-gray-400 md:text-left md:text-sm">
          Share text and files quickly with temporary 4-digit access codes.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/sumitKumar-webdev/Share-Me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm transition hover:text-white"
          >
            <GitHubIcon className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sumitkr8178@gmail.com&su=Hello&body=Hi%20Sumit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm transition hover:text-white"
          >
            <EmailIcon className="w-5 h-5" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

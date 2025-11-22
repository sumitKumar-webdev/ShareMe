import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-5 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center md:text-left text-sm text-gray-400">
          I have some other projects to work on, so if something breaks or feels off, feel
          free to fix it on your own.{" "}
          <span className="font-semibold text-white">
            (Looking For Your Fixes)
          </span>
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/sumitKumar-webdev/Share-Me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <GitHubIcon className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sumitkr8178@gmail.com&su=Hello&body=Hi%20Sumit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <EmailIcon className="w-5 h-5" />
            <span>Contact Me</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

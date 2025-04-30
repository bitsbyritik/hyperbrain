import Link from "next/link";
import Wrapper from "./wrapper";
import { DiGithubBadge } from "react-icons/di";
import { FaDiscord } from "react-icons/fa6";
import { BrainIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full bg-transparent">
      <Wrapper>
        <div className="flex md:flex-row flex-col items-center gap-8 justify-between pb-16 text-muted-foreground">
          <div className="flex gap-4 items-center ">
            <Link
              href={"https://github.com/bitsbyritik/hyperbrain"}
              className="hover:text-foreground"
            >
              <DiGithubBadge size={38} />
            </Link>
            <Link
              href={"https://github.com/bitsbyritik/hyperbrain"}
              className="hover:text-foreground"
            >
              <FaDiscord size={34} />
            </Link>
            <Link
              href={"https://github.com/bitsbyritik/hyperbrain"}
              className="hover:text-foreground"
            >
              <FaXTwitter size={32} />
            </Link>
          </div>
          <div className="flex md:flex-row flex-col md:gap-8 gap-2 items-center">
            <Link href={"/"} className="hover:text-foreground">
              About
            </Link>
            <Link href={"/"} className="hover:text-foreground">
              Privacy
            </Link>
            <Link href={"/"} className="hover:text-foreground">
              Terms
            </Link>
            <Link href={"/"} className="hover:text-foreground">
              Contributors
            </Link>
          </div>
          <div>
            <Link href="/" className="flex items-center gap-2 disabled">
              <BrainIcon />
              <span className="text-xl font-bold">HyperBrain</span>
            </Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;

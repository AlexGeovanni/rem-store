
import { LinkItem } from "@/app/constants/footerLinks";
import Link from "next/link";


type Props = {
  links: LinkItem[];
};

export const LinkList = ({ links }: Props) => {
  return (
    <ul className="flex flex-col gap-1 pt-1 md:gap-2">
      {links.map((link, i) => (
        <li key={link.href+i}>
          <Link href={link.href} className="hover:underline">
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
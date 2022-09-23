import Link from "next/link";
import { Button } from "./Button";

export const Nav = () => {
  return (
    <nav className="bg-white px-4 py-8 w-full flex items-center justify-around">
      <h1 className="text-xl font-bold text-green-600 underline tracking-wide">
        <Link href="/" passHref>
          <a>Expense Tracker 💰</a>
        </Link>
      </h1>
      <Button
        className="w-28 py-2 px-2 flex items-center gap-2"
        variant="outline"
        onClick={() => {}}
      >
        Logout
      </Button>
    </nav>
  );
};

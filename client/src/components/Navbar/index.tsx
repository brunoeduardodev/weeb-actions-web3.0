import React from "react";
import NavbarItem from "./NavbarItem";

const Navbar: React.FC = () => {
  return (
    <nav className="flex w-full md:w-11/12 mx-auto max-w-screen-2xl">
      <div className="flex justify-between items-center m-auto w-full p-3">
        <h5 className="text-white font-bold text-2xl">Weeb Blockchain</h5>

        <ul className="hidden md:flex list-none flex-initial text-white">
          <NavbarItem title="Market" />
          <NavbarItem title="Exchange" />
          <NavbarItem title="Tutorials" />
          <NavbarItem title="Wallets" />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Header: FunctionComponent = () => {
  return (
    <div className='flex items-center justify-between w-full'>
      <p className='text-white mt-4 mx-6 font-bold'>NG.CA$H</p>
      <Link href='/' className='flex text-white mx-6 mt-4 w-16 items-center justify-between text-xl'>
        Sair <FaSignOutAlt />
      </Link>
    </div>
  );
};

export default Header;

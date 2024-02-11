import useRoutes from '@/hooks/useRoutes';
import SideBarItem from './SideBarItem';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';

const SideBar: React.FC = () => {
  const routes = useRoutes();
  const [signOut] = useSignOut(auth);

  return (
    <>
      <div
        className="
        lg:fixed 
        flex
        flex-row
        lg:inset-y-0 
        lg:left-0 
        rounded-lg
        my-2
        ml-2
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-blue-300 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      ">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map(item => (
              <SideBarItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div>
            <SideBarItem href="/" icon={HiArrowLeftOnRectangle} onClick={signOut} />
            <SideBarItem href="/" icon={HiArrowLeftOnRectangle} onClick={signOut} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;

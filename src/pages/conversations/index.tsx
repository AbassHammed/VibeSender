import SearchInput from '@/components/Button/SearchInput';
import { useSidebarContext } from '@/contexts/sideBarContext';
import React from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

const Index: React.FC = () => {
  const { isLinkActive } = useSidebarContext();

  return (
    <>
      {isLinkActive && (
        <aside
          className="
        fixed 
        inset-y-0 
        pb-20
        my-2
        ml-4
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        rounded-lg
        overflow-y-auto 
        border 
        border-gray-200
      ">
          <div className="px-5">
            <div className="flex justify-between mb-4 pt-4">
              <div className="text-2xl font-bold text-neutral-800">Chats</div>
              <div
                // onClick={() => setIsModalOpen(true)}
                className="
              rounded-full 
              p-2 
              bg-gray-100 
              text-gray-600 
              cursor-pointer 
              hover:opacity-75 
              transition
            ">
                <MdOutlineGroupAdd size={20} />
              </div>
            </div>
          </div>
          <SearchInput />
        </aside>
      )}
    </>
  );
};
export default Index;

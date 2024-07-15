import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div>
      <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput />
        <div className="divider px-3"></div>
        {/* <Conversations />
			<LogoutButton /> */}
      </div>
    </div>
  );
};

export default Sidebar;

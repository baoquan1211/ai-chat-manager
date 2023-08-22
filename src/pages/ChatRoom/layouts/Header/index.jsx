const Header = ({ props }) => {
  const { UserModel } = props;
  return (
    <div className="fixed w-full bg-[#A7CDFB] h-[60px] top-0 left-0 flex justify-between px-[32px]">
      <div className="py-[10px] flex items-center gap-[12px]">
        <img src="/logo.png" alt="fujinet" className="h-full" />
        <h1 className="text-[22px] font-semibold select-none">FUJICHAT</h1>
      </div>
      <div>DARK THEME {UserModel.Name}</div>
    </div>
  );
};

export default Header;

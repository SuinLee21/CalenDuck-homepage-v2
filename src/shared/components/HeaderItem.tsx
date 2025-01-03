import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import searchSidebarToggleAtom from "shared/recoil/searchSidebarToggleAtom";
import settingSidebarToggleAtom from "shared/recoil/settingSidebarToggleAtom";
import logo from "shared/imgs/logo.svg";
import alarm from "shared/imgs/alarm.svg";
import search from "shared/imgs/search.svg";
import hamburger from "shared/imgs/hamburger.svg";
import HeaderAlarmNumTagItem from "shared/components/HeaderAlarmNumTagItem";
import { Link } from "react-router-dom";

const HeaderItem = () => {
  const { pathname } = useLocation();
  const [searchSidebarToggle, setSearchSidebarToggle] = useRecoilState(
    searchSidebarToggleAtom
  );
  const [settingSidebarToggle, setSettingSidebarToggle] = useRecoilState(
    settingSidebarToggleAtom
  );

  const date = `${new Date().getFullYear()}${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  // 검색 사이드바 토글 이벤트
  const searchBtnToggleEvent = () => {
    setSearchSidebarToggle(!searchSidebarToggle);
    setSettingSidebarToggle(false); // 설정 사이드바는 닫음
  };
  // 설정 사이드바 토글 이벤트
  const settingBtnToggleEvent = () => {
    setSettingSidebarToggle(!settingSidebarToggle);
    setSearchSidebarToggle(false); // 검색 사이드바는 닫음
  };

  return (
    <header className="fixed h-[56px] top-0 left-0 right-0 w-full bg-white y-[70px] flex items-center z-50">
      <div className="w-full flex justify-between px-[40px]">
        <Link to={`/main?date=${date}`}>
          <img src={logo} alt="메인" />
        </Link>

        {(pathname === "/main" ||
          pathname === "/alarm" ||
          pathname === "/contact") && (
          <div className="flex justify-between items-center gap-[12px]">
            {/* AlarmPage로 이동 */}
            <Link to="/alarm">
              <img src={alarm} className="w-full h-full" alt="알림" />
            </Link>
            {/* SearchSidebar 토글 */}
            <button onClick={searchBtnToggleEvent}>
              <img src={search} className="w-full h-full" alt="검색" />
            </button>
            {/* SettingSidebar 토글 */}
            <button onClick={settingBtnToggleEvent}>
              <img src={hamburger} className="w-full h-full" alt="설정" />
            </button>
          </div>
        )}

        {pathname === "/manager" && (
          <div>
            <Link to={`/main?date=${date}`}>
              <button className="flex items-center px-[10px] py-[5px] border border-black rounded-[5px]">
                개인 스케줄
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default HeaderItem;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import HeaderItem from "shared/components/HeaderItem";
import MasterSidebar from "widgets/masterSidebar/MasterSidebar";
import RequestItem from "widgets/manageRequests/RequestItem";
import { TRequestItem } from "types";
import { useCookies } from "react-cookie";

// 기타 문의 목록 불러오기 GET api 연결 (/master/asks?categoryIdx=2)
const ManageEtcRequestPage = () => {
  const location = useLocation();
  const [requestListData, setRequestListData] = useState<TRequestItem[]>([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const getRequestsList = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/master/asks?categoryIdx=2`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.log("잘못된 인증 정보 제공");
          } else if (response.status === 403) {
            console.log("권한이 없는 사용자의 접근");
          }
          return;
        }
        const result = await response.json();
        if (response.status === 200) {
          setRequestListData(result.list);
        }
      } catch (error) {
        console.error("서버 에러: ", error);
      }
    };

    getRequestsList();
  }, [cookies.token]);

  // const dummyData = [
  //   {
  //     id: 1,
  //     nickname: "민석최",
  //     date: "2024/03/31",
  //     title: "기타 문의 제목 1",
  //     content:
  //       "오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ",
  //     reply:
  //       "안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧ㄴ안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧",
  //   },
  //   {
  //     id: 2,
  //     nickname: "소미유",
  //     date: "2024/03/31",
  //     title: "기타 문의 제목 2",
  //     content:
  //       "조성진 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ",
  //   },
  //   {
  //     id: 3,
  //     nickname: "윤서박",
  //     date: "2024/03/31",
  //     title: "기타 문의 제목 3",
  //     content:
  //       "미식축구 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ",
  //     reply:
  //       "안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧ㄴ안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧",
  //   },
  //   {
  //     id: 4,
  //     nickname: "수인리",
  //     date: "2024/03/31",
  //     title: "기타 문의 제목 4",
  //     content:
  //       "피파 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ",
  //   },
  //   {
  //     id: 5,
  //     nickname: "경은조",
  //     date: "2024/03/31",
  //     title: "기타 문의 제목 5",
  //     content:
  //       "뮤지컬 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ오버워치 넣어줘넣어줘넣어줘어어ㅓ어어어어어어ㅓㅓ엉어ㅓㅁ",
  //     reply:
  //       "안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧ㄴ안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧안돼요안돼용앙돼안돼안돼어ㅏ어ㅏㅇ너라앧",
  //   },
  // ];

  return (
    <>
      <HeaderItem />

      <article className="fixed mt-[70px] left-0 top-0 h-full">
        <MasterSidebar currentPath={location.pathname} />
      </article>

      <section className="mt-[70px] ml-[90px]">
        <table className="min-w-full bg-white">
          <thead className="w-full flex justify-start">
            <tr className="w-full px-[10%] flex justify-start border-b border-gray-200">
              <th className="w-[10%] py-4 flex justify-start">No</th>
            </tr>
          </thead>
          <tbody className="flex flex-col items-center">
            {requestListData.map((elem) => {
              return <RequestItem key={elem.askIdx} data={elem} />;
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ManageEtcRequestPage;

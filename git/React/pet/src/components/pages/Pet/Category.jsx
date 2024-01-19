import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const regions = [
    "전체",
    "서울",
    "경기도",
    "인천",
    "강원도",
    "대전",
    "대구/경북",
    "부산",
    "경남",
    "제주도",
]

export default function Category({query, onChange}){
    const { noticeSdt, noticeEdt, kindCd,  } = query;

    return(
        <div>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                {/* 공고 시작, 마감일 */}
                <div>
                    <label>
                        <FaCalendarAlt className="icon"/>
                        &nbsp;날짜
                        <b>*</b>
                    </label>
                    <div className="calendar">
                        <input 
                            className="input"
                            name="noticeSdt"
                            id="noticeSdt"
                            value={noticeSdt}
                            onChange={onChange}
                            type="date">
                        </input>
                        <input 
                            className="input"
                            name="noticeEdt"
                            id="noticeEdt"
                            value={noticeEdt}
                            onChange={onChange}
                            type="date">
                        </input>
                    </div>
                </div>

                {/* 품종 */}
                <div>
                    <label>
                        <MdCategory className="icon"/>
                        &nbsp;품종
                        <b>*</b>
                    </label>
                    <select
                        className="select"
                        name="kindCd"
                        id="kindCd"
                        value={kindCd}
                        onChange={onChange}>
                            <option value={""}>전체</option>
                            <option value="[개]">강아지</option>
                            <option value="[고양이]">고양이</option>
                            <option value="[기타축종]">다른친구들</option>
                    </select>
                </div>
                <button className="button" type="button" onClick={() => console.log('조회 완료')}>조회</button>
            </form>
        </div>

    )
}
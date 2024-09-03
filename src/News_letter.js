import './css/section_01.css';
import './css/news.css';
import './css/careers.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function News_letter() {
    const newsBord = useSelector((state) => state.news_bord);

    return (
        <>
            <section className="p_l_d_b" style={{ paddingTop: '20px' }}>
                <div className="boarder_wrapper" data-aos="fade-up" data-aos-duration="800">
                    <div className="row">
                        <News_border newsBord={newsBord} />
                    </div>
                </div>
            </section>
        </>
    );

    function News_border({ newsBord }) {
        return (
            <>
                {newsBord.map((a, i) => (
                    <div key={i} className="board_list col-xl-4 col-md-4 mgt_20">
                        <dl>
                            <dt className="board_img">{newsBord[i].img}</dt>
                            <dd>
                                <div className="board_title">
                                    <dl>
                                        <dt>{newsBord[i].title}</dt>
                                        <dd>{newsBord[i].sub_title}</dd>
                                    </dl>
                                </div>
                                <div className="board_cont">
                                    {newsBord[i].sub_content}
                                </div>
                                <div className="board_more_button">{newsBord[i].more}</div>
                            </dd>
                        </dl>
                    </div>
                ))}
            </>
        );
    }
}

export default News_letter;

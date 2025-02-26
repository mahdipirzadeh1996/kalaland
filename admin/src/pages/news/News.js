import React, { useEffect, useState } from 'react';
import { Add } from 'iconsax-react';

import './news.scss';
import NewsList from '../../component/newsList/NewsList';
import AddNews from '../../component/addNews/AddNews';
import EditNews from '../../component/editNews/EditNews';

const News = ({ setTitle, setCurrent }) => {
    const [newsStatus, setNewsStatus] = useState({
        'newsList': true,
        'addNews': false,
        'editNews': false,
    });
    const [item, setItem] = useState(null);

    useEffect(() => {
      setTitle('News');
      setCurrent('/news');
    }, []);

    return (
        <div className='news'>
            {newsStatus.newsList &&
                <>
                    <NewsList item={item} setItem={setItem} newsStatus={newsStatus} setNewsStatus={setNewsStatus} />

                    <button className='floatBtn' onClick={() => {
                        setNewsStatus({
                            ...newsStatus,
                            'addNews': true,
                            'newsList': false,
                        });
                    }}>
                        <Add
                            size="32"
                            color='#fff'
                        />
                    </button>
                </>
            }

            {newsStatus.addNews &&
                <AddNews newsStatus={newsStatus} setNewsStatus={setNewsStatus} />
            }

            {newsStatus.editNews &&
              <EditNews item={item} setItem={setItem} newsStatus={newsStatus} setNewsStatus={setNewsStatus} />
            }
        </div>
    );
};

export default News;
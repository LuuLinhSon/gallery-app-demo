import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';

import './Home.scss';
import InputBox from 'components/inputBox/InputBox';
import useAPI from 'api/useAPI';
import usePage from 'stores/CommonPageStore/commonPageStore';
import { ParamsStore } from 'stores/CommonPageStore/commonPageStore.d';
import { ImageGiphy } from 'stores/Favourites/favouritesStore.d';
import GridImage from 'components/gridImage/GridImage';
import useFavourites from 'stores/Favourites/favouritesStore';
import { get } from 'lodash';
import Spinner from 'components/spinner/Spinner';

const Main: React.FC = () => {
  const [statePage, actionPage] = usePage();
  const [stateFavourites] = useFavourites();
  const { data: giphyResponse, setCurrentParams, setCurrentInitialState, loading } = useAPI({
    url: 'https://api.giphy.com/v1/gifs/search',
  });
  const [activeTab, setActiveTab] = useState('1');
  const [totalCount, setTotalCount] = useState(0);
  const [imageList, setImageList] = useState<ImageGiphy[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const totalFavouritesImage = stateFavourites?.dataFavourites?.length;

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInitialState(true);
    const values = e.currentTarget.value;
    const newParams: ParamsStore = { ...statePage.params, q: values };
    actionPage.setSearching(true, newParams);
    actionPage.setPagination(0);
    setCurrentPage(0);
  };

  const handlePageClick = (data: any) => {
    actionPage.setPagination(data.selected * 8);
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    const imageListTransform: ImageGiphy[] = giphyResponse?.data?.map((item: any) => {
      return {
        type: item.type,
        id: item.id,
        url: item.url,
        username: item.username,
        title: item.title,
        rating: item.rating,
        images: {
          fixed_height: item?.images?.fixed_height,
        },
      };
    });

    const totalImage = get(giphyResponse, 'pagination.total_count', 0);

    setTotalCount(totalImage / 8);
    setImageList(imageListTransform);
  }, [giphyResponse]);

  useEffect(() => {
    if (statePage.isPagination || statePage.isSearch) {
      setCurrentParams(statePage.params);
    }
  }, [setCurrentParams, statePage]);

  return (
    <div className="home-page">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            SEARCH
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            {`FAVOURITES (${totalFavouritesImage})`}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className="tab-layout">
          <InputBox classname="search" title="Start searching for images" onChange={onChangeSearch} />
          {loading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <GridImage listImage={imageList} />
          )}
          {totalCount > 8 && (
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              forcePage={currentPage}
            />
          )}
        </TabPane>
        <TabPane tabId="2" className="tab-layout">
          <GridImage listImage={stateFavourites.dataFavourites} isFavourites={true} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Main;

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TopSCDataInfo } from "../../data/top-sc";
import { SearchResultList } from "../../common/components/SearchResultList/SearchResultList";
import { useNavigate, useLocation } from 'react-router-dom';

export const AllByContinentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [topScData, setTopScData] = useState<TopSCDataInfo>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const queryUrl = `https://api.longeviquest.com/v1/queries/supercentenarians/recent_validations`;

  const updateUrlParams = (page: number, limit: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1) {
      setCurrentPage(page);
      updateUrlParams(page, itemsPerPage);
    }
  };

  const handleLimitChange = (limit: number) => {
    const currentFirstItem = (currentPage - 1) * itemsPerPage + 1;
    const newPage = Math.ceil(currentFirstItem / limit);
    setItemsPerPage(limit);
    setCurrentPage(newPage);
    updateUrlParams(newPage, limit);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1');
    const limit = parseInt(params.get('limit') || '25');

    if (page !== currentPage) setCurrentPage(page);
    if (limit !== itemsPerPage) setItemsPerPage(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      await fetchData();
      setIsFetching(false);
    };
    fetch();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    const url = `${queryUrl}?page=${currentPage}&limit=${itemsPerPage}`;
    const response = await fetch(url);
    const data = await response.json();
    setTopScData(data);
  };

  const getSearchResults = () => {
    return (
      <Flex width={"100%"} className="QueryViewWrapper">
        <Tabs className="QueryViewTabs" width={"100%"} variant="enclosed">
          <TabList className="QueryViewTabList" width={"100%"}>
            <Tab className="QueryViewTab">List</Tab>
          </TabList>
          <TabPanels className="QueryViewTabPanels">
            <TabPanel className="QueryViewTabPanel">
              {!isFetching && topScData && (
                <SearchResultList
                  url={queryUrl}
                  content={topScData?.content ?? []}
                  count={topScData?.count ?? 0}
                  isLoaded={!isFetching}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    );
  };

  return (
    <Flex
      className="AllByContinentPageWrapper"
      height={"100%"}
      direction={"row"}
      gap={2}
    >
      {getSearchResults()}
    </Flex>
  );
};

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

export const AllByContinentPage = () => {
  const [topScData, setTopScData] = useState<TopSCDataInfo>();
  const [continent, setContinent] = useState("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const queryUrl = `https://api.longeviquest.com/v1/queries/supercentenarians/recent_validations`;

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      await fetchData();
      setIsFetching(false);
    };
    fetch();
  }, []);

  const fetchData = async () => {
    const response = await fetch(queryUrl);
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

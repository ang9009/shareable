import { DynamicWidgets, InstantSearch } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import {
  CustomInfiniteHits,
  CustomSearchBox,
  CustomSortby,
  CustomStats,
  ListingCard,
} from "../../features/search";
import CustomRefinementList from "../../features/search/components/CustomRefinementList/CustomRefinementList";
import PageContainer from "../../layouts/PageContainer/PageContainer";
import "./Search.css";
import SearchCSS from "./Search.module.css";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: process.env.REACT_APP_TYPESENSE_API_KEY,
    nodes: [
      {
        host: process.env.REACT_APP_TYPESENSE_HOST,
        port: "443",
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    queryBy: "name,description",
    filterBy: "status:!=sold",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

function Search() {
  const Hit = ({ hit }) => {
    return <ListingCard listing={hit} />;
  };

  return (
    <PageContainer type={"wide"}>
      <InstantSearch
        searchClient={searchClient}
        indexName="listings"
        routing={true}
      >
        <CustomSearchBox />
        <div className={SearchCSS["filter-and-sort-widgets"]}>
          <div className={SearchCSS["stats-and-sort-by-container"]}>
            <CustomSortby />
            <CustomStats />
          </div>
          <DynamicWidgets>
            {/* DynamicWidgets only supports components with an attribute prop */}
            <CustomRefinementList attribute={"category"} />
          </DynamicWidgets>
        </div>
        <CustomInfiniteHits />
      </InstantSearch>
    </PageContainer>
  );
}

export default Search;

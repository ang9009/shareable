import { Hits, InstantSearch, SearchBox, Stats } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { ListingCard } from "../../features/search";
import PageContainer from "../../layouts/PageContainer/PageContainer";
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
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

function Search() {
  const Hit = ({ hit }) => {
    return <ListingCard listing={hit} />;
  };

  return (
    <PageContainer type={"wide"}>
      <InstantSearch searchClient={searchClient} indexName="listings">
        <SearchBox />
        <Stats />
        <div className={SearchCSS["listings-container"]}>
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </PageContainer>
  );
}

export default Search;

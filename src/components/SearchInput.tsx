import { baseURL } from "@/API";
import { useEdisonContext } from "@/context/EdisonContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useMyParams } from "@/hooks/useMyParams";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchInput() {
  const [inputVal, setInputVal] = useState("");
  const { setCurrentProducts } = useEdisonContext();
  const quearyParam = useMyParams();

  const debounced = useDebounce(inputVal, 400);

  async function searchedProducts() {
    try {
      if (quearyParam?.length) {
        const response = await axios.get(
          `${baseURL}/api/products/?search=${debounced}&category_id=${quearyParam}`
        );
        if (response.status === 200) {
          setCurrentProducts(response.data.data);
        }
      } else {
        const response = await axios.get(
          `${baseURL}/api/products/?search=${debounced}`
        );
        if (response.status === 200) {
          setCurrentProducts(response.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    searchedProducts();
  }, [debounced, quearyParam]);

  return (
    <div className="container" style={{ paddingTop: 0 }}>
      <div className="search-box">
        <button className="searchIcon">
          <CiSearch />
        </button>
        <input
          type="search"
          className="searchInput"
          autoComplete="off"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="поиск..."
        />
      </div>
    </div>
  );
}

export default SearchInput;

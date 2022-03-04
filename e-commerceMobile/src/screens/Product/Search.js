import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { searchProductsApi } from "../../api/search";
import { size } from "lodash";
import StatusBarCustom from "../../components/StatusBarCustom";
import colors from "../../styles/colors";
import Search from "../../components/Search/Search";
import ScreenLoading from "../../components/ScreenLoading";
import ResultNotFound from "../../components/Search/ResultNotFound";
import ProductList from "../../components/Search/ProductList";

export default function SearchScreen(props) {
  const { route } = props;
  const { params } = route;
  const { search } = params;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductsApi(search);
      setProducts(response);
    })();
  }, [search]);
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search currentSearch={search} />

      {!products ? (
        <ScreenLoading text="Buscando productos" />
      ) : size(products) === 0 ? (
        <ResultNotFound search={search} />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}

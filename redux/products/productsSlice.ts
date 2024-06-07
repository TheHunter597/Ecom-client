import { createSlice } from "@reduxjs/toolkit";

interface ProductsSliceState {
  createProduct: {
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    countInStock: string;
    sizes: {
      abbreviation: string;
      name: string;
    }[];
    features: {
      description: string;
      name: string;
    }[];
    colors: {
      hex: string;
      name: string;
    }[];
    tags: string[];
  };
  createProductCurrents: {
    currentTag: string;
    currentSizeAbbreviation: string;
    currentSizeName: string;
    currentColorHex: string;
    currentColorName: string;
    currentFeatureDescription: string;
    currentFeatureName: string;
  };
}
const initialState: ProductsSliceState = {
  createProduct: {
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
    countInStock: "",
    sizes: [],
    features: [],
    colors: [],
    tags: [],
  },
  createProductCurrents: {
    currentTag: "",
    currentSizeName: "",
    currentColorHex: "",
    currentColorName: "",
    currentFeatureDescription: "",
    currentFeatureName: "",
    currentSizeAbbreviation: "",
  },
};

const ProductsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductTitle: (state, action) => {
      if (action.payload.length > 250) {
        state.createProduct.title = state.createProduct.title;
      }
      state.createProduct.title = action.payload;
      localStorage.setItem("productTitle", action.payload);
    },
    setProductPrice: (state, action) => {
      if (Object.is(NaN, +action.payload)) {
        state.createProduct.price = state.createProduct.price;
      } else {
        state.createProduct.price = action.payload;
      }
      localStorage.setItem("productPrice", action.payload);
    },
    setProductDescription: (state, action) => {
      state.createProduct.description = action.payload;
      localStorage.setItem("productDescription", action.payload);
    },
    setProductImage: (state, action) => {
      state.createProduct.image = action.payload;
      if (
        action.payload != localStorage.getItem("productImage") &&
        action.payload.length > 20
      ) {
        localStorage.setItem("productImage", action.payload);
      }
    },
    setProductCategory: (state, action) => {
      state.createProduct.category = action.payload;
      localStorage.setItem("productCategory", action.payload);
    },
    setProductCountInStock: (state, action) => {
      state.createProduct.countInStock = action.payload;
      localStorage.setItem("productCountInStock", action.payload);
    },
    addProductFeature: (state, action) => {
      state.createProduct.features.push({
        name: state.createProductCurrents.currentFeatureName,
        description: state.createProductCurrents.currentFeatureDescription,
      });
      localStorage.setItem(
        "productFeatures",
        JSON.stringify(state.createProduct.features)
      );
    },
    removeProductFeature: (state, action) => {
      state.createProduct.features = state.createProduct.features.filter(
        (feature) => feature.name !== action.payload
      );
      localStorage.setItem(
        "productFeatures",
        JSON.stringify(state.createProduct.features)
      );
    },
    addProductSize: (state, action) => {
      state.createProduct.sizes.push({
        abbreviation: state.createProductCurrents.currentSizeAbbreviation,
        name: state.createProductCurrents.currentSizeName,
      });
      localStorage.setItem(
        "productSizes",
        JSON.stringify(state.createProduct.sizes)
      );
    },
    removeProductSize: (state, action) => {
      state.createProduct.sizes = state.createProduct.sizes.filter(
        (size) => size.abbreviation !== action.payload
      );
      localStorage.setItem(
        "productSizes",
        JSON.stringify(state.createProduct.sizes)
      );
    },
    addProductColor: (state, action) => {
      state.createProduct.colors.push({
        hex: state.createProductCurrents.currentColorHex,
        name: state.createProductCurrents.currentColorName,
      });
      localStorage.setItem(
        "productColors",
        JSON.stringify(state.createProduct.colors)
      );
    },
    removeProductColor: (state, action) => {
      state.createProduct.colors = state.createProduct.colors.filter(
        (color) => color.hex !== action.payload
      );
      localStorage.setItem(
        "productColors",
        JSON.stringify(state.createProduct.colors)
      );
    },
    addProductTag: (state, action) => {
      state.createProduct.tags.push(state.createProductCurrents.currentTag);
      localStorage.setItem(
        "productTags",
        JSON.stringify(state.createProduct.tags)
      );
    },
    removeProductTag: (state, action) => {
      state.createProduct.tags = state.createProduct.tags.filter(
        (tag) => tag !== action.payload.tag
      );
      localStorage.setItem(
        "productTags",
        JSON.stringify(state.createProduct.tags)
      );
    },
    setCurrentTag: (state, action) => {
      state.createProductCurrents.currentTag = action.payload;
    },
    setCurrentSizeName: (state, action) => {
      state.createProductCurrents.currentSizeName = action.payload;
    },
    setCurrentSizeAbbreviation: (state, action) => {
      state.createProductCurrents.currentSizeAbbreviation = action.payload;
    },
    setCurrentColorHex: (state, action) => {
      if (action.payload[0] != "#") {
        action.payload = "#" + action.payload;
      }
      state.createProductCurrents.currentColorHex = action.payload;
    },
    setCurrentColorName: (state, action) => {
      state.createProductCurrents.currentColorName = action.payload;
    },
    setCurrentFeatureDescription: (state, action) => {
      state.createProductCurrents.currentFeatureDescription = action.payload;
    },
    setCurrentFeatureName: (state, action) => {
      state.createProductCurrents.currentFeatureName = action.payload;
    },
    loadLocalStorage: (state) => {
      state.createProduct.title = localStorage.getItem("productTitle") || "";
      state.createProduct.price = localStorage.getItem("productPrice") || "";
      state.createProduct.description =
        localStorage.getItem("productDescription") || "";
      state.createProduct.image = localStorage.getItem("productImage") || "";
      state.createProduct.category =
        localStorage.getItem("productCategory") || "";
      state.createProduct.countInStock =
        localStorage.getItem("productCountInStock") || "";
      state.createProduct.sizes = JSON.parse(
        localStorage.getItem("productSizes") || "[]"
      );
      state.createProduct.features = JSON.parse(
        localStorage.getItem("productFeatures") || "[]"
      );
      state.createProduct.colors = JSON.parse(
        localStorage.getItem("productColors") || "[]"
      );
      state.createProduct.tags = JSON.parse(
        localStorage.getItem("productTags") || "[]"
      );
    },
  },
});

export const {
  setProductTitle,
  setProductPrice,
  setProductDescription,
  setProductImage,
  setProductCategory,
  setProductCountInStock,
  addProductFeature,
  removeProductFeature,
  addProductSize,
  removeProductSize,
  addProductColor,
  removeProductColor,
  addProductTag,
  removeProductTag,
  setCurrentTag,
  setCurrentSizeName,
  setCurrentSizeAbbreviation,
  setCurrentColorHex,
  setCurrentColorName,
  setCurrentFeatureDescription,
  setCurrentFeatureName,
  loadLocalStorage,
} = ProductsSlice.actions;

export const selectCreateProduct = (state: { product: ProductsSliceState }) =>
  state.product.createProduct;
export const selectCreateProductCurrents = (state: {
  product: ProductsSliceState;
}) => state.product.createProductCurrents;
export default ProductsSlice.reducer;

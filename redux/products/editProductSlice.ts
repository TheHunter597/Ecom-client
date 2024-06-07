import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
interface ProductsSliceState {
  editProduct: {
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
  editProductCurrents: {
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
  editProduct: {
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
  editProductCurrents: {
    currentTag: "",
    currentSizeName: "",
    currentColorHex: "",
    currentColorName: "",
    currentFeatureDescription: "",
    currentFeatureName: "",
    currentSizeAbbreviation: "",
  },
};
const editProductSlice = createSlice({
  name: "editProduct",
  initialState: initialState,
  reducers: {
    setEditProductTitle: (state, action) => {
      if (action.payload.length > 250) {
        state.editProduct.title = state.editProduct.title;
      }
      state.editProduct.title = action.payload;
    },
    setEditProductPrice: (state, action) => {
      if (Object.is(NaN, +action.payload)) {
        state.editProduct.price = state.editProduct.price;
      } else {
        state.editProduct.price = action.payload;
      }
    },
    setEditProductDescription: (state, action) => {
      state.editProduct.description = action.payload;
    },
    setEditProductImage: (state, action) => {
      state.editProduct.image = action.payload;
    },
    setEditProductCategory: (state, action) => {
      state.editProduct.category = action.payload;
    },
    setEditProductCountInStock: (state, action) => {
      state.editProduct.countInStock = action.payload;
    },
    addEditProductFeature: (state, action) => {
      state.editProduct.features.push({
        name: state.editProductCurrents.currentFeatureName,
        description: state.editProductCurrents.currentFeatureDescription,
      });
    },
    removeEditProductFeature: (state, action) => {
      state.editProduct.features = state.editProduct.features.filter(
        (feature) => feature.name !== action.payload
      );
    },
    addEditProductSize: (state, action) => {
      state.editProduct.sizes.push({
        abbreviation: state.editProductCurrents.currentSizeAbbreviation,
        name: state.editProductCurrents.currentSizeName,
      });
    },
    removeEditProductSize: (state, action) => {
      state.editProduct.sizes = state.editProduct.sizes.filter(
        (size) => size.abbreviation !== action.payload
      );
    },
    addEditProductColor: (state, action) => {
      state.editProduct.colors.push({
        hex: state.editProductCurrents.currentColorHex,
        name: state.editProductCurrents.currentColorName,
      });
    },
    removeEditProductColor: (state, action) => {
      state.editProduct.colors = state.editProduct.colors.filter(
        (color) => color.hex !== action.payload
      );
    },
    addEditProductTag: (state, action) => {
      state.editProduct.tags.push(state.editProductCurrents.currentTag);
    },
    removeEditProductTag: (state, action) => {
      state.editProduct.tags = state.editProduct.tags.filter(
        (tag) => tag !== action.payload.tag
      );
    },
    setEditCurrentTag: (state, action) => {
      state.editProductCurrents.currentTag = action.payload;
    },
    setEditCurrentSizeName: (state, action) => {
      state.editProductCurrents.currentSizeName = action.payload;
    },
    setEditCurrentSizeAbbreviation: (state, action) => {
      state.editProductCurrents.currentSizeAbbreviation = action.payload;
    },
    setEditCurrentColorHex: (state, action) => {
      if (action.payload[0] != "#") {
        action.payload = "#" + action.payload;
      }
      state.editProductCurrents.currentColorHex = action.payload;
    },
    setEditCurrentColorName: (state, action) => {
      state.editProductCurrents.currentColorName = action.payload;
    },
    setEditCurrentFeatureDescription: (state, action) => {
      state.editProductCurrents.currentFeatureDescription = action.payload;
    },
    setEditCurrentFeatureName: (state, action) => {
      state.editProductCurrents.currentFeatureName = action.payload;
    },
    loadEditProductData: (state, action) => {
      state.editProduct = action.payload;
    },
  },
});

export default editProductSlice.reducer;
export const {
  setEditProductTitle,
  setEditProductPrice,
  setEditProductDescription,
  setEditProductImage,
  setEditProductCategory,
  setEditProductCountInStock,
  addEditProductFeature,
  removeEditProductFeature,
  addEditProductSize,
  removeEditProductSize,
  addEditProductColor,
  removeEditProductColor,
  addEditProductTag,
  removeEditProductTag,
  setEditCurrentTag,
  setEditCurrentSizeName,
  setEditCurrentSizeAbbreviation,
  setEditCurrentColorHex,
  setEditCurrentColorName,
  setEditCurrentFeatureDescription,
  setEditCurrentFeatureName,
  loadEditProductData,
} = editProductSlice.actions;

export const selectEditProduct = (state: RootState) =>
  state.editProduct.editProduct;
export const selectEditProductCurrents = (state: RootState) =>
  state.editProduct.editProductCurrents;

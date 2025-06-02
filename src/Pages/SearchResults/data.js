import { useMemo } from "react";
// Tool Bar
export const viewModes = [
  { class: "mode-list d-block", col: 1 },
  { class: "mode-grid grid-2 d-block", col: 2 },
  { class: "mode-grid grid-3 d-md-block", col: 3 },
  { class: "mode-grid grid-4 d-lg-block", col: 4 },
  { class: "mode-grid grid-5 d-xl-block", col: 5 },
];

export const showOptions = [10, 15, 20, 25, 30];
export const sortOptions = (t) => [
  { value: "Featured", label: t("SortingOptions.Featured") },
  { value: "Best_Selling", label: t("SortingOptions.Best_Selling") },
  { value: "A_to_Z", label: t("SortingOptions.A_to_Z") },
  { value: "Z_to_A", label: t("SortingOptions.Z_to_A") },
  { value: "Price_Low_High", label: t("SortingOptions.Price_Low_High") },
  { value: "Price_High_Low", label: t("SortingOptions.Price_High_Low") },
  { value: "Date_Old_New", label: t("SortingOptions.Date_Old_New") },
  { value: "Date_New_Old", label: t("SortingOptions.Date_New_Old") },
];
///

// AvailabitiyFilter

export const availabilityOptions = [
  { id: "instock", label: "In stock" },
  { id: "outofstock", label: "Out of stock" },
];

// BrandFilter
// export const brands = ["ZARA", "NIKE", "ADIDAS"];

// ColorFilter
export const colors = [
  "Black",
  "Red",
  "Blue",
  "Pink",
  "Gray",
  "Green",
  "Orange",
  "Yellow",
];

// ProductTags
export const tags = [
  "Women",
  "Shoes",
  "Beauty",
  "Accessories",
  "$100 - $400",
  "Above $800",
  "Black",
  "Blue",
  "Red",
  "M",
  "XS",
];

// ProductTypeFilter
export const productTypes = [
  { id: "fashion", label: "Fashion" },
  { id: "electronic", label: "Electronic" },
  { id: "shoes", label: "Shoes" },
];

// SidebarCategories
export const categories = [
  {
    name: "Clothing",
    subCategories: [
      { name: "Men", items: ["Shirt", "Jeans", "Shoes"] },
      { name: "Women", items: [] },
      { name: "Child", items: [] },
    ],
  },
  {
    name: "Jewellery",
    subCategories: [
      { name: "Ring", items: [] },
      { name: "Necklaces", items: [] },
      { name: "Earrings", items: [] },
    ],
  },
  {
    name: "Accessories",
    subCategories: [
      { name: "Bags", items: [] },
      { name: "Watches", items: [] },
    ],
  },
  {
    name: "Shoes",
    subCategories: [
      { name: "Sneakers", items: [] },
      { name: "Boots", items: [] },
    ],
  },
  {
    name: "Electronic",
    subCategories: [
      { name: "Phones", items: [] },
      { name: "Laptops", items: [] },
    ],
  },
  {
    name: "Cosmetics",
    subCategories: [
      { name: "Lipsticks", items: [] },
      { name: "Foundation", items: [] },
    ],
  },
];

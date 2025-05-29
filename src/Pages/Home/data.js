// slide show
// Images
import banner1Desktop from "../../assets/images/slideshow/demo1-banner1.jpg";
import banner2Desktop from "../../assets/images/slideshow/demo1-banner2.jpg";
import banner3Desktop from "../../assets/images/slideshow/demo1-banner3.jpg";
import banner1Mobile from "../../assets/images/slideshow/demo1-banner1-mbl.jpg";
import banner2Mobile from "../../assets/images/slideshow/demo1-banner2-mbl.jpg";
import banner3Mobile from "../../assets/images/slideshow/demo1-banner3-mbl.jpg";

// FOR SERVICES SECTION
export const services = [
  {
    icon: "fa-solid fa-phone",
    title: "services.call",
    subtitle: "services.call_sub",
  },
  {
    icon: "fa-solid fa-truck",
    title: "services.pickup",
    subtitle: "services.pickup_sub",
  },
  {
    icon: "fa-solid fa-credit-card",
    title: "services.payment",
    subtitle: "services.payment_sub",
  },
  {
    icon: "fa-solid fa-rotate",
    title: "services.returns",
    subtitle: "services.returns_sub",
  },
];

// For SlideShow Componetns
export const slides = [
  {
    desktop: banner1Desktop,
    mobile: banner1Mobile,
    subtitle: "Elegant design",
    title: "Making someone feel\npretty is an art",
    caption: "Perfectly designed to ensure ultimate comfort and style",
    position: "middle-left",
    buttons: [
      { label: "Shop Women", href: "/ShopGrid", primary: true },
      { label: "Shop Men", href: "/ShopGrid", primary: false },
    ],
  },
  {
    desktop: banner2Desktop,
    mobile: banner2Mobile,
    subtitle: "",
    title: "Spread Positive\nEnergy With Hema",
    caption: "The must-have closet essential women wardrobe for the year",
    position: "middle-right",
    buttons: [{ label: "Explore Now!", href: "/ShopGrid", primary: true }],
  },
  {
    desktop: banner3Desktop,
    mobile: banner3Mobile,
    subtitle: "",
    title: "Design Your Next\nFavourite Wear",
    caption: "The outfit that blend elegance and style for your casual wear",
    position: "middle-right",
    buttons: [{ label: "Shop now", href: "/ShopGrid", primary: true }],
  },
];

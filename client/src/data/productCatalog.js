const kattleImg = "/electric-kattle.png";
const phoneImg = "/phone.png";
const phone2Img = "/phone2.png";
const headphonesImg = "/headphones.png";
const laptopImg = "/laptop.png";
const watchImg = "/watch.png";
const cameraImg = "/camera.png";
const headsetImg = "/headset.png";

const tshirtImg = "/recommended-tshirt.png";
const jacketImg = "/recommended-jacket.png";
const blazerImg = "/recommended-blazer.png";
const walletBlueImg = "/recommended-wallet-blue.png";
const backpackImg = "/recommended-backpack.png";
const shortsImg = "/recommended-shorts.png";

const sofaAndChairImg = "/sofa-and-chair.png";
const softChairsImg = "/soft-chairs.png";
const kitchenDishesImg = "/kitchen-dishes.png";
const smartWatchesImg = "/smart-watches.png";
const kitchenMixerImg = "/kitchen-mixer.png";
const blendersImg = "/blenders.png";
const homeApplianceImg = "/home-appliance.png";
const coffeeMakerImg = "/coffee-maker.png";
const smartwatches1Img = "/smart-watches1.png";

const thumb1 = "/shirt-1.png";
const thumb2 = "/shirt-2.png";
const thumb3 = "/shirt-3.png";
const thumb4 = "/shirt-4.png";
const thumb5 = "/shirt-5.png";
const thumb6 = "/shirt-6.png";

const defaultThumbs = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];

const createProduct = ({
  id,
  title,
  image,
  price,
  oldPrice = "",
  rating = 7.5,
  orders = "154 orders",
  shipping = "Free Shipping",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  shortDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  category = "General",
  subtitle = "",
  thumbnails = defaultThumbs,
  reviews = 32,
  sold = 154,
  stockStatus = "In stock",
  priceTiers = [
    { price: "$98.00", qty: "50-100 pcs" },
    { price: "$90.00", qty: "100-700 pcs" },
    { price: "$78.00", qty: "700+ pcs" },
  ],
  specificationRows = [
    { label: "Price:", value: "Negotiable" },
    { label: "Type:", value: "Classic shoes" },
    { label: "Material:", value: "Plastic material" },
    { label: "Design:", value: "Modern nice" },
    { label: "Customization:", value: "Customized logo and design custom packages" },
    { label: "Protection:", value: "Refund Policy" },
    { label: "Warranty:", value: "2 years full warranty" },
  ],
  detailSpecRows = [
    { label: "Model", value: "#8786867" },
    { label: "Style", value: "Classic style" },
    { label: "Certificate", value: "ISO-898921212" },
    { label: "Size", value: "34mm x 450mm x 19mm" },
    { label: "Memory", value: "36GB RAM" },
  ],
  features = [
    "Some great feature name here",
    "Lorem ipsum dolor sit amet, consectetur",
    "Duis aute irure dolor in reprehenderit",
    "Some great feature name here",
  ],
  seller = {
    name: "Guanjoi Trading LLC",
    location: "Germany, Berlin",
    verified: true,
    shipping: "Worldwide shipping",
    logoLetter: "R",
  },
  relatedIds = [],
  youMayLikeIds = [],
}) => ({
  id,
  title,
  image,
  price,
  oldPrice,
  rating,
  orders,
  shipping,
  description,
  shortDescription,
  category,
  subtitle,
  thumbnails,
  reviews,
  sold,
  stockStatus,
  priceTiers,
  specificationRows,
  detailSpecRows,
  features,
  seller,
  relatedIds,
  youMayLikeIds,
});

export const productCatalog = [
  createProduct({
    id: 1,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    image: kattleImg,
    price: "$998.00",
    oldPrice: "$1128.00",
    category: "Electronics",
    relatedIds: [304, 201, 307, 306, 6, 105],
    youMayLikeIds: [303, 301, 302, 307, 305],
  }),
  createProduct({
    id: 2,
    title: "GoPro HERO6 4K Action Camera - Black",
    image: phoneImg,
    price: "$998.00",
    category: "Electronics",
    relatedIds: [304, 201, 307, 306, 6, 105],
    youMayLikeIds: [303, 301, 302, 307, 305],
  }),
  createProduct({
    id: 3,
    title: "GoPro HERO6 4K Action Camera - Black",
    image: phone2Img,
    price: "$998.00",
    category: "Electronics",
    relatedIds: [304, 201, 307, 306, 6, 105],
    youMayLikeIds: [303, 301, 302, 307, 305],
  }),
  createProduct({
    id: 4,
    title: "Laptop Professional Bundle - Performance Series",
    image: laptopImg,
    price: "$998.00",
    category: "Computers",
    relatedIds: [206, 201, 307, 304, 105, 108],
    youMayLikeIds: [303, 301, 302, 307, 305],
  }),
  createProduct({
    id: 5,
    title: "Smart Watch Modern Edition - Space Gray",
    image: watchImg,
    price: "$998.00",
    oldPrice: "$1128.00",
    category: "Wearables",
    relatedIds: [201, 204, 307, 304, 105, 6],
    youMayLikeIds: [303, 301, 302, 307, 305],
  }),
  createProduct({
    id: 6,
    title: "Professional Camera Kit with Lens Bundle",
    image: headphonesImg,
    price: "$998.00",
    category: "Electronics",
    relatedIds: [304, 201, 307, 306, 5, 105],
    youMayLikeIds: [303, 301, 302, 307, 305],
  }),

  createProduct({ id: 101, title: "Soft chairs", image: softChairsImg, price: "$19.00", category: "Home" }),
  createProduct({ id: 102, title: "Sofa & chair", image: sofaAndChairImg, price: "$19.00", category: "Home" }),
  createProduct({ id: 103, title: "Kitchen dishes", image: kitchenDishesImg, price: "$19.00", category: "Home" }),
  createProduct({ id: 104, title: "Smart watches", image: smartWatchesImg, price: "$19.00", category: "Home" }),
  createProduct({ id: 105, title: "Kitchen mixer", image: kitchenMixerImg, price: "$100.00", category: "Home" }),
  createProduct({ id: 106, title: "Blenders", image: blendersImg, price: "$39.00", category: "Home" }),
  createProduct({ id: 107, title: "Home appliance", image: homeApplianceImg, price: "$19.00", category: "Home" }),
  createProduct({ id: 108, title: "Coffee maker", image: coffeeMakerImg, price: "$10.00", category: "Home" }),

  createProduct({ id: 201, title: "Smart watches", image: watchImg, price: "$19.00", category: "Electronics" }),
  createProduct({ id: 202, title: "Cameras", image: cameraImg, price: "$89.00", category: "Electronics" }),
  createProduct({ id: 203, title: "Headphones", image: headphonesImg, price: "$10.00", category: "Electronics" }),
  createProduct({ id: 204, title: "Smart watches", image: smartwatches1Img, price: "$90.00", category: "Electronics" }),
  createProduct({ id: 205, title: "Gaming set", image: headsetImg, price: "$35.00", category: "Electronics" }),
  createProduct({ id: 206, title: "Laptops & PC", image: laptopImg, price: "$340.00", category: "Electronics" }),
  createProduct({ id: 207, title: "Smartphones", image: phone2Img, price: "$19.00", category: "Electronics" }),
  createProduct({ id: 208, title: "Electric kettle", image: kattleImg, price: "$240.00", category: "Electronics" }),

  createProduct({ id: 301, title: "T-shirts with multiple colors, for men", image: tshirtImg, price: "$10.30", category: "Fashion" }),
  createProduct({ id: 302, title: "Jeans shorts for men blue color", image: jacketImg, price: "$10.30", category: "Fashion" }),
  createProduct({ id: 303, title: "Brown winter coat medium size", image: blazerImg, price: "$12.50", category: "Fashion" }),
  createProduct({ id: 304, title: "Jeans bag for travel for men", image: walletBlueImg, price: "$34.00", category: "Fashion" }),
  createProduct({ id: 305, title: "Leather wallet", image: backpackImg, price: "$99.00", category: "Fashion" }),
  createProduct({ id: 306, title: "Canon camera black, 100x zoom", image: shortsImg, price: "$9.99", category: "Fashion" }),
  createProduct({ id: 307, title: "Headset for gaming with mic", image: headphonesImg, price: "$8.99", category: "Electronics" }),
  createProduct({ id: 308, title: "Smartwatch silver color modern", image: backpackImg, price: "$10.30", category: "Electronics" }),
  createProduct({ id: 309, title: "Blue wallet for men leather material", image: smartWatchesImg, price: "$10.30", category: "Fashion" }),
  createProduct({ id: 310, title: "Jeans bag for travel for men", image: smartwatches1Img, price: "$80.95", category: "Fashion" }),
];

export const getCatalogProducts = () => productCatalog;

export const getCatalogProductById = (id) =>
  productCatalog.find((item) => String(item.id) === String(id));

export const getProductsByIds = (ids = []) =>
  ids
    .map((id) => getCatalogProductById(id))
    .filter(Boolean);

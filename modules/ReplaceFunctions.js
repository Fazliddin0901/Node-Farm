module.exports = function (html, obj) {
  let out = html.replace(/{ImageProduct}/g, obj.image);
  out = out.replace(/{DescProduct}/g, obj.description);
  out = out.replace(/{NameProduct}/g, obj.productName);
  out = out.replace(/{DetailProduct}/g, obj.quantity);
  out = out.replace(/{PriceProduct}/g, obj.price);
  out = out.replace(/{IdProduct}/g, obj.id);
  out = out.replace(/{OrganicProduct}/g, obj.organic ? "Organic" : "");
  out = out.replace(/{CountryProduct}/g, obj.country);
  out = out.replace(/{VitaminProduct}/g, obj.nutrients);
  return out;
};

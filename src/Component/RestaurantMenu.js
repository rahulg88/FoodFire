import React, { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
const MENU_ITEM_TYPE_KEY =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
const RESTAURANT_TYPE_KEY =
  "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    fetchMenu();
    fetchMenuItems();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setResInfo(json);
  };
  const { resId } = useParams();
  const fetchMenuItems = async () => {
    const menuitemdata = await fetch(
      "https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=" +
        resId
    );
    const json = await menuitemdata.json();
    setMenuItems(json);
  };

  if (resInfo === null) return <Shimmer />;
  const restaurantData =
    menuItems?.data?.cards
      ?.map((x) => x.card)
      ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card?.info ||
    null;
  const menuItemsData =
    menuItems?.data?.cards
      .find((x) => x.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
      ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
      ?.map((x) => x.itemCards)
      .flat()
      .map((x) => x.card?.info) || [];

  const { name, cloudinaryImageId, cuisines, costForTwo } = restaurantData;

  const itemData =
    menuItemsData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
      ?.card?.card?.itemCards;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines.join(", ")}</p>
      <p>{costForTwo}</p>
      <ul>
        {menuItemsData?.map((item) => (
          <li key={item.id}>
            name:{item.name}
            description: {item.description}
            price:{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

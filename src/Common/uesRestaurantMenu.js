import React, { useEffect, useState } from "react";

const uesRestaurantMenu = () => {
  const [resId, setResId] = useState(null);
  useEffect(() => {
    setResId();
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
  return resId;
};

export default uesRestaurantMenu;

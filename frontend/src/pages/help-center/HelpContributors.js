import sidebarHeader from "./assets/sidebar-header.png";
import adminHeader from "./assets/admin-header.png";
import updateSkuInfo from "./assets/update-sku-info.png";
import saveSkuInfo from "./assets/save-sku-info.png";
import refreshUrl from "./assets/refresh-url.png";
import activeSkuHeader from "./assets/active-sku-header.png";
import createNewDealerSku from "./assets/create-new-dealer-sku.png";
import saveNewDealerSku from "./assets/save-new-dealer-sku.png";
const HelpContributors = [
  {
    question: "How to edit pricing or product notes on the dashboard?",
    answer: [
      {
        text: "Click the wheel icon next to your profile picture on the top left-hand side of the screen, this will take you to your Admin Dashboard.",
        image: sidebarHeader,
      },
      {
        text: "Search for the SKU you wish to edit on the search bar.",
        image: adminHeader,
      },
      {
        text: "Make any adjustments in the relevant fields to the bid or ask price or edit any notes. To save a new price, you will have to ensure there is a $ or % sign present, even though there is not one there initially.",
        image: updateSkuInfo,
      },
      {
        text: "Once you are done with your changes, scroll over to the far-right side of the screen (you cannot see it without scrolling to the right) and click the save button.",
        image: saveSkuInfo,
      },
      {
        text: "After the changes have been saved, please refresh your URL.",
        image: refreshUrl,
      },
      {
        text: "That’s it! Your changes should now be reflected in the pricing dashboard. This change will be reflected in the dashboard until we receive new pricing from you. Once new pricing is received via email, we will display the newest pricing information that was on that email and your manual changes will no longer be saved.",
      },
    ],
  },
  {
    question:
      "How to add pricing to a product not currently on your price sheet?",
    answer: [
      {
        text: "Click the wheel icon next to your profile picture on the top left-hand side of the screen, this will take you to your Admin Dashboard.",
        image: sidebarHeader,
      },
      {
        text: "Under the Active SKUs tab, click on the + button on the far-right side of the screen",
        image: activeSkuHeader,
      },
      {
        text: "Start typing the name of the SKU you are looking for under the column titled Aurbitrage SKU. Please note the far-left column (SKU) is immutable and for our internal purposes only. Enter in the pricing you wish to add in the bid and/or ask fields (remember to use a $ or %, melt is $0), and any product notes you wish to add. If you do not see the SKU listed that you are trying to add, please contact Marshall and he will create the SKU on the backend for you first, and then you can go through this process.",
        image: createNewDealerSku,
      },
      {
        text: "After you have chosen the SKU and entered all the details, scroll over to the far-right and click the save button.",
        image: saveNewDealerSku,
      },
      {
        text: "After the changes have been saved, please refresh your URL.",
        image: refreshUrl,
      },
      {
        text: "That’s it! Your pricing should now appear on the Pricing Dashboard.",
      },
    ],
  },
];

export default HelpContributors;

import { Typography } from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { pdfjs } from "react-pdf";
import PdfPreview from "./PdfPreview";
import {
  ImagePreviewBox,
  ReplyBox,
  StyledContainer,
  StyledMessageBox,
  StyledInnerBox,
  MessageBox,
  MessageBoxContent,
  CloseIcon,
  UserName,
  Padding,
  CloseIconDark,
  CloseBtn,
} from "./styles";
import { useSelector } from "react-redux";
import { setMessageType, setPayload } from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import { useAuth } from "@/Context/AuthContext.jsx";
import ArbitrageSku from "./ArbitrageSku/ArbitrageSku";
import { useSearchParams } from "react-router-dom";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { useContext } from "react";
import { useSpotPrices } from "@/Context/SpotPricesContext";
import useGetChats from "../../hooks/useGetChats";
import useSearchMessages from "../../hooks/useSearchMessages";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Conversation = ({ onBackClick }) => {
  const [message, setMessage] = useState("");
  const [URLSearchParams, setSearchParams] = useSearchParams();
  const sku = URLSearchParams.get("arbitrageSku");
  const dealerName = URLSearchParams.get("skuDealerName");
  const trade = URLSearchParams.get("trade");
  const index = URLSearchParams.get("index");

  const [showSkuComponent, setShowSkuComponent] = useState(false);
  const [skuData, setSkuData] = useState(null);

  const { pricingDataView } = useContext(PricingDashboardContext);
  const { spotPrices } = useSpotPrices();

  const [type, setType] = useState("");
  const [asset, setAsset] = useState(null);
  const [assetPreview, setAssetPreview] = useState(null);
  const [onlyImage, setOnlyImage] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const fileInputRef = useRef(null);
  const { userName } = useAuth();
  const { updateChatOptimistically } = useGetChats();
  const chat = useSelector((state) => state.app.chat);
  const { selectedConversation } = chat;

  const {
    searchTerm,
    handleSearch,
    searchResults,
    isLoading: isSearchLoading,
    totalPages,
    page,
    handleNextPage,
    handlePrevPage,
  } = useSearchMessages(
    selectedConversation?.id,
    selectedConversation?.chatType,
  );

  const isOwnMessage = selectedConversation?.name === userName;
  const dispatch = useDispatch();
  useEffect(() => {
    if ((sku && dealerName) || selectedConversation?.payload) {
      setShowSkuComponent(true);
    } else {
      setShowSkuComponent(false);
    }
  }, [
    sku,
    dealerName,
    selectedConversation?.id,
    selectedConversation?.payload,
  ]);

  useEffect(() => {
    if (!sku || !dealerName) {
      setShowSkuComponent(false);
      setSkuData(null);
    }
  }, [sku, dealerName]);

  const prepareSkuData = useCallback(() => {
    if (selectedConversation?.payload) {
      return selectedConversation?.payload;
    }
    if (!sku || !dealerName || !pricingDataView) {
      return null;
    }
    let data = null;
    const skuItem =
      pricingDataView
        .find((category) =>
          category.data.some(
            (item) => parseInt(`${item.aurbitrageSkuId}`) === parseInt(sku),
          ),
        )
        ?.data.find(
          (item) => parseInt(`${item.aurbitrageSkuId}`) === parseInt(sku),
        ) || {};
    if (skuItem) {
      const priceArray = skuItem[trade] || [];
      data = priceArray.find(
        (entry) =>
          entry?.dealerName === dealerName ||
          entry?.dealer === dealerName ||
          entry?.info?.dealerName === dealerName ||
          entry?.info?.dealer === dealerName,
      );

      if (!data && index) {
        const priceIndex = parseInt(index);
        data = priceArray[priceIndex];
      }

      if (!data) {
        data = priceArray[0];
      }
    }

    if (!skuItem) {
      return null;
    }

    return {
      dealerName: data?.dealerName || data?.dealer || dealerName,
      trade,
      skuName: skuItem.name,
      skuId: skuItem.aurbitrageSkuId,
      equivalentOz: skuItem.equivalentOz,
      date: data?.date || skuItem?.date,
      data: {
        ...data,
        metal: skuItem.metal,
        equivalentOz: skuItem.equivalentOz,
        isApiPrice: data?.isApiPrice || false,
        dealerName: data?.dealerName || data?.dealer || dealerName,
        sourceTable: data?.sourceTable,
      },
    };
  }, [
    sku,
    dealerName,
    trade,
    pricingDataView,
    index,
    selectedConversation?.payload,
  ]);

  useEffect(() => {
    if (showSkuComponent) {
      const data = prepareSkuData();
      setSkuData(data);
    }
  }, [showSkuComponent, prepareSkuData, pricingDataView]);

  const cancelImageSelection = () => {
    setAsset(null);
    setAssetPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const cancelReply = () => {
    setReplyingTo(null);
    dispatch(setMessageType("msg"));
    dispatch(setPayload(null));
  };

  const handleCloseSkuComponent = () => {
    setShowSkuComponent(false);
    setSkuData(null);
    setSearchParams();
  };

  const editorsOpenInConversation = useSelector(
    (state) => state.editors.editorsOpenInConversation,
  );
  const isEditing = editorsOpenInConversation.includes(
    selectedConversation.id + "_" + selectedConversation.type,
  );
  const isPDF = (url) =>
    typeof url?.name === "string" && url?.name.toLowerCase().endsWith(".pdf");
  return (
    <StyledContainer>
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onBackClick={onBackClick}
      />
      <StyledMessageBox>
        <Message
          menu={true}
          newMessage={message}
          newImage={assetPreview}
          type={type}
          onlyImage={onlyImage}
          searchTerm={searchTerm}
          searchResults={searchResults}
          isSearchLoading={isSearchLoading}
          totalPages={totalPages}
          page={page}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          clearMessage={() => {
            setMessage("");
            setAssetPreview(null);
            setOnlyImage(false);
          }}
          updateChatOptimistically={updateChatOptimistically}
          currentSkuData={skuData}
        />
      </StyledMessageBox>

      <MessageBox
        radius={selectedConversation?.type === "msg" ? "rounded" : ""}
      >
        {(assetPreview ||
          selectedConversation?.type == "replymsg" ||
          showSkuComponent) && (
          <Padding>
            {assetPreview && (
              <>
                {isPDF(assetPreview) ? (
                  <>
                    <ImagePreviewBox>
                      <PdfPreview
                        file={assetPreview}
                        fileName={assetPreview?.name}
                      />
                      <CloseBtn onClick={cancelImageSelection}>
                        <CloseIconDark />
                      </CloseBtn>
                    </ImagePreviewBox>
                  </>
                ) : (
                  <>
                    <ImagePreviewBox>
                      <img src={assetPreview} alt="Selected" className="img" />
                      <CloseBtn onClick={cancelImageSelection}>
                        <CloseIconDark />
                      </CloseBtn>
                    </ImagePreviewBox>
                  </>
                )}
              </>
            )}
            {selectedConversation?.type == "replymsg" && (
              <UserName variant="h4">{selectedConversation?.name}</UserName>
            )}
            {(showSkuComponent || selectedConversation?.type == "replymsg") && (
              <MessageBoxContent
                messageType={"reply"}
                hasSku={showSkuComponent}
              >
                {selectedConversation?.type == "replymsg" && (
                  <ReplyBox msgType={isOwnMessage ? "own" : ""}>
                    <StyledInnerBox>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: selectedConversation?.msg,
                        }}
                        variant="h4"
                      />
                    </StyledInnerBox>
                    {selectedConversation?.img && (
                      <img
                        src={selectedConversation.img}
                        alt="Replied Image"
                        className="imagePreview"
                      />
                    )}
                    <CloseIcon onClick={cancelReply} />
                  </ReplyBox>
                )}

                {showSkuComponent && (
                  <ArbitrageSku
                    sku={{
                      ...skuData,
                      metal: spotPrices.find(
                        (i) =>
                          i?.metals?.toLowerCase() === skuData?.data?.metal,
                      ),
                    }}
                    onClose={
                      !selectedConversation?.payload && handleCloseSkuComponent
                    }
                    isAttachment={true}
                  />
                )}
              </MessageBoxContent>
            )}
          </Padding>
        )}

        <Footer
          ref={fileInputRef}
          onMessage={setMessage}
          cancelImageSelection={cancelImageSelection}
          setAssetPreview={setAssetPreview}
          assetPreview={assetPreview}
          asset={asset}
          setAsset={setAsset}
          setType={setType}
          setOnlyImage={setOnlyImage}
          setReplyingTo={setReplyingTo}
          isPDF={isPDF}
          skuData={skuData}
          showSkuComponent={showSkuComponent}
          onSkuSent={handleCloseSkuComponent}
          updateChatOptimistically={updateChatOptimistically}
        />
      </MessageBox>
    </StyledContainer>
  );
};

export default Conversation;

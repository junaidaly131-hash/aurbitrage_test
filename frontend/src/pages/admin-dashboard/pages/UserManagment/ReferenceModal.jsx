import React from "react";
import { Typography, Button, CardContent, Modal } from "@mui/material";
import {
  ModalContainer,
  CustomPaper,
  CustomCard,
  TitleTypography,
} from "./styles";

const ReferenceModal = ({ isOpen, handleClose, referenceData, loading }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalContainer>
        <CustomPaper>
          <TitleTypography>Reference Information</TitleTypography>
          {referenceData?.referenceResponses?.map((reference, index) => (
            <CustomCard key={index}>
              <CardContent>
                <Typography>
                  <strong>Trader:</strong> {reference.trader}
                </Typography>
                <Typography>
                  <strong>Dealer:</strong> {reference.dealer}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {reference.traderEmail}
                </Typography>
                <Typography>
                  <strong>Phone No:</strong> {reference.traderPhoneNo}
                </Typography>
                <Typography>
                  <strong>Feedback:</strong> {reference.referenceFeedback}
                </Typography>
                <Typography>
                  <strong>Good Understanding:</strong>{" "}
                  {reference.goodUnderstanding ? "Yes" : "No"}
                </Typography>
                <Typography>
                  <strong>Would Recommend:</strong>{" "}
                  {reference.wouldRecommend ? "Yes" : "No"}
                </Typography>
              </CardContent>
            </CustomCard>
          ))}

          {referenceData?.missingReferenceResponses?.map((reference, index) => (
            <CustomCard key={index}>
              <CardContent>
                <Typography>
                  <strong>Trader:</strong> {reference.trader}
                </Typography>
                <Typography>
                  <strong>Dealer:</strong> {reference.dealer}
                </Typography>

                <Typography>
                  <strong>Email:</strong> {reference.traderEmail}
                </Typography>
                <Typography>
                  <strong>Phone No:</strong> {reference.traderPhone}
                </Typography>

                <Typography>
                  <strong>Status:</strong> Pending
                </Typography>
              </CardContent>
            </CustomCard>
          ))}
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </CustomPaper>
      </ModalContainer>
    </Modal>
  );
};

export default ReferenceModal;

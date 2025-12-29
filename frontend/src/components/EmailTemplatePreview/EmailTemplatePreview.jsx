import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Use app's existing styled components
const StyledDiv = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100vh - 110px)",
  color: theme.typography.color.primary,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4),
  gap: 24,
  flexDirection: "column",
  display: "flex",
  textAlign: "center",
  overflowY: "scroll",
  "& .dashboardHeader": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.gray,
    zIndex: 10,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
  },
}));

const StyledHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px",
}));

const StyledHeading = styled("h2")(({ theme }) => ({
  fontSize: "2em",
  margin: "5px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  background: "#fff",
  textTransform: "capitalize",
  padding: "9px 20px",
  borderRadius: "10px",
  color: "#000",
  fontWeight: "700",
  "&:hover": { background: "#DBA42D" },
  cursor: "pointer",
  marginTop: "-5px",
}));

const PreviewFrame = styled("iframe")(({ theme }) => ({
  width: "100%",
  height: "70vh",
  border: "1px solid #e0e0e0",
  borderRadius: theme.spacing(1),
  backgroundColor: "#ffffff",
}));

const EmailTemplatePreview = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({});

  // Fetch available templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/v1/email-templates/templates", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }

        const data = await response.json();
        setTemplates(data.data);

        // Group templates by category
        const categoryGroups = {};
        data.data.forEach((template) => {
          if (!categoryGroups[template.category]) {
            categoryGroups[template.category] = [];
          }
          categoryGroups[template.category].push(template);
        });
        setCategories(categoryGroups);

        // Select first template by default
        if (data.data.length > 0) {
          setSelectedTemplate(data.data[0].name);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Fetch template preview
  useEffect(() => {
    if (selectedTemplate) {
      fetchTemplatePreview();
    }
  }, [selectedTemplate]);

  const fetchTemplatePreview = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/v1/email-templates/templates/${selectedTemplate}/preview`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch template preview");
      }

      const data = await response.json();
      setPreviewData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const getCategoryColor = (category) => {
    const colors = {
      subscriptionAndTrial: "primary",
      payment: "error",
      userManagement: "info",
      business: "warning",
      notifications: "success",
    };
    return colors[category] || "default";
  };

  const formatCategoryName = (category) => {
    return category
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <StyledDiv>
      <StyledHeader>
        <StyledHeading>Email Template Preview</StyledHeading>
      </StyledHeader>

      <div
        style={{
          backgroundColor: "#333333",
          padding: "20px",
          color: "white",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <InputLabel style={{ color: "white" }}>
                Select Template
              </InputLabel>
              <Select
                style={{
                  color: "white",
                  background: "#141414",
                  textAlign: "start",
                }}
                value={selectedTemplate}
                onChange={handleTemplateChange}
                label="Select Template"
                disabled={loading}
              >
                {templates.map((template) => (
                  <MenuItem
                    style={{ color: "white" }}
                    key={template.name}
                    value={template.name}
                  >
                    {template.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Categories:
              </Typography>
              {Object.keys(categories).map((category) => (
                <Chip
                  key={category}
                  label={formatCategoryName(category)}
                  color={getCategoryColor(category)}
                  size="small"
                  sx={{ margin: 0.5 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </div>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography style={{ color: "white" }} variant="h6">
            {previewData?.displayName || "Template Preview"}
          </Typography>
          <StyledButton
            onClick={fetchTemplatePreview}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Refresh Preview
          </StyledButton>
        </Box>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress />
          </Box>
        ) : previewData ? (
          <PreviewFrame
            srcDoc={previewData.htmlContent}
            title="Email Template Preview"
            sandbox="allow-same-origin"
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <Typography variant="body1" color="text.secondary">
              Select a template to preview
            </Typography>
          </Box>
        )}
      </Paper>
    </StyledDiv>
  );
};

export default EmailTemplatePreview;

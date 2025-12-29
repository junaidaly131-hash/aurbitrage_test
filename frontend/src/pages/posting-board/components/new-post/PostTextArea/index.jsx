import { useEffect, useRef, useState } from "react";
import { Grid, TextField, Stack, Popover } from "@mui/material";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "quill-emoji";
import { HeaderBox, QuillContainer, ContentBox, StyledPopover } from "./style";
import { TOOLBAR_OPTIONS } from "@/constants/posting-board";
import "quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
import { TOOLBAR_TOOLTIPS } from "../constants";

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji } = quillEmoji;

Quill.register(
  {
    "formats/emoji": EmojiBlot,
    "modules/emoji-shortname": ShortNameEmoji,
    "modules/emoji-toolbar": ToolbarEmoji,
  },
  true,
);

const PostTextArea = ({
  postHeader,
  setPostHeader,
  postContent,
  setPostContent,
  handleFileChange,
  allowTextPost,
}) => {
  const ref = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tooltipText, setTooltipText] = useState("");
  const editorSelectionRef = useRef(null);
  const toolbarRef = useRef(null);
  const isSafari = useRef(
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  );

  const storeSelection = () => {
    if (ref.current) {
      try {
        const selection = ref.current.getEditor().getSelection();
        if (selection) {
          editorSelectionRef.current = selection;
        }
      } catch (e) {
        console.warn("Failed to store editor selection", e);
      }
    }
  };

  useEffect(() => {
    const addTooltipsToToolbar = () => {
      const toolbar = document.querySelector(".ql-toolbar");
      if (!toolbar) return;

      toolbarRef.current = toolbar;

      if (isSafari.current) {
        toolbar.addEventListener("mousedown", (e) => {
          storeSelection();
        });
      }

      toolbar.querySelectorAll("button").forEach((button) => {
        const format = button.classList[0]?.replace("ql-", "");
        if (!format) return;

        let text = TOOLBAR_TOOLTIPS[format];
        if (typeof text === "object") {
          const value = button.getAttribute("value");
          text = value ? text[value] : Object.values(text)[0];
        }

        if (text) {
          const mouseenterHandler = () => {
            storeSelection();
            setTooltipText(text);
            setAnchorEl(button);
          };

          const mouseleaveHandler = () => {
            setAnchorEl(null);
          };

          button.addEventListener("mouseenter", mouseenterHandler);
          button.addEventListener("mouseleave", mouseleaveHandler);

          button._mouseenterHandler = mouseenterHandler;
          button._mouseleaveHandler = mouseleaveHandler;
        }
      });

      toolbar.querySelectorAll(".ql-picker").forEach((picker) => {
        const format = picker.classList[0]?.replace("ql-", "");
        if (format && TOOLBAR_TOOLTIPS[format]) {
          const text =
            typeof TOOLBAR_TOOLTIPS[format] === "string"
              ? TOOLBAR_TOOLTIPS[format]
              : Object.values(TOOLBAR_TOOLTIPS[format])[0];

          const mouseenterHandler = () => {
            storeSelection();
            setTooltipText(text);
            setAnchorEl(picker);
          };

          const mouseleaveHandler = () => {
            setAnchorEl(null);
          };

          picker.addEventListener("mouseenter", mouseenterHandler);
          picker.addEventListener("mouseleave", mouseleaveHandler);

          picker._mouseenterHandler = mouseenterHandler;
          picker._mouseleaveHandler = mouseleaveHandler;

          if (isSafari.current) {
            const pickerLabel = picker.querySelector(".ql-picker-label");
            if (pickerLabel) {
              pickerLabel.addEventListener("click", storeSelection);
              pickerLabel._clickHandler = storeSelection;
            }

            const options = picker.querySelectorAll(".ql-picker-item");
            options.forEach((option) => {
              option.addEventListener("click", () => {
                setTimeout(() => {
                  if (editorSelectionRef.current && ref.current) {
                    try {
                      const quill = ref.current.getEditor();
                      quill.setSelection(editorSelectionRef.current);
                    } catch (e) {
                      console.warn(
                        "Failed to restore selection after option click",
                        e,
                      );
                    }
                  }
                }, 10);
              });
            });
          }
        }
      });

      if (isSafari.current) {
        const linkButton = toolbar.querySelector(".ql-link");
        if (linkButton) {
          linkButton.addEventListener("click", () => {
            setTimeout(() => {
              const linkInput = document.querySelector(
                ".ql-tooltip input[data-link]",
              );
              if (linkInput) {
                linkInput.focus();

                const saveButton = document.querySelector(
                  ".ql-tooltip .ql-action",
                );
                if (saveButton) {
                  saveButton.addEventListener("click", () => {
                    setTimeout(() => {
                      if (ref.current) {
                        try {
                          const quill = ref.current.getEditor();
                          quill.focus();
                          if (editorSelectionRef.current) {
                            quill.setSelection(editorSelectionRef.current);
                          }
                        } catch (e) {
                          console.warn("Failed to restore focus after link", e);
                        }
                      }
                    }, 50);
                  });
                }
              }
            }, 50);
          });
        }
      }
    };

    const timer = setTimeout(() => {
      addTooltipsToToolbar();

      const observer = new MutationObserver(addTooltipsToToolbar);
      const targetNode = document.querySelector(".quill");
      if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (toolbarRef.current) {
        if (isSafari.current) {
          toolbarRef.current.removeEventListener("mousedown", () => {});
        }

        toolbarRef.current
          .querySelectorAll("button, .ql-picker")
          .forEach((el) => {
            if (el._mouseenterHandler) {
              el.removeEventListener("mouseenter", el._mouseenterHandler);
            }
            if (el._mouseleaveHandler) {
              el.removeEventListener("mouseleave", el._mouseleaveHandler);
            }
          });

        toolbarRef.current
          .querySelectorAll(".ql-picker-label")
          .forEach((label) => {
            if (label._clickHandler) {
              label.removeEventListener("click", label._clickHandler);
            }
          });
      }

      const observer = new MutationObserver(() => {});
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!anchorEl && editorSelectionRef.current && ref.current) {
      try {
        const quill = ref.current.getEditor();
        setTimeout(
          () => {
            try {
              quill.setSelection(editorSelectionRef.current);
              quill.focus();
            } catch (e) {
              console.warn("Failed to restore selection", e);
            }
          },
          isSafari.current ? 100 : 50,
        );
      } catch (e) {
        console.warn("Error accessing editor", e);
      }
    }
  }, [anchorEl]);

  const handleTab = (e) => {
    if (e.key === "Tab" && ref.current) {
      e.preventDefault();
      ref.current.focus();
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!allowTextPost && (
          <HeaderBox>
            <TextField
              fullWidth
              id="post-header"
              label={`What is the subject of your post?`}
              variant="standard"
              multiline
              rows={1}
              value={postHeader}
              onChange={(e) => setPostHeader(e.target.value)}
              onKeyDown={handleTab}
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: "#fff",
                  fontSize: "20px",
                },
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                },
              }}
            />
          </HeaderBox>
        )}
        <ContentBox>
          <Stack direction="column" gap={1} mt={2}>
            <QuillContainer>
              <ReactQuill
                id="editor"
                ref={ref}
                theme="snow"
                value={postContent}
                placeholder="What would you like to share?"
                onChange={(content) => {
                  setPostContent(content);
                }}
                modules={{
                  toolbar: TOOLBAR_OPTIONS,
                  "emoji-toolbar": true,
                  "emoji-shortname": true,
                }}
              />
            </QuillContainer>

            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
            </label>
          </Stack>
        </ContentBox>
      </Grid>

      <StyledPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
        onClick={(e) => e.stopPropagation()}
      >
        {tooltipText}
      </StyledPopover>
    </Grid>
  );
};

export default PostTextArea;

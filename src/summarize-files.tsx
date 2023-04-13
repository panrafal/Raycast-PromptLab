import { Detail, popToRoot, showToast, Toast, useUnstableAI } from "@raycast/api";
import { useEffect } from "react";
import { ERRORTYPE, installDefaults, useFileContents } from "./utils/file-utils";
import ResponseActions from "./ResponseActions";
import { imageFileExtensions } from "./utils/file-extensions";

export default function Command() {
  const { selectedFiles, contentPrompts, loading, errorType } = useFileContents({
    minNumFiles: 1,
    acceptedFileExtensions: undefined,
    useMetadata: true,
    useAudioDetails: false,
    useSoundClassification: true,
    useSubjectClassification: true,
    useRectangleDetection: true,
    useBarcodeDetection: true,
    useFaceDetection: true,
  });

  useEffect(() => {
    installDefaults();
  }, []);

  const matchAnyImageExtensions = `/(\\.${imageFileExtensions.join("|\\.")})/`;
  const svgSelected = selectedFiles?.join("").toLowerCase().includes(".svg");
  const imageSelected = selectedFiles?.join("").toLowerCase().search(matchAnyImageExtensions) != -1;

  const basePrompt = `I want you to derive insights from information I provide about the content of files. You will respond with a descriptive discussion of the file, its main topics, and its significance. You will use all information provided to infer more insights. Provide several insights derived from metadata or EXIF data. Give an overview of lists, content, objects, etc. without listing specific details. Discuss the general position of any objects or rectangles within the image. Don't mention that information is provided. Don't repeat yourself. Don't list properties without describing their value. ${
    imageSelected
      ? "Discuss the payload of any barcodes or QR codes. For images, use the general size and arrangement of objects to help predict what the file is about."
      : ""
  } ${
    svgSelected ? "For SVGs, predict what object(s) the overall code will render as." : ""
  } Draw connections between different pieces of information and discuss the significance of any relationships therein. Use the file names as markdown headings. Limit your discussion to one short paragraph. At the end, you will include a list of relevant links formatted as a markdown list. \nHere are the files:\n###\n`;

  const contentPromptString = contentPrompts.join("\n");
  const fullPrompt = basePrompt + contentPromptString;
  const { data, isLoading, revalidate } = useUnstableAI(fullPrompt, { execute: contentPrompts.length > 0 });

  if (errorType) {
    let errorMessage = "";
    if (errorType == ERRORTYPE.FINDER_INACTIVE) {
      errorMessage = "Can't get selected files";
    } else if (errorType == ERRORTYPE.MIN_SELECTION_NOT_MET) {
      errorMessage = "Must select at least 1 file";
    } else if (errorType == ERRORTYPE.INPUT_TOO_LONG) {
      errorMessage = "Input too large";
    }

    showToast({
      title: "Failed File Summarization",
      message: errorMessage,
      style: Toast.Style.Failure,
    });
    popToRoot();
    return;
  }

  const text = `# File Summarization\n${data ? data : "Summarizing files..."}`;
  return (
    <Detail
      isLoading={loading || isLoading || contentPrompts.length == 0}
      markdown={text}
      actions={
        <ResponseActions
          commandSummary="Summary"
          responseText={text}
          promptText={fullPrompt}
          reattempt={revalidate}
          files={selectedFiles}
        />
      }
    />
  );
}

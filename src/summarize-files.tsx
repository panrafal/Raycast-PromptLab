import { Detail, popToRoot, showToast, Toast } from "@raycast/api";
import { useEffect } from "react";
import { installDefaults } from "./utils/file-utils";
import ResponseActions from "./components/actions/ResponseActions";
import { imageFileExtensions, videoFileExtensions } from "./utils/file-extensions";
import useModel from "./hooks/useModel";
import { ERRORTYPE } from "./utils/types";
import { useFiles } from "./hooks/useFiles";

export default function Command() {
  const options = {
    minNumFiles: 1,
    acceptedFileExtensions: undefined,
    useMetadata: true,
    useAudioDetails: false,
    useSoundClassification: true,
    useSubjectClassification: true,
    useRectangleDetection: true,
    useBarcodeDetection: true,
    useFaceDetection: true,
    useSaliencyAnalysis: true,
  };

  const { selectedFiles, fileContents, isLoading: loading, error: errorType } = useFiles(options);

  useEffect(() => {
    installDefaults();
  }, []);

  const matchAnyImageExtensions = RegExp(`(.${imageFileExtensions.join("|.")})`);
  const matchAnyVideoExtensions = RegExp(`(.${videoFileExtensions.join("|.")})`);
  const svgSelected = selectedFiles?.csv.toLowerCase().includes(".svg");
  const imageSelected = selectedFiles?.csv.toLowerCase().search(matchAnyImageExtensions) != -1;
  const videoSelected = selectedFiles?.csv.toLowerCase().search(matchAnyVideoExtensions) != -1;

  const basePrompt = `I want you to derive insights from the following information about the content of files. You will respond with a descriptive discussion of each file, its main topics, and its significance. You will use all information provided to infer more insights. Provide several insights derived from metadata or EXIF data. Give an overview of lists, content, objects, etc. without listing specific details. Discuss the general position of any objects, points, or rectangles within images and videos without using numbers. Don't repeat yourself. Don't list properties without describing their value. ${
    imageSelected
      ? "Discuss the payload of any barcodes or QR codes. For images, use the general size and arrangement of objects to help predict what the file is about."
      : ""
  } ${
    videoSelected
      ? "For videos, discuss what they are about in friendly paragraphs without listing off specific details. You must summarize any transcribed text in 100 words or fewer, while limited the entire output to two paragraphs."
      : ""
  } ${
    svgSelected ? "For SVGs, predict what object(s) the overall code will render as." : ""
  } Draw connections between different pieces of information and discuss the significance of any relationships therein. Use the file names as headings. Limit your discussion to one short paragraph. At the end, include a list of relevant links formatted as a markdown list. \nHere are the files:\n###\n`;

  const contentPromptString = fileContents?.contents
  const fullPrompt = basePrompt + contentPromptString;
  const { data, isLoading, revalidate } = useModel("", fullPrompt, "", "1.0", contentPromptString != undefined);

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
      isLoading={loading || isLoading || contentPromptString == undefined}
      markdown={text}
      actions={
        <ResponseActions
          commandName="Summarize Selected Files"
          options={options}
          commandSummary="Summary"
          responseText={text}
          promptText={fullPrompt}
          reattempt={revalidate}
          cancel={() => null}
          files={selectedFiles?.paths}
        />
      }
    />
  );
}

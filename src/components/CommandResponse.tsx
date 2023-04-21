import { closeMainWindow, showToast, Toast } from "@raycast/api";
import { ERRORTYPE, useFileContents } from "../utils/file-utils";
import { useEffect, useState } from "react";
import { CommandOptions } from "../utils/types";
import { runActionScript, runReplacements } from "../utils/command-utils";
import useModel from "../utils/useModel";
import { useReplacements } from "../hooks/useReplacements";
import CommandDetailView from "./CommandDetailView";
import CommandChatView from "./CommandChatView";
import CommandListView from "./CommandListView";
import CommandGridView from "./CommandGridView";

export default function CommandResponse(props: {
  commandName: string;
  prompt: string;
  input?: string;
  options: CommandOptions;
}) {
  const { commandName, prompt, input, options } = props;
  const [substitutedPrompt, setSubstitutedPrompt] = useState<string>(prompt);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [shouldCancel, setShouldCancel] = useState<boolean>(false);

  const { selectedFiles, contentPrompts, loading, errorType } =
    options.minNumFiles != undefined && options.minNumFiles > 0
      ? useFileContents(options)
      : { selectedFiles: [], contentPrompts: [], loading: false, errorType: undefined };

  const replacements = useReplacements(input, selectedFiles);

  useEffect(() => {
    if (options.showResponse == false) {
      closeMainWindow();
    }

    Promise.resolve(runReplacements(prompt, replacements, [commandName])).then((subbedPrompt) => {
      setLoadingData(false);

      if (options.outputKind == "list") {
        subbedPrompt +=
          "<Format the output as a single list with each item separated by '~~~'. Do not provide any other commentary, headings, or data.>";
      } else if (options.outputKind == "grid") {
        subbedPrompt +=
          "<Format the output as a single list with each item separated by '~~~'. At the start of each item, put an object emoji or person emoji that represents that item followed by '$$$'. Do not provide any other commentary, headings, or data.>";
      }

      setSubstitutedPrompt(subbedPrompt);
    });
  }, []);

  const contentPromptString = contentPrompts.join("\n");
  const fullPrompt = (substitutedPrompt.replaceAll("{{contents}}", contentPromptString) + contentPromptString).replace(
    /{{END}}(\n|.)*/,
    ""
  );

  const { data, isLoading, revalidate, error } = useModel(
    substitutedPrompt,
    fullPrompt,
    input || contentPromptString,
    !loadingData &&
      ((options.minNumFiles != undefined && options.minNumFiles == 0) || (contentPrompts.length > 0 && !shouldCancel))
  );

  useEffect(() => {
    // Run post-response action script if one is defined
    if (
      data &&
      !isLoading &&
      options.actionScript != undefined &&
      options.actionScript.trim().length > 0 &&
      options.actionScript != "None"
    ) {
      Promise.resolve(
        runActionScript(
          options.actionScript,
          substitutedPrompt.replaceAll("{{contents}}", contentPromptString),
          input || contentPromptString,
          data
        )
      );
    }
  }, [data, isLoading]);

  // Report errors related to getting data from the model
  if (error) {
    showToast({
      title: error.toString(),
      style: Toast.Style.Failure,
    });
    return null;
  }

  // Report errors related to getting selected file contents
  if (errorType) {
    let errorMessage = "";
    if (errorType == ERRORTYPE.FINDER_INACTIVE) {
      errorMessage = "Can't get selected files";
    } else if (errorType == ERRORTYPE.MIN_SELECTION_NOT_MET) {
      errorMessage = `Must select at least ${options.minNumFiles} file${options.minNumFiles == 1 ? "" : "s"}`;
    } else if (errorType == ERRORTYPE.INPUT_TOO_LONG) {
      errorMessage = "Input too large";
    }

    showToast({
      title: "Failed Error Detection",
      message: errorMessage,
      style: Toast.Style.Failure,
    });
    return null;
  }

  // Get the text output for the response
  const text = `${options.outputKind == "detail" || options.outputKind == undefined ? `# ${commandName}\n` : ``}${
    data
      ? data
      : options.minNumFiles != undefined && options.minNumFiles == 0
      ? "Loading response..."
      : "Analyzing files..."
  }`;

  // Don't show the response if the user has disabled it
  if (options.showResponse == false) {
    return null;
  }

  if (options.outputKind == "list") {
    return (
      <CommandListView
        isLoading={
          loading ||
          isLoading ||
          loadingData ||
          (options.minNumFiles != undefined && options.minNumFiles != 0 && contentPrompts.length == 0)
        }
        commandName={commandName}
        options={options}
        prompt={fullPrompt}
        response={text}
        revalidate={revalidate}
        cancel={() => setShouldCancel(true)}
        selectedFiles={selectedFiles}
      />
    );
  } else if (options.outputKind == "grid") {
    return (
      <CommandGridView
        isLoading={
          loading ||
          isLoading ||
          loadingData ||
          (options.minNumFiles != undefined && options.minNumFiles != 0 && contentPrompts.length == 0)
        }
        commandName={commandName}
        options={options}
        prompt={fullPrompt}
        response={text}
        revalidate={revalidate}
        cancel={() => setShouldCancel(true)}
        selectedFiles={selectedFiles}
      />
    );
  } else if (options.outputKind == "chat") {
    return (
      <CommandChatView
        isLoading={
          loading ||
          isLoading ||
          loadingData ||
          (options.minNumFiles != undefined && options.minNumFiles != 0 && contentPrompts.length == 0)
        }
        commandName={commandName}
        options={options}
        prompt={fullPrompt}
        response={text}
        revalidate={revalidate}
        cancel={() => setShouldCancel(true)}
      />
    );
  }

  return (
    <CommandDetailView
      isLoading={
        loading ||
        isLoading ||
        loadingData ||
        (options.minNumFiles != undefined && options.minNumFiles != 0 && contentPrompts.length == 0)
      }
      commandName={commandName}
      options={options}
      prompt={fullPrompt}
      response={text}
      revalidate={revalidate}
      cancel={() => setShouldCancel(true)}
      selectedFiles={selectedFiles}
    />
  );
}
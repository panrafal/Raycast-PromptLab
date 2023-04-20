# PromptLab DevLog - A More Detailed ChangeLog

## 2023-04-19
- Added example output images to the store
- Added PDF document attributes to file data when metadata is enabled
- Added page count and number of characters to PDF file data
- Added metadata info for large files instead of immediately raising an error
- Added Chat response views, layed groundwork for an improved PromptLab Chat command (coming soon)

## 2023-04-18
- Added saliency analysis option in the create command form
- Adjusted names of PromptLab's built-in commands
    - `Create PromptLab Command` --> `New PromptLab Command`
    - `Search PromptLab Commands` --> `My PromptLab Commands`
- Added `{basePrompt}` and `{prompt}` placeholders for custom model JSON schemas
    - `{basePrompt}` is the prompt before any user input (but still including placeholder substitutions)
    - `{prompt}` is the full prompt after any user input
- Adjusted behavior of `{input}` placeholder for custom model JSON schemas
    - Now, the placeholder is replaced with the input text/select file contents, instead of the entire prompt. Use `{prompt}` to get the entire prompt instead.
- Added support for asynchronous output from custom model endpoints
- Fixed bug where Quicklink commands were unable to reference the current application and thus prevented several placeholder substitutions from working
- Fixed error when trying to run `Search PromptLab Commands` command without any commands saved`
# File AI

A Raycast extension for identifying, summarizing, and comparing selected files using Raycast AI.

## Commands

- Create File AI Command
    - Create a custom File AI command accessible via 'Search File AI Commands'
- Search File AI Commands
    - Search and run custom File AI commands
- Summarize Selected Files
    - Summarize the contents of selected text files, PDFs, images, audio files, and more.
- Compare Selected Files
    - Compare and contrast the contents of selected files.
- Assess File Overlap
    - Assess the overlap in ideas between the contents of two or more selected files.
- Identify Selected Files
    - Get a quick overview of the purpose and usage of a file.
- Summarize Spoken Audio
    - Summarize the spoken word content of audio files.
- File AI Chat
    - Start a back-and-forth conversation with AI with selected files provided as context.       
- Import Custom File AI Commands
    - Add custom commands from a JSON string.

## Images
![File Summarization Example](./examples/jpg-text-summarization-1.png)
![Audio Summarization Example](./examples/mp3-audio-summarization-1.png)
![File Comparison Example](./examples/pdf-file-comparison-1.png)
![Purpose Identification Example](./examples/app-file-identification.png)
![Overlap Analysis Example](./examples/pdf-overlap-analysis-1.png)

## Custom Commands

You can create custom File AI commands, accessed via the "Search File AI Commands" command, to execute your own prompts acting on the contents of selected files. A variety of useful defaults are provided, as listed below.

### Default Custom Commands

- Assess Academic Validity
- Compose Response
- Compose Tweet
- Condense Files
- Create Action Items
- Create Flashcards
- Create Notes
- Create Slides
- Detect Bias
- Extend Files
- Extract Code
- Extract Emails
- Extract Named Entities
- Extract Phone Numbers
- Extract URLs
- Extract Visible Text
- Extract Vocabulary
- Find Errors
- Generate Questions
- Historical Context
- Identify Gaps
- Identify Relationships
- Location Significance
- Make Jingle
- Make Poem
- Make Song
- Metadata Analysis
- Meeting Agenda
- Pattern Analysis
- Pros And Cons
- Recommend Apps
- Respond To Last Email
- Suggest File AI Commands
- Suggest Hashtags
- Suggest Improvements
- Suggest Project Ideas
- Suggest Related File AI Prompts
- Suggest Title
- Suggest Tools
- Summarize Clipboard
- Summarize Current Tab
- Summarize Last Email
- Table Of Contents
- Today's Agenda
- Translate To English
- What Is This?
- Write Abstract
- Write Caption
- Write Conclusion
- Write Discussion
- Write Introduction

### Placeholders

When creating custom commands, you can use placeholders in your prompts that will be substituted with relevant information whenever you run the command. These placeholders range from simple information, like the current date, to complex data retrieval operations such as getting the content of the most recent email. Placeholders are a powerful way to add context to your File AI prompts. The valid placeholders are as follows:

#### API Data Placeholders
| Placeholder | Replaced With |
| --- | --- |
| `{{location}}` | Your current location in city, region, country format, obtained from [geojs.io](https://get.geojs.io) |
| `{{todayWeather}}` | The weather forecast for today, obtained from [open-meteo.com](https://open-meteo.com) |
| `{{weekWeather}}` | The weather forecast for the next week, obtained from [open-meteo.com](https://open-meteo.com) |

#### Application Data Placeholders
| Placeholder | Replaced With |
| --- | --- |
| `{{installedApps}}` | The list of installed applications |
| `{{lastEmail}}` | The subject, sender, and content of the most recently received email in Mail.app |
| `{{lastNote}}` | The text of the most recently edited note in Notes.app |
| `{{musicTracks}}` | The list of track titles in Music.app |
| `{{safariTopSites}}` | Your list of top visited sites in Safari |
| `{{selectedText}}` | The currently selected text |

#### Calendar Data Placeholders
| Placeholder | Replaced With |
| --- | --- |
| `{{date}}` | The current date (day number, month name, year) |
| `{{time}}` | The current name (hours and minutes) |
| `{{todayEvents}}` | Upcoming events over the next day |
| `{{weekEvents}}` | Upcoming events over the next 7 days |
| `{{monthEvents}}` | Upcoming events over the next month |
| `{{yearEvents}}` | Upcoming events over the next year |
| `{{todayReminders}}` | Upcoming reminders of the next day |
| `{{weekReminders}}` | Upcoming reminders over the next 7 days |
| `{{monthReminders}}` | Upcoming reminders over the next month |
| `{{yearReminders}}` | Upcoming reminders over the next year |

#### Context Data Placeholders
| Placeholder | Replaced With |
| --- | --- |
| `{{clipboardText}}` | The text of the clipboard |
| `{{currentApplication}}` | The name of the current application |
| `{{currentTabText}}` | The text content of the active tab of the active browser |
| `{{currentTrack}}` | The title of the track/stream currently playing in Music.app |
| `{{currentURL}}` | The current URL of the active tab of the active browser |
| `{{fileAICommands}}` | The list of all custom File AI commands |

#### File Data Placeholders
| Placeholder | Replaced With |
| --- | --- |
| `{{contents}}` | The contents of the selected files |
| `{{fileNames}}` | Replaced with the list of selected file names |
| `{{files}}` | Replaced with the list of selected file paths |
| `{{metadata}}` | Replaced with the metadata of each file as a list below the file path |

#### System Data Placeholders
| Placeholder | Replaced With |
| --- | --- |
| `{{homedir}}` | The user's home directory |
| `{{user}}` | Replaced with the logged in user's username |

#### Other Placeholders
| Placeholder | Replaced With |
| --- | --- |
| `{{END}}` | Marks the end of a prompt -- no content, metadata, or instructions will be appended after |

## List of Useful Prompts

### Default Commands

| Command Name | Prompt |
| --- | --- |
| Assess Academic Validity | Assess the academic validity of the following files based on their contents, the methodologies described within, and any results obtained. Use the file names as headings. |
| Compose Response | Compose a response to the following files in the style of an email. Sign the email with the name "{{user}}" |
| Compose Tweet | Compose a tweet based on the following files: |
| Condense Files | Condense the content of the following files as much as possible. Summarize sentences. Use abbreviations where possible. If the response includes any lists, remove them and briefly describe them instead. Condense clarifying language as much as possible. Use the file names as headings. |
| Create Action Items | Generate a markdown list of action items from the following files, using a unique identifier for each item as bold headings. If there are any errors in the files, make actions items to fix them. In a sublist of each item, provide a description, priority, estimated level of difficulty, reasonable duration for the task, and due date based on the the duration and today's date, "{{date}}". Here are the files: |
| Create Flashcards | Create 3 Anki flashcards based on the content of the following files. Format the response as markdown with the bold questions and plaintext answers. Separate each entry with '---'. |
| Create Notes | I want you to act as a notetaker. I will provide file names and their contents, and you will respond with a multi-level markdown list of well-structured, concise notes. The notes should be in your own words and should make connections between topics and ideas. Each list item should be at most 20 words long. Minimize the notes as much as possible. Here are the files: |
| Create Slides | Generate 3 or more slideshow slides for each of the following files based on their content. Each slide should have 3 or 4 meaningful bullet points. Organize the slides by topic. Format the slides as markdown lists with '---' separating each slide. Describe an image to include with each slide. Suggest links related to each slide's content. Provide an appropriate title for the slideshow at the beginning of the response. |
| Detect Bias | Identify and explain the significance of any biases in the content of the following files. Discuss what the risks and dangers of those biases are, and discuss how those risks could be minimized. |
| Extend Files | Generate new content for the following files using the same style as the rest of the file's content. Explain how the new content fits with the rest. Do not repeat the current content. Use the file names as headings. |
| Extract Code | Extract lines of code written in programming languages from the following files. Format the response as markdown code blocks. Place the programming language used in each block as the heading above it. Provide a brief description of what the code does below each block. Do not provide any other commentary. |
| Extract Emails | Extract emails from the following files and list them as markdown links: |
| Extract Named Entities | What are the named entities in the following files, and what are their meanings and purpose? Clarify any abbreviations. Format the response as markdown list of sentences with the entity terms in bold. Use the file names as headings. |
| Extract Phone Numbers | Identify all phone numbers in the following files and list them using markdown. Include anything that might be a phone number. If possible, provide the name of the person or company to which the phone number belongs. |
| Extract URLs | Extract URLs from the following files and list them as markdown links |
| Extract Visible Text | I will give you information about files, including their contents, and I want you to output the text content. Preserve the original format of the content as best as possible. Always output something. |
| Extract Vocabulary | Extract the most difficult vocabulary words from the following files and define them. Format the response as a markdown list. |
| Find Errors | What errors and inconsistencies in the following files, why are they significant, and how can I fix them? Format the response as markdown list of sentences with the file names in bold. Use the file names as headings. |
| Generate Questions | Generate questions based on the content of each of the following files, their metadata, filename, type, and other information. Format the response as a markdown list. |
| Historical Context | Based on the topics mentioned in the following files, provide a list of the top 5 most significant relevant historical facts. Additionally, provide a paragraph summarizing a historical fact that relates to the entire content of the file. |
| Identify Gaps | Identify any gaps in understanding or content that occur in the following files. Use the file names as headings. Provide content to fill in the gaps. |
| Identify Relationships | In one paragraph, identify any relationships that might exist between the following files based on their content and the topics they mention. Always identify some relationship, even if it is very general. Explain a use for the files together that none of them have individually. |
| Make Jingle | Create short, memorable jingles summarizing the main ideas in each of the following files, using the file names as headings. |
| Make Poem | Make rhyming poems about the the following files. Be creative and include references to the content and purpose of the file in unexpected ways. Do not summarize the file. Make each poem at least 3 stanzas long, but longer for longer files. Use the file names as markdown headings. |
| Make Song | Make a song based on the content of the following files. Provide a name for the song. |
| Meeting Agenda | Create a meeting agenda covering the contents of the following files. Use today's date and time, {{date}}, to provide headings and structure to the agenda. |
| Metadata Analysis | I want you to give several insights about files based on their metadata and file type. Do not summarize the file content, but instead relate the metadata to the content in a meaningful way. Use metadata to suggest improvements to the content. Provide detailed explanations for your suggestions. Format your response as a paragraph summary. Use the file names as headings.\nHere's the metadata:{{metadata}}\n\nHere are the files: |
| Pattern Analysis | Identify and describe any patterns or trends in the content of the following files. Use the file names as headers. |
| Pros And Cons | List pros and cons for the following files based on the topics mentioned within them. Format the response as a markdown list. Use the file names as headings. Do not provide any other commentary. |
| Recommend Apps | Based on the list of apps I have installed, recommend 10 additional macOS applications that I might enjoy. Explain the significance of the relationship between each recommandation and my installed apps. Use any knowledge you have about the apps to inform your suggestions. Format the output as a markdown list. At the start, provide a paragraph analyzing common themes of my apps, directed at me. Here is the list of apps I have installed: ###{{installedApps}}### |
| Response To last Email | Generate a response to the following email:###{{lastEmail}}### |
| Suggest File AI Commands | Based on my current commands for the File AI extension, suggest new commands to create. Provide suggestions for titles as well prompts. The prompts must be relevant to an AI that can read the content of files, get information about the system, and get outside  data such as calendar events. The commands must be unique. Format the response as a single markdown list. Here are the commands I currently have: {{fileAICommands}} |
| Suggest Hashtags | Suggest hashtags for the following files based on their contents. Use the file names as markdown headings. |
| Suggest Improvements | Suggest improvements to the content of the following files. Use the file names as headings. Format the response as a markdown list. |
| Suggest Project Ideas | I want you to act as a project idea generator. I will provide file names and their contents, and you will response with a list of project ideas based on the content of each file. Format the response as a markdown list. Use the file names as headings. Here are the files: |
| Suggest Related File AI Prompts | Suggest prompts for an AI that can read the contents of selected files based on the contents of the following files. Use the file contents to create useful prompts that could act on the files. The AI does not have the ability to modify files or create new ones. All prompts should reference "the contents of the following files". |
| Suggest Title | Suggest new titles for the following files based on their content and topics mentioned. Use the file names as headings. |
| Suggest Tools | Suggest tools to use based on the topics discussed in the following files. Explain why each tool is relevant. Use the file names as headings. Do not provide any commentary other than the list of tools and their explanations. |
| Summarize Clipboard | Summarize the following text, providing specific details. ###{{clipboardText}}### |
| Summarize Current Tab | Based on the following text obtained from the active browser tab, what am I looking at? In your answer, discuss the content and meaning of the website. If the URL or the text are blank, report an error. For context, here is the url: {{currentURL}} And here is the text: ###{{currentTabText}}### |
| Summarize Last Email | Summarize my most recent email and discuss its significance. I am the recipient. Format the response as a paragraph directed to me. Here is the email: ###{{lastEmail}}### |
| Table Of Contents | Generate a table of contents for each of the following files based on their content. Use the file names as headings. For each item in the table, provide an percent estimation of how far into the document the associated content occurs. Format the response as a markdown list. |
| Today's Agenda | Make an agenda for my day using the following list of events. Format the output as friendly paragraph, directed at my, explaining when there is time for breaks or other activities that you recommend. Use today's date ({{date}}) as a markdown header. Here are the events: ###{{todayEvents}}### |
| Translate To English | Translate the following files to English, using the file names as headings. Reword the translations so that they make sense in plain English. If the phrase is well known in either English or the source language, use the most commonly accepted translation. |
| What Is This? | Based on the content of the following files, answer this question: What is this? Use the file names as headings. |
| Write Abstract | Write an abstract for the following files in the style of an academic research paper. Use the file names as headings. If the abstract includes a list, briefly describe it instead of listing all elements. |
| Write Caption | Write a two-sentence caption for these files in the style of a typical image caption, based on their contents. Use the file names as headings. The caption should summarize the content and describe its overall purpose and significance. |
| Write Conclusion | Write conclusions for the following files in the style of the rest of their content, using the file names as headers. The conclusion should wrap up the meaning, purpose, significance, pitfalls, room to improvement, and suggest plans for future work. |
| Write Discussion | Write a new discussion section for each of the following files in the style of an academic research paper. The discussion should be past tense and highlight the paper's successes. Use the file names as headings. |
| Write Introduction | Write improved introduction sections for the following files in the style of an academic research paper. Use the file names as headings. The introductions must be at least 3 paragraphs long and describe what the file's contents are about, in future tense, as well as provide background information and a summary of the results. If the introduction includes a list, briefly describe the list instead of listing all elements.`

### Non-Default Commands

| Command Name | Prompt |
| --- | --- |
| Relate To Current Track | Relate and compare this file to the song {{currentTrack}}. |
| Songs I Might Like | Based on the following songs in my library, recommend new songs I might like. Output the recommendations as a markdown list. For each song, explain in terms of my other songs why you think I'd like it. The recommendations must not be in my library already. Here are the songs: """{{musicTracks}}""{{END}} |
| Suggest Similar Songs | Suggest songs similar to {currentTrack}}. Use "Songs Similar To {{currentTrack}}" as the header for the output. For each suggestion, provide a brief explanation.{{END}} |
| Summarize Last Note | Summarize my last note: """{{lastNote}}""" |
| Use Cases | List 5 use cases for each of the following files based on their content. Explain how each use case relates to the file. Format the response as a markdown list. Use the file names as headings. |
| User Stories | Create 5 user stories based on the contents of the following files. Format the response as a markdown list. Use each file name as a heading. |

## Installation

This extension is not yet published to the Raycast store. In the meantime, you can install the extension manually from this repository.

### Manual Installation
```bash
git clone https://github.com/SKaplanOfficial/Raycast-File-AI.git && cd Raycast-File-AI

npm install && npm run dev
```

## Useful Resources

| Link | Category | Description |
| --- | --- | --- |
| [Best practices for prompt engineering with OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api) | Prompt Engineering | Strategies for creating effective ChatGPT prompts, from OpenAI itself |
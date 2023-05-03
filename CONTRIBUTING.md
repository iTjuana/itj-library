# Contributing

:tada: First of all, thanks for taking the time to contribute! :tada:

The following is a set of guidelines for contributing to ITJ Library project, which are hosted in the [iTjuana](https://github.com/iTjuana) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[How Can I Contribute?](#how-can-i-contribute)

- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Pull Requests](#pull-requests)

[Styleguides](#styleguides)

- [Git Commit Messages](#git-commit-messages)
- [JavaScript Styleguide](#javaScript-styleguide)
- [Tests Styleguide](#tests-styleguide)
- [Documentation Styleguide](#documentation-styleguide)

[Additional Notes](#additional-notes)

- [Issue and Pull Request Labels](#issue-and-pull-request-labels)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](https://github.com/iTjuana/itj-library/blob/main/.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information by filling in [the template](https://github.com/iTjuana/itj-library/blob/main/.github/ISSUE_TEMPLATE/bug_report.md).

Explain the problem and include additional details to help maintainers reproduce the problem:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible. When listing steps, **don't just say what you did, but explain how you did it**.
- **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
- **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

- **Can you reproduce the problem?**
- **Did the problem start happening recently** (e.g. after updating the project or was this always a problem?)
- If the problem started happening recently, **can you reproduce the problem in an older version of the project?** What's the most recent version in which the problem doesn't happen?
- **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for the project, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Fill in [the template](https://github.com/iTjuana/itj-library/blob/main/.github/ISSUE_TEMPLATE/feature_request.md), including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

- **Perform a [cursory search](https://github.com/search?q=+is%3Aissue+user%3Aitjuana)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue on the repository and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of the project which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
- **Explain why this enhancement would be useful** to most users.
- **List some other text editors or applications where this enhancement exists.**
- **Specify the name and version of the browser you're using.**

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these `beginner` and `help-wanted` issues:

- [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
- [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Local development

This project can be developed locally with some limitations depending on access to databases. For instructions on how to do this, see the following section in the [README](https://github.com/iTjuana/itj-library/blob/main/README.md) file:

### Pull Requests

The process described here has several goals:

- Maintain project's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible version
- Enable a sustainable system for project's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- When only changing documentation, include `[ci skip]` in the commit title
- Consider starting the commit message with an applicable emoji:

| Commit type                | Emoji                                                     |
| :------------------------- | :-------------------------------------------------------- |
| Initial commit             | :tada: `:tada:`                                           |
| Version tag                | :bookmark: `:bookmark:`                                   |
| New feature                | :sparkles: `:sparkles:`                                   |
| Bugfix                     | :bug: `:bug:`                                             |
| Metadata                   | :card_index: `:card_index:`                               |
| Documentation              | :books: `:books:`                                         |
| Documenting source code    | :bulb: `:bulb:`                                           |
| Performance                | :racehorse: `:racehorse:`                                 |
| Cosmetic                   | :lipstick: `:lipstick:`                                   |
| Tests                      | :rotating_light: `:rotating_light:`                       |
| Adding a test              | :white_check_mark: `:white_check_mark:`                   |
| Make a test pass           | :heavy_check_mark: `:heavy_check_mark:`                   |
| General update             | :zap: `:zap:`                                             |
| Improve format/structure   | :art: `:art:`                                             |
| Refactor code              | :hammer: `:hammer:`                                       |
| Removing code/files        | :fire: `:fire:`                                           |
| Continuous Integration     | :green_heart: `:green_heart:`                             |
| Security                   | :lock: `:lock:`                                           |
| Upgrading dependencies     | :arrow_up: `:arrow_up:`                                   |
| Downgrading dependencies   | :arrow_down: `:arrow_down:`                               |
| Lint                       | :shirt: `:shirt:`                                         |
| Translation                | :alien: `:alien:`                                         |
| Text                       | :pencil: `:pencil:`                                       |
| Critical hotfix            | :ambulance: `:ambulance:`                                 |
| Deploying stuff            | :rocket: `:rocket:`                                       |
| Fixing on MacOS            | :apple: `:apple:`                                         |
| Fixing on Linux            | :penguin: `:penguin:`                                     |
| Fixing on Windows          | :checkered_flag: `:checkered_flag:`                       |
| Work in progress           | :construction: `:construction:`                           |
| Adding CI build system     | :construction_worker: `:construction_worker:`             |
| Analytics or tracking code | :chart_with_upwards_trend: `:chart_with_upwards_trend:`   |
| Removing a dependency      | :heavy_minus_sign: `:heavy_minus_sign:`                   |
| Adding a dependency        | :heavy_plus_sign: `:heavy_plus_sign:`                     |
| Docker                     | :whale: `:whale:`                                         |
| Configuration files        | :wrench: `:wrench:`                                       |
| Package.json in JS         | :package: `:package:`                                     |
| Merging branches           | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` |
| Bad code / need improv.    | :hankey: `:hankey:`                                       |
| Reverting changes          | :rewind: `:rewind:`                                       |
| Breaking changes           | :boom: `:boom:`                                           |
| Code review changes        | :ok_hand: `:ok_hand:`                                     |
| Accessibility              | :wheelchair: `:wheelchair:`                               |
| Move/rename repository     | :truck: `:truck:`                                         |
| Other                      | [Be creative](http://www.emoji-cheat-sheet.com/)          |

See also [gitmoji](https://gitmoji.carloscuesta.me/).

### JavaScript Styleguide

All JavaScript code is linted with [Prettier](https://prettier.io/).

- Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
- Inline `export`s with expressions whenever possible

  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

- Place requires in the following order:
  - Built in Node Modules (such as `path`)
  - Local Modules (using relative paths)
- Place class properties in the following order:
  - Class methods and properties (methods starting with `static`)
  - Instance methods and properties

### Tests Styleguide

- Include thoughtfully-worded, well-structured [Jest](https://jestjs.io/docs/getting-started) tests in the same folder as the file/component testing.
- Have the name of the tests to be descriptive yet brief.

#### Example

```js
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown).
- Reference methods and classes in markdown with the custom `{}` notation:
  - Reference classes with `{ClassName}`
  - Reference instance methods with `{ClassName::methodName}`
  - Reference class methods with `{ClassName.methodName}`

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

[GitHub search](https://help.github.com/articles/searching-issues/) makes it easy to use labels for finding groups of issues or pull requests you're interested in.

The labels are loosely grouped by their purpose, but it's not required that every issue has a label from every group or that an issue can't have more than one label from the same group.

Please open an issue on the repository if you have suggestions for new labels, and if you notice some labels are missing on some repositories, then please open an issue on that repository.

#### Type of Issue and Issue State

| Label name                | `link` :mag_right:                                              | Description                                                                                                                |
| ------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `enhancement`             | [search][search-itj-library-repo-label-enhancement]             | Feature requests.                                                                                                          |
| `bug`                     | [search][search-itj-library-repo-label-bug]                     | Confirmed bugs or reports that are very likely to be bugs.                                                                 |
| `question`                | [search][search-itj-library-repo-label-question]                | Questions more than bug reports or feature requests (e.g. how do I do X).                                                  |
| `feedback`                | [search][search-itj-library-repo-label-feedback]                | General feedback more than bug reports or feature requests.                                                                |
| `help-wanted`             | [search][search-itj-library-repo-label-help-wanted]             | The team would appreciate help from the community in resolving these issues.                                               |
| `beginner`                | [search][search-itj-library-repo-label-beginner]                | Less complex issues which would be good first issues to work on for users who want to contribute to the project.           |
| `more-information-needed` | [search][search-itj-library-repo-label-more-information-needed] | More information needs to be collected about these problems or feature requests (e.g. steps to reproduce).                 |
| `needs-reproduction`      | [search][search-itj-library-repo-label-needs-reproduction]      | Likely bugs, but haven't been reliably reproduced.                                                                         |
| `blocked`                 | [search][search-itj-library-repo-label-blocked]                 | Issues blocked on other issues.                                                                                            |
| `duplicate`               | [search][search-itj-library-repo-label-duplicate]               | Issues which are duplicates of other issues, i.e. they have been reported before.                                          |
| `wontfix`                 | [search][search-itj-library-repo-label-wontfix]                 | The team has decided not to fix these issues for now, either because they're working as intended or for some other reason. |
| `invalid`                 | [search][search-itj-library-repo-label-invalid]                 | Issues which aren't valid (e.g. user errors).                                                                              |

#### Topic Categories

| Label name      | `link` :mag_right:                                    | Description                                                                                                |
| --------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `chrome`        | [search][search-itj-library-repo-label-chrome]        | Related to using chrome browser.                                                                           |
| `firefox`       | [search][search-itj-library-repo-label-firefox]       | Related to using firefox browser.                                                                          |
| `safari`        | [search][search-itj-library-repo-label-safari]        | Related to using safari browser.                                                                           |
| `documentation` | [search][search-itj-library-repo-label-documentation] | Related to any type of documentation.                                                                      |
| `performance`   | [search][search-itj-library-repo-label-performance]   | Related to performance.                                                                                    |
| `security`      | [search][search-itj-library-repo-label-security]      | Related to security.                                                                                       |
| `ui`            | [search][search-itj-library-repo-label-ui]            | Related to visual design.                                                                                  |
| `api`           | [search][search-itj-library-repo-label-api]           | Related to the project API.                                                                                |
| `auto-indent`   | [search][search-itj-library-repo-label-auto-indent]   | Related to auto-indenting text.                                                                            |
| `encoding`      | [search][search-itj-library-repo-label-encoding]      | Related to character encoding.                                                                             |
| `network`       | [search][search-itj-library-repo-label-network]       | Related to network problems or working with remote files (e.g. on network drives).                         |
| `git`           | [search][search-itj-library-repo-label-git]           | Related to Git functionality (e.g. problems with gitignore files or with showing the correct file status). |

#### Pull Request Labels

| Label name         | `link` :mag_right:                                       | Description                                                                              |
| ------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `work-in-progress` | [search][search-itj-library-repo-label-work-in-progress] | Pull requests which are still being worked on, more changes will follow.                 |
| `needs-review`     | [search][search-itj-library-repo-label-needs-review]     | Pull requests which need code review, and approval from maintainers or the team.         |
| `under-review`     | [search][search-itj-library-repo-label-under-review]     | Pull requests being reviewed by maintainers or the team.                                 |
| `requires-changes` | [search][search-itj-library-repo-label-requires-changes] | Pull requests which need to be updated based on review comments and then reviewed again. |
| `needs-testing`    | [search][search-itj-library-repo-label-needs-testing]    | Pull requests which need manual testing.                                                 |

[search-itj-library-repo-label-enhancement]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aenhancement
[search-itj-library-org-label-enhancement]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aenhancement
[search-itj-library-repo-label-bug]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Abug
[search-itj-library-org-label-bug]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Abug
[search-itj-library-repo-label-question]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aquestion
[search-itj-library-org-label-question]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aquestion
[search-itj-library-repo-label-feedback]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Afeedback
[search-itj-library-org-label-feedback]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Afeedback
[search-itj-library-repo-label-help-wanted]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Ahelp-wanted
[search-itj-library-org-label-help-wanted]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Ahelp-wanted
[search-itj-library-repo-label-beginner]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Abeginner
[search-itj-library-org-label-beginner]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Abeginner
[search-itj-library-repo-label-more-information-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Amore-information-needed
[search-itj-library-org-label-more-information-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Amore-information-needed
[search-itj-library-repo-label-needs-reproduction]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aneeds-reproduction
[search-itj-library-org-label-needs-reproduction]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aneeds-reproduction
[search-itj-library-repo-label-triage-help-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Atriage-help-needed
[search-itj-library-org-label-triage-help-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Atriage-help-needed
[search-itj-library-repo-label-chrome]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Achrome
[search-itj-library-org-label-chrome]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Achrome
[search-itj-library-repo-label-firefox]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Afirefox
[search-itj-library-org-label-firefox]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Afirefox
[search-itj-library-repo-label-safari]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Asafari
[search-itj-library-org-label-safari]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Asafari
[search-itj-library-repo-label-documentation]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Adocumentation
[search-itj-library-org-label-documentation]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Adocumentation
[search-itj-library-repo-label-performance]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aperformance
[search-itj-library-org-label-performance]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aperformance
[search-itj-library-repo-label-security]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Asecurity
[search-itj-library-org-label-security]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Asecurity
[search-itj-library-repo-label-ui]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aui
[search-itj-library-org-label-ui]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aui
[search-itj-library-repo-label-api]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aapi
[search-itj-library-org-label-api]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aapi
[search-itj-library-repo-label-crash]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Acrash
[search-itj-library-org-label-crash]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Acrash
[search-itj-library-repo-label-auto-indent]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aauto-indent
[search-itj-library-org-label-auto-indent]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aauto-indent
[search-itj-library-repo-label-encoding]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aencoding
[search-itj-library-org-label-encoding]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aencoding
[search-itj-library-repo-label-network]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Anetwork
[search-itj-library-org-label-network]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Anetwork
[search-itj-library-repo-label-uncaught-exception]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Auncaught-exception
[search-itj-library-org-label-uncaught-exception]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Auncaught-exception
[search-itj-library-repo-label-git]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Agit
[search-itj-library-org-label-git]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Agit
[search-itj-library-repo-label-blocked]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Ablocked
[search-itj-library-org-label-blocked]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Ablocked
[search-itj-library-repo-label-duplicate]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aduplicate
[search-itj-library-org-label-duplicate]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aduplicate
[search-itj-library-repo-label-wontfix]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Awontfix
[search-itj-library-org-label-wontfix]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Awontfix
[search-itj-library-repo-label-invalid]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Ainvalid
[search-itj-library-org-label-invalid]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Ainvalid
[search-itj-library-repo-label-package-idea]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Apackage-idea
[search-itj-library-org-label-package-idea]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Apackage-idea
[search-itj-library-repo-label-wrong-repo]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Awrong-repo
[search-itj-library-org-label-wrong-repo]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Awrong-repo
[search-itj-library-repo-label-editor-rendering]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aeditor-rendering
[search-itj-library-org-label-editor-rendering]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aeditor-rendering
[search-itj-library-repo-label-build-error]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Abuild-error
[search-itj-library-org-label-build-error]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Abuild-error
[search-itj-library-repo-label-error-from-pathwatcher]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aerror-from-pathwatcher
[search-itj-library-org-label-error-from-pathwatcher]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aerror-from-pathwatcher
[search-itj-library-repo-label-error-from-save]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aerror-from-save
[search-itj-library-org-label-error-from-save]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aerror-from-save
[search-itj-library-repo-label-error-from-open]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aerror-from-open
[search-itj-library-org-label-error-from-open]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aerror-from-open
[search-itj-library-repo-label-installer]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Ainstaller
[search-itj-library-org-label-installer]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Ainstaller
[search-itj-library-repo-label-auto-updater]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Aauto-updater
[search-itj-library-org-label-auto-updater]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aauto-updater
[search-itj-library-repo-label-deprecation-help]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aitjuana%2Fitj-library+label%3Adeprecation-help
[search-itj-library-org-label-deprecation-help]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Adeprecation-help
[search-itj-library-repo-label-electron]: https://github.com/search?q=is%3Aissue+repo%3Aitjuana%2Fitj-library+is%3Aopen+label%3Aelectron
[search-itj-library-org-label-electron]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3AiTjuana+label%3Aelectron
[search-itj-library-repo-label-work-in-progress]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aitjuana%2Fitj-library+label%3Awork-in-progress
[search-itj-library-org-label-work-in-progress]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3AiTjuana+label%3Awork-in-progress
[search-itj-library-repo-label-needs-review]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aitjuana%2Fitj-library+label%3Aneeds-review
[search-itj-library-org-label-needs-review]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3AiTjuana+label%3Aneeds-review
[search-itj-library-repo-label-under-review]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aitjuana%2Fitj-library+label%3Aunder-review
[search-itj-library-org-label-under-review]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3AiTjuana+label%3Aunder-review
[search-itj-library-repo-label-requires-changes]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aitjuana%2Fitj-library+label%3Arequires-changes
[search-itj-library-org-label-requires-changes]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3AiTjuana+label%3Arequires-changes
[search-itj-library-repo-label-needs-testing]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aitjuana%2Fitj-library+label%3Aneeds-testing
[search-itj-library-org-label-needs-testing]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3AiTjuana+label%3Aneeds-testing
[beginner]: https://github.com/search?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abeginner+label%3Ahelp-wanted+user%3AiTjuana+sort%3Acomments-desc
[help-wanted]: https://github.com/search?q=is%3Aopen+is%3Aissue+label%3Ahelp-wanted+user%3AiTjuana+sort%3Acomments-desc+-label%3Abeginner

Hellooo
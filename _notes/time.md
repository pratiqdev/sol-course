# Time Logged

---

## 5/22 - 6hr
6hr - Proof of concept and testing of editor, markdown, deployment

## 5/23 - 1hr
1hr - Style framework testing and basic setup

## 5/24 - 5hr
2hr - Web3Modal setup and testing
3hr - Testing valid token holder & JWT based access control

## 5/25 - 1hr
1hr - Setup custom webpack config & MDX runtime

## 5/27 - 4hr
4hr - Create and testing custom components for instructions/questionnaire

---

## 6/1 - 3hr
2hr - Setup validation and feedback for questionnaire
1hr - Added mongodb connection
2hr - Setup mongodb integration with custom useProgress hook




 
## 6/6 - 3hr
1hr - Fixed bugs with connectionManager and tested (with metamask only)
2hr - Added coinbase config and tested connection (was missing infuraId env var)

> discovered known issue with chrome extensions using both coinbase and metamask providers
> https://github.com/NoahZinsmeister/web3-react/issues/300

## 6/11 - 6hr
2hr - Finished editor code tests
1hr - added suggestion object to progress store
1hr - tested progress updates and auto loading store data on mount
2hr - refactored progress store to be category/course uri independent

## 6/12 - 3hr
2hr - refactor QAS to conform to new progress store structure
1hr - testing progress store across all page types

## 6/13 - 6hr
1hr - removed bug from QAS that prevented them from showing on mount
2hr - refactored code error output to use styled cards
2hr - refactored suggestion box for tests to use category based cards / added categories to suggestion creation
1hr - Swapped out monaco editor for simple editor for mobile users




vvvvvvvvvvvvvv UNPAID vvvvvvvvvvvvvvvvvvvvvv

## 7/25 - 5hr
1hr - added courses from course-content repo
1hr - using localStorage key/val to prevent recurring prompt for connection modal
3hr - testing regex and string based tests for compiler (fixed)


## 7/26 - 4hr
1hr - fixed compiler bug with incorrect version string
2hr - converting progress store uri to use page url split at '/' (required purging data from old mongodb store)
1hr - added automatic course progression on completion banner

## 7/27 - 6hr
1hr - updated suggestion structures and content
1hr - added completion check to final course tests
2hr - added docs page
    - added hideNav flag to shell
    - fixed final test progress storage
    - added option type to input types for final test
1hr - added start test prompt to pretest suggestions
    - refactored suggestion structure and suggestion cards
    - fixed reload bug with access container
1hr - added custom 404 page
    - added handleNav function to load route after user connected event
    - added responsive grid span definitions to all grids
    - cleaned up unused code
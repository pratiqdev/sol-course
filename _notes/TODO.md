# TODO

-/ setup github repo
-/ deploy to vercel (and commit frequently for testing)
-/ add `Web3Modal` 
-/ ping ChiptosX contract to check if user is holder (if on mainnet)
- generate JWT with expiration, or some method of secure access
- add Mantine (create toast for every event)
- add getStaticPaths post slug setup from portfolio site
- test server-side api pages with compilation scripts
- create 5 tutorial pages (2 private) and test access
- create components with collapsing views:
  - left sidebar tutorial nav
  - center sidebar tutorial content
  - right sidebar container






# NEXT

## Access restricted content (separate function / button):

1. get the user to sign a message (FE)
  - verifies that they own this account

2. ping the contract at `balanceOf(address)` with the verified address (FE)
  - returns 1 or more if they own a token

3. generate a jwt and save as a cookie `TOKEN_ACCESS` (BE generation, FE cookie storage)

# hasAuth hook

create a hook that checks if they are valid at page load
if not - show a modal with button to `Access restricted content`,
instructions to purchase a token, 
or list some free stuff


# Courses List

Create an api page with `getStaticPaths` that gets all course files / front matter
that can be used to generate an array / object that can be mapped for a 
usable list of cards / links for the user to see and navigate courses.
Can also be used to generate the sidebar nav.


# Course completion status

> requires connection to mongo

track addresses and their completion status for a course. Object will not 
contain a course key if the course has not been started.

```js
progressObject = {
  '0x1324':{
    'intro':{
      'page-1':{
        progress: 100,
        score: 100, // score of -1 means not started
      },
      'page-2':{
        progress: 100,
        score: 100
      }
    },
    'section-1':{
      'course-1':{ // editor / compilation based
        progress: 100,
        score: 95, // passed? there will probably be a case where minimum score 
        // can be used to pass/fail a user
        code: '// code written by user'
      },
      'course-2':{
        progress: 0,
        score: -1,
      }
    },

  }
}
```



# Connect an authorize user

A user should be able to see the course list without logging in (connect wallet)
and view courses tha are public. Show a small button / link that will take them
to the login / verification page. If an anon user visits a course page that
requires auth - show a paywall style modal that explains login / connect
and offers a button that will show `web3modal` and verify the user.
If a user has connected their walled, but is not permitted to view this course:
show different paywall content that explains how to get a token - and a list of
free courses.